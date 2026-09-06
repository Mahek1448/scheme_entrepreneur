/**
 * RecommendationEngine.ts
 *
 * Ranks schemes by RELEVANCE (match score) independently of eligibility.
 * Match score = how well the scheme fits the user's business context.
 * Eligibility = deterministic rule check (separate concern).
 *
 * A HIGH match score does NOT mean eligible.
 * Both are shown side-by-side on the UI.
 */

import type {
  Scheme,
  UserProfile,
  RecommendationResult,
  MatchScoreBreakdown,
} from '../types';
import { evaluateEligibility } from './EligibilityEngine';

// ─── Match Score Sub-Scorers (0–100 each) ────────────────────────────────────

/**
 * How well does the scheme's purpose/category align with the business type?
 */
function scoreBusinessCompatibility(profile: UserProfile, scheme: Scheme): number {
  const tags = scheme.tags.map((t) => t.toLowerCase());
  const businessLower = profile.businessType.toLowerCase();

  let score = 40; // baseline

  // Street vendor specific schemes
  if (tags.includes('street-vendor') && profile.isStreetVendor) score += 40;
  if (tags.includes('street-vendor') && !profile.isStreetVendor) score -= 20;

  // Food / chai / hospitality
  if (
    ['chai', 'tea', 'food', 'tiffin', 'catering', 'bakery', 'sweet', 'snack'].some((kw) =>
      businessLower.includes(kw)
    )
  ) {
    if (tags.some((t) => ['service', 'micro-loan', 'working-capital', 'startup'].includes(t))) score += 25;
  }

  // Training scheme — only relevant if user wants skill building
  if (scheme.category === 'training') {
    score = profile.businessStage === 'idea' ? 55 : 30;
  }

  // Manufacturing-specific schemes
  if (tags.includes('manufacturing') && !businessLower.match(/stall|cart|vendor|shop|salon|parlour/)) {
    score -= 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Does the scheme's funding range match what the user needs?
 */
function scoreFundingCompatibility(profile: UserProfile, scheme: Scheme): number {
  const fd = scheme.fundingDetails;
  const req = profile.fundingRequirement || profile.availableCapital * 2;

  // Training scheme — not a loan, so funding not applicable
  if (scheme.category === 'training') return 70;

  const maxFunding =
    fd.maxAmount ??
    Math.max(fd.maxAmountManufacturing ?? 0, fd.maxAmountService ?? 0) ??
    (fd.tranche3 ?? 0);
  const minFunding = fd.minAmount ?? fd.tranche1 ?? 0;

  if (maxFunding === 0) return 50;

  if (req >= minFunding && req <= maxFunding) return 100;
  if (req < minFunding) return 60; // User needs less than minimum — partial fit
  if (req <= maxFunding * 1.5) return 70; // Slightly over but maybe adjustable
  return 30; // Way over the scheme's range
}

/**
 * Does the user profile match the intended beneficiary of this scheme?
 */
function scoreBeneficiaryCompatibility(profile: UserProfile, scheme: Scheme): number {
  let score = 50;

  // Category match bonus
  const allowedCategories = scheme.eligibilityCriteria.category;
  if (allowedCategories.includes(profile.category as never)) {
    // Special categories get higher score on targeted schemes
    if (['sc', 'st', 'obc', 'minority'].includes(profile.category)) {
      score += 25;
    } else {
      score += 15;
    }
  }

  // PM-DAKSH is exclusively for marginalized — strong match for SC/OBC
  if (scheme.id === 'pm-daksh') {
    if (['sc', 'obc', 'safai_karamchari', 'denotified_nomadic_tribe'].includes(profile.category)) {
      score = 90;
    } else {
      score = 10; // Not the target beneficiary
    }
  }

  // PM SVANidhi — only for street vendors
  if (scheme.id === 'pm-svanidhi') {
    score = profile.isStreetVendor ? 95 : 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Does the scheme align with the user's current business stage?
 */
function scoreStageCompatibility(profile: UserProfile, scheme: Scheme): number {
  const allowed = scheme.eligibilityCriteria.businessStages;
  if (allowed.includes(profile.businessStage)) return 100;

  // Adjacent stages — partial credit
  const stageOrder = ['idea', 'startup', 'growing', 'established'];
  const userIdx = stageOrder.indexOf(profile.businessStage);
  const minAllowed = Math.min(...allowed.map((s) => stageOrder.indexOf(s)));
  const maxAllowed = Math.max(...allowed.map((s) => stageOrder.indexOf(s)));

  if (userIdx === maxAllowed + 1) return 50; // One stage ahead
  if (userIdx === minAllowed - 1) return 40; // One stage behind
  return 20; // Far off
}

/**
 * Location match — does the scheme apply in the user's area?
 */
function scoreLocationCompatibility(profile: UserProfile, scheme: Scheme): number {
  const states = scheme.eligibilityCriteria.states;
  if (states === 'all') return 100;
  if (states === 'urban_areas_only') return profile.isUrban ? 100 : 20;
  if (Array.isArray(states) && states.includes(profile.state)) return 100;
  return 10;
}

/**
 * Does the scheme's purpose align with the user's need?
 */
function scorePurposeAlignment(profile: UserProfile, scheme: Scheme): number {
  // Startup / idea stage → startup funding most relevant
  if (profile.businessStage === 'idea' || profile.businessStage === 'startup') {
    if (['loan', 'loan_with_subsidy'].includes(scheme.category)) return 85;
    if (scheme.category === 'training') return 70;
  }

  if (profile.businessStage === 'growing') {
    if (scheme.category === 'loan') return 90;
    if (scheme.category === 'loan_with_subsidy') return 80;
  }

  // PMEGP — best for larger startup needs
  if (scheme.id === 'pmegp' && profile.fundingRequirement > 100000) return 90;
  if (scheme.id === 'pmegp' && profile.fundingRequirement <= 50000) return 50;

  // MUDRA Shishu — best for small needs
  if (scheme.id === 'mudra-shishu' && profile.fundingRequirement <= 50000) return 95;
  if (scheme.id === 'mudra-shishu' && profile.fundingRequirement > 100000) return 30;

  return 60;
}

// ─── Weighted Score Combiner ──────────────────────────────────────────────────

const WEIGHTS = {
  businessCompatibility: 0.20,
  fundingCompatibility: 0.25,
  beneficiaryCompatibility: 0.20,
  stageCompatibility: 0.15,
  locationCompatibility: 0.10,
  purposeAlignment: 0.10,
};

function computeMatchScore(breakdown: MatchScoreBreakdown): number {
  return Math.round(
    breakdown.businessCompatibility * WEIGHTS.businessCompatibility +
    breakdown.fundingCompatibility * WEIGHTS.fundingCompatibility +
    breakdown.beneficiaryCompatibility * WEIGHTS.beneficiaryCompatibility +
    breakdown.stageCompatibility * WEIGHTS.stageCompatibility +
    breakdown.locationCompatibility * WEIGHTS.locationCompatibility +
    breakdown.purposeAlignment * WEIGHTS.purposeAlignment
  );
}

// ─── Human-readable Reason Generators (DETERMINISTIC text from data) ─────────

function buildWhyItMatches(profile: UserProfile, scheme: Scheme, breakdown: MatchScoreBreakdown): string[] {
  const reasons: string[] = [];

  if (breakdown.fundingCompatibility >= 80) {
    const maxF = scheme.fundingDetails.maxAmount ?? scheme.fundingDetails.tranche3 ?? 0;
    if (maxF > 0) reasons.push(`Scheme can fund up to ₹${maxF.toLocaleString('en-IN')} — matches your requirement.`);
  }
  if (breakdown.beneficiaryCompatibility >= 70) {
    reasons.push(`You belong to ${profile.category.toUpperCase()} category, which is a priority beneficiary for this scheme.`);
  }
  if (breakdown.stageCompatibility === 100) {
    reasons.push(`Designed for ${profile.businessStage} stage businesses like yours.`);
  }
  if (breakdown.locationCompatibility === 100) {
    reasons.push(`Available in ${profile.state} (${profile.isUrban ? 'Urban' : 'Rural'} area).`);
  }
  if (scheme.tags.includes('no-collateral') || scheme.tags.includes('micro-loan')) {
    reasons.push('No collateral required — ideal for entrepreneurs without property assets.');
  }
  if (scheme.category === 'loan_with_subsidy') {
    reasons.push('Includes a government subsidy component that does not need to be repaid.');
  }
  if (scheme.id === 'pm-svanidhi' && profile.isStreetVendor) {
    reasons.push('Exclusively designed for street vendors — your primary occupation matches perfectly.');
  }
  if (scheme.id === 'pm-daksh' && ['sc', 'obc'].includes(profile.category)) {
    reasons.push('Free skill training with stipend — builds your capabilities before you invest.');
  }
  if (scheme.successRate >= 80) {
    reasons.push(`High success rate of ${scheme.successRate}% for similar applicants.`);
  }

  return reasons.length > 0 ? reasons : [`${scheme.shortName} is a general-purpose scheme applicable to your profile.`];
}

function buildWhyEligible(eligResult: ReturnType<typeof evaluateEligibility>): string[] {
  return eligResult.passedChecks.map(
    (c) => `✓ ${c.label}: ${c.userValue} meets the requirement of ${c.requiredValue}.`
  );
}

function buildMissingRequirements(eligResult: ReturnType<typeof evaluateEligibility>): string[] {
  const missing: string[] = [];
  for (const c of eligResult.failedChecks) {
    if (c.note) missing.push(c.note);
    else missing.push(`${c.label}: Your value "${c.userValue}" does not meet the required "${c.requiredValue}".`);
  }
  for (const c of eligResult.missingInfoChecks) {
    if (!eligResult.failedChecks.find((f) => f.criterion === c.criterion)) {
      missing.push(c.note ?? `${c.label} information is needed to confirm eligibility.`);
    }
  }
  return missing;
}

// ─── Main Recommendation Function ─────────────────────────────────────────────

export function recommendSchemes(
  profile: UserProfile,
  schemes: Scheme[]
): RecommendationResult[] {
  const results: RecommendationResult[] = schemes.map((scheme) => {
    // 1. Compute match score breakdown (pure relevance — no eligibility)
    const breakdown: MatchScoreBreakdown = {
      businessCompatibility: scoreBusinessCompatibility(profile, scheme),
      fundingCompatibility: scoreFundingCompatibility(profile, scheme),
      beneficiaryCompatibility: scoreBeneficiaryCompatibility(profile, scheme),
      stageCompatibility: scoreStageCompatibility(profile, scheme),
      locationCompatibility: scoreLocationCompatibility(profile, scheme),
      purposeAlignment: scorePurposeAlignment(profile, scheme),
      total: 0,
    };
    breakdown.total = computeMatchScore(breakdown);

    // 2. Run deterministic eligibility check (completely separate from match score)
    const eligibilityResult = evaluateEligibility(profile, scheme);

    // 3. Build human-readable explanations (from structured data, not LLM)
    const whyItMatches = buildWhyItMatches(profile, scheme, breakdown);
    const whyEligible = buildWhyEligible(eligibilityResult);
    const missingRequirements = buildMissingRequirements(eligibilityResult);

    return {
      scheme,
      matchScore: breakdown.total,
      matchScoreBreakdown: breakdown,
      eligibilityResult,
      whyItMatches,
      whyEligible,
      missingRequirements,
      requiredDocuments: scheme.requiredDocuments,
      priorityRank: 0, // set after sorting
    };
  });

  // 4. Sort: ELIGIBLE first, then by match score descending
  results.sort((a, b) => {
    const statusOrder = { ELIGIBLE: 0, NEEDS_MORE_INFORMATION: 1, NOT_ELIGIBLE: 2 };
    const statusDiff =
      statusOrder[a.eligibilityResult.status] - statusOrder[b.eligibilityResult.status];
    if (statusDiff !== 0) return statusDiff;
    return b.matchScore - a.matchScore;
  });

  // 5. Assign rank
  results.forEach((r, i) => (r.priorityRank = i + 1));

  return results;
}
