/**
 * EligibilityEngine.ts
 *
 * DETERMINISTIC eligibility evaluation against verified government scheme rules.
 * NO AI, NO LLM, NO heuristics — pure structured rule evaluation.
 *
 * The engine evaluates each criterion independently, returns granular results,
 * and never makes eligibility decisions based on AI-generated text.
 */

import type {
  Scheme,
  UserProfile,
  EligibilityResult,
  EligibilityCriterionCheck,
  EligibilityStatus,
  Category,
  Gender,
  BusinessStage,
  Occupation,
} from '../types';

// ─── Internal Helpers ─────────────────────────────────────────────────────────

function check(
  criterion: string,
  label: string,
  userValue: string,
  requiredValue: string,
  passed: boolean,
  isBlocking: boolean,
  isMissingInfo: boolean,
  note?: string
): EligibilityCriterionCheck {
  return { criterion, label, userValue, requiredValue, passed, isBlocking, isMissingInfo, note };
}

function educationLevel(level: UserProfile['educationLevel']): number {
  const map: Record<UserProfile['educationLevel'], number> = {
    no_formal: 0,
    primary: 1,
    '8th_pass': 2,
    '10th_pass': 3,
    '12th_pass': 4,
    graduate: 5,
    postgraduate: 6,
  };
  return map[level] ?? 0;
}

// ─── Per-Criterion Evaluators ─────────────────────────────────────────────────

function evalAge(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck {
  const { minAge, maxAge } = scheme.eligibilityCriteria;
  const userAge = profile.age;
  const ageOk = userAge >= minAge && (maxAge === null || userAge <= maxAge);
  const required = maxAge ? `${minAge}–${maxAge}` : `${minAge}+`;
  return check(
    'age',
    'Age Requirement',
    `${userAge} years`,
    required,
    ageOk,
    !ageOk,
    userAge === 0,
    maxAge !== null ? `Maximum age for this scheme is ${maxAge}.` : undefined
  );
}

function evalGender(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck {
  const allowed = scheme.eligibilityCriteria.gender as Gender[];
  // If scheme specifies only specific genders, check; if it's broad (all), pass
  const passed =
    allowed.includes('male') &&
    allowed.includes('female') &&
    allowed.includes('other')
      ? true // All genders accepted
      : allowed.includes(profile.gender as Gender);
  return check(
    'gender',
    'Gender Eligibility',
    profile.gender,
    allowed.join(' / '),
    passed,
    !passed,
    profile.gender === 'prefer_not_to_say'
  );
}

function evalCategory(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck {
  const allowed = scheme.eligibilityCriteria.category as Category[];
  const passed = allowed.includes(profile.category as Category);
  return check(
    'category',
    'Social Category',
    profile.category.toUpperCase(),
    allowed.map((c) => c.toUpperCase()).join(' / '),
    passed,
    !passed,
    false,
    passed ? undefined : `This scheme is restricted to: ${allowed.join(', ')}.`
  );
}

function evalBusinessStage(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck {
  const allowed = scheme.eligibilityCriteria.businessStages as BusinessStage[];
  const passed = allowed.includes(profile.businessStage);
  const stageLabels: Record<BusinessStage, string> = {
    idea: 'Idea / Not started',
    startup: 'Just started (<1 year)',
    growing: 'Growing (1–3 years)',
    established: 'Established (3+ years)',
  };
  return check(
    'businessStage',
    'Business Stage',
    stageLabels[profile.businessStage],
    allowed.map((s) => stageLabels[s]).join(' / '),
    passed,
    !passed,
    false
  );
}

function evalOccupation(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck {
  const allowed = scheme.eligibilityCriteria.occupation as Occupation[];
  const passed = allowed.includes('any') || allowed.includes(profile.occupation as Occupation);
  return check(
    'occupation',
    'Occupation',
    profile.occupation.replace(/_/g, ' '),
    allowed.includes('any') ? 'Any occupation' : allowed.map((o) => o.replace(/_/g, ' ')).join(' / '),
    passed,
    !passed && !allowed.includes('any'),
    false
  );
}

function evalStreetVendor(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  const required = scheme.eligibilityCriteria.streetVendor;
  if (required !== true) return null; // Scheme doesn't require street vendor status
  const passed = profile.isStreetVendor;
  return check(
    'streetVendor',
    'Street Vendor Status',
    profile.isStreetVendor ? 'Yes – registered street vendor' : 'No',
    'Must be a street vendor',
    passed,
    !passed,
    false,
    !passed
      ? 'This scheme is exclusively for street vendors with a Certificate of Vending or Letter of Recommendation from ULB.'
      : undefined
  );
}

function evalStreetVendorCertificate(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  if (scheme.id !== 'pm-svanidhi') return null;
  if (!profile.isStreetVendor) return null; // Blocked by street vendor check already
  const hasCert = profile.hasStreetVendorCertificate;
  return check(
    'streetVendorCertificate',
    'Certificate of Vending / LoR from ULB',
    hasCert ? 'Available' : 'Not available',
    'Certificate of Vending (CoV) OR Letter of Recommendation (LoR) from ULB/TVC',
    hasCert,
    false, // Not hard-blocking — can be obtained
    !hasCert,
    !hasCert
      ? 'You need to obtain a Certificate of Vending from your local ULB (Municipal Corporation) or a Letter of Recommendation from the Town Vending Committee.'
      : undefined
  );
}

function evalLocation(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  const states = scheme.eligibilityCriteria.states;
  if (states === 'all') return null; // No location restriction
  if (states === 'urban_areas_only') {
    const passed = profile.isUrban;
    return check(
      'location',
      'Location (Urban Area)',
      profile.isUrban ? 'Urban' : 'Rural',
      'Must be in an urban area',
      passed,
      !passed,
      false,
      !passed
        ? 'PM SVANidhi is only for street vendors in urban areas covered by Urban Local Bodies (ULBs).'
        : undefined
    );
  }
  if (Array.isArray(states)) {
    const passed = states.includes(profile.state);
    return check(
      'location',
      'State Eligibility',
      profile.state,
      states.join(', '),
      passed,
      !passed,
      false
    );
  }
  return null;
}

function evalEducation(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  const eduCriteria = scheme.eligibilityCriteria.education;
  if (!eduCriteria.required) return null;

  // PMEGP: 8th pass required if project > ₹10L manufacturing / ₹5L service
  if (scheme.id === 'pmegp') {
    const projectCost = profile.fundingRequirement;
    const threshold = 1000000; // ₹10L
    if (projectCost > threshold) {
      const passed = educationLevel(profile.educationLevel) >= educationLevel('8th_pass');
      return check(
        'education',
        'Minimum Education (for project > ₹10L)',
        profile.educationLevel.replace(/_/g, ' '),
        '8th pass or above',
        passed,
        !passed,
        false,
        !passed ? 'PMEGP requires minimum 8th pass education for projects above ₹10 lakhs.' : undefined
      );
    }
    return null; // Not needed for smaller projects
  }
  return null;
}

function evalExistingBeneficiary(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  const eb = scheme.eligibilityCriteria.existingBeneficiary;
  if (!eb) return null;

  if (scheme.id === 'pmegp' && eb.allowedIfPreviousPMEGP === false) {
    const isPrevious = profile.previousPMEGPBeneficiary;
    return check(
      'existingBeneficiary',
      'Previous PMEGP Beneficiary',
      isPrevious ? 'Yes – previous PMEGP beneficiary' : 'No',
      'Must NOT be a previous PMEGP / PMRY / REGP beneficiary',
      !isPrevious,
      isPrevious,
      false,
      isPrevious
        ? 'Existing PMEGP beneficiaries are not eligible for a second loan under PMEGP (except SC/ST/PwD/NER/aspirational district for upgradation).'
        : undefined
    );
  }
  return null;
}

function evalCIBIL(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  if (!scheme.eligibilityCriteria.noBadCIBIL) return null;
  return check(
    'cibil',
    'Credit History (No Default)',
    profile.hasCIBILDefault ? 'Has existing default' : 'Clean credit history',
    'No existing loan default / bad CIBIL',
    !profile.hasCIBILDefault,
    profile.hasCIBILDefault,
    false,
    profile.hasCIBILDefault
      ? 'Lenders under MUDRA typically require a clean credit history. Applicants with existing defaults may be rejected by individual banks.'
      : undefined
  );
}

function evalIncome(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  const income = scheme.eligibilityCriteria.incomeCriteria;
  if (!income?.annualFamilyIncome) return null;

  const annualIncome = profile.annualFamilyIncome;
  let maxAllowed: number | undefined;
  let label = '';

  if (profile.category === 'sc' || profile.category === 'st') {
    maxAllowed = income.annualFamilyIncome.maxForSC;
    label = 'SC/ST: Annual family income ≤ ₹3,00,000';
  } else if (profile.category === 'obc') {
    maxAllowed = income.annualFamilyIncome.maxForOBC;
    label = 'OBC: Annual family income ≤ ₹1,00,000';
  } else {
    return null; // No income criteria for this category in this scheme
  }

  if (maxAllowed === undefined) return null;
  const passed = annualIncome <= maxAllowed;

  return check(
    'income',
    'Annual Family Income',
    `₹${annualIncome.toLocaleString('en-IN')}`,
    `≤ ₹${maxAllowed.toLocaleString('en-IN')} (${label.split(':')[0]})`,
    passed,
    !passed,
    annualIncome === 0,
    !passed ? label : undefined
  );
}

function evalFundingRange(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  const fd = scheme.fundingDetails;
  const req = profile.fundingRequirement;
  if (req === 0) return null; // Not provided, skip

  const maxFunding =
    fd.maxAmount ??
    Math.max(fd.maxAmountManufacturing ?? 0, fd.maxAmountService ?? 0) ??
    fd.tranche3 ??
    0;
  const minFunding = fd.minAmount ?? fd.tranche1 ?? 0;

  if (maxFunding === 0) return null;

  const passed = req >= minFunding && req <= maxFunding;
  return check(
    'fundingRange',
    'Funding Requirement vs. Scheme Range',
    `₹${req.toLocaleString('en-IN')}`,
    `₹${minFunding.toLocaleString('en-IN')} – ₹${maxFunding.toLocaleString('en-IN')}`,
    passed,
    false, // Non-blocking — user can adjust project scope
    false,
    !passed && req > maxFunding
      ? `Your funding requirement (₹${req.toLocaleString('en-IN')}) exceeds this scheme's maximum (₹${maxFunding.toLocaleString('en-IN')}).`
      : !passed && req < minFunding
      ? `Your funding requirement is below this scheme's minimum.`
      : undefined
  );
}

function evalCategoryForPMDaksh(profile: UserProfile, scheme: Scheme): EligibilityCriterionCheck | null {
  if (scheme.id !== 'pm-daksh') return null;
  // PM-DAKSH has strict category requirement — SC, OBC, DNT, Safai Karamchari
  const allowed: Category[] = ['sc', 'obc', 'safai_karamchari', 'denotified_nomadic_tribe'];
  const passed = allowed.includes(profile.category as Category);
  if (passed) return null; // Already covered by evalCategory
  return null;
}

// ─── Main Engine ──────────────────────────────────────────────────────────────

export function evaluateEligibility(profile: UserProfile, scheme: Scheme): EligibilityResult {
  const rawChecks: EligibilityCriterionCheck[] = [];

  // Run all evaluators
  rawChecks.push(evalAge(profile, scheme));
  rawChecks.push(evalGender(profile, scheme));
  rawChecks.push(evalCategory(profile, scheme));
  rawChecks.push(evalBusinessStage(profile, scheme));
  rawChecks.push(evalOccupation(profile, scheme));

  const locationCheck = evalLocation(profile, scheme);
  if (locationCheck) rawChecks.push(locationCheck);

  const streetVendorCheck = evalStreetVendor(profile, scheme);
  if (streetVendorCheck) rawChecks.push(streetVendorCheck);

  const svCertCheck = evalStreetVendorCertificate(profile, scheme);
  if (svCertCheck) rawChecks.push(svCertCheck);

  const eduCheck = evalEducation(profile, scheme);
  if (eduCheck) rawChecks.push(eduCheck);

  const existingBenCheck = evalExistingBeneficiary(profile, scheme);
  if (existingBenCheck) rawChecks.push(existingBenCheck);

  const cibilCheck = evalCIBIL(profile, scheme);
  if (cibilCheck) rawChecks.push(cibilCheck);

  const incomeCheck = evalIncome(profile, scheme);
  if (incomeCheck) rawChecks.push(incomeCheck);

  const fundingCheck = evalFundingRange(profile, scheme);
  if (fundingCheck) rawChecks.push(fundingCheck);

  const pmDakshCatCheck = evalCategoryForPMDaksh(profile, scheme);
  if (pmDakshCatCheck) rawChecks.push(pmDakshCatCheck);

  // Partition results
  const passedChecks = rawChecks.filter((c) => c.passed);
  const failedChecks = rawChecks.filter((c) => !c.passed);
  const missingInfoChecks = rawChecks.filter((c) => c.isMissingInfo);
  const blockingChecks = failedChecks.filter((c) => c.isBlocking);

  const blockingConditions = blockingChecks.map((c) => c.note ?? `${c.label}: ${c.userValue} does not meet requirement of ${c.requiredValue}`);
  const missingInformation = missingInfoChecks.map((c) => c.note ?? `${c.label} information is required`);
  const unmetCriteria = failedChecks.filter((c) => !c.isMissingInfo).map((c) => c.label);
  const matchedCriteria = passedChecks.map((c) => c.label);

  // ─── Determine Status ─────────────────────────────────────────────────────
  let status: EligibilityStatus;

  if (blockingChecks.length > 0) {
    status = 'NOT_ELIGIBLE';
  } else if (missingInfoChecks.length > 0) {
    status = 'NEEDS_MORE_INFORMATION';
  } else if (failedChecks.length === 0) {
    status = 'ELIGIBLE';
  } else {
    // Has non-blocking failures — could still apply, but has gaps
    status = 'NEEDS_MORE_INFORMATION';
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  let summary = '';
  if (status === 'ELIGIBLE') {
    summary = `You meet all verified eligibility criteria for ${scheme.shortName}.`;
  } else if (status === 'NOT_ELIGIBLE') {
    summary = `You do not meet ${blockingChecks.length} blocking criterion/criteria for ${scheme.shortName}: ${blockingConditions[0] ?? ''}`;
  } else {
    const missingCount = missingInfoChecks.length + failedChecks.filter((c) => !c.isBlocking && !c.isMissingInfo).length;
    summary = `You meet most criteria but ${missingCount} requirement(s) need attention before you can apply for ${scheme.shortName}.`;
  }

  return {
    schemeId: scheme.id,
    status,
    checks: rawChecks,
    passedChecks,
    failedChecks,
    missingInfoChecks,
    blockingConditions,
    missingInformation,
    unmetCriteria,
    matchedCriteria,
    summary,
  };
}
