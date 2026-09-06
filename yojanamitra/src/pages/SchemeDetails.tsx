import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Phone, CheckCircle2, XCircle, AlertCircle,
  Clock, TrendingUp, DollarSign, BookOpen, FileText, Info, MapPin,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { EligibilityBadge } from '../components/ui/EligibilityBadge';
import { MatchScoreRing } from '../components/ui/MatchScoreRing';
import { ProgressBar } from '../components/ui/ProgressBar';
import { formatCurrency, cn } from '../utils';
import type { EligibilityCriterionCheck } from '../types';

function CriterionRow({ check }: { check: EligibilityCriterionCheck }) {
  const icon = check.passed
    ? <CheckCircle2 size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
    : check.isMissingInfo
    ? <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
    : <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />;

  return (
    <div className={cn(
      'flex items-start gap-3 p-3 rounded-lg border text-sm',
      check.passed
        ? 'bg-green-50 border-green-100'
        : check.isBlocking
        ? 'bg-red-50 border-red-100'
        : 'bg-amber-50 border-amber-100'
    )}>
      {icon}
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={cn('font-semibold', check.passed ? 'text-green-800' : check.isBlocking ? 'text-red-800' : 'text-amber-800')}>
            {check.label}
          </span>
          {check.isBlocking && !check.passed && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">BLOCKING</span>
          )}
        </div>
        <div className="flex gap-3 mt-1 flex-wrap">
          <span className="text-xs text-gray-500">Your value: <strong>{check.userValue}</strong></span>
          <span className="text-xs text-gray-400">Required: <strong>{check.requiredValue}</strong></span>
        </div>
        {check.note && <p className="text-xs text-gray-600 mt-1 italic">{check.note}</p>}
      </div>
    </div>
  );
}

export default function SchemeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const { recommendations } = useRecommendations(profile);
  const result = recommendations.find((r) => r.scheme.id === id);

  if (!result) {
    return (
      <div className="page-container py-16 text-center">
        <p className="text-gray-400 mb-4">Scheme not found.</p>
        <button onClick={() => navigate('/schemes')} className="btn-primary">← Back to Schemes</button>
      </div>
    );
  }

  const { scheme, matchScore, matchScoreBreakdown, eligibilityResult, whyItMatches, missingRequirements } = result;
  const fd = scheme.fundingDetails;

  const maxFunding = fd.maxAmount ?? fd.maxAmountService ?? fd.tranche3 ?? 0;
  const minFunding = fd.minAmount ?? fd.tranche1 ?? 0;

  const breakdownItems = [
    { label: 'Business Fit', score: matchScoreBreakdown.businessCompatibility },
    { label: 'Funding Match', score: matchScoreBreakdown.fundingCompatibility },
    { label: 'Beneficiary Match', score: matchScoreBreakdown.beneficiaryCompatibility },
    { label: 'Stage Match', score: matchScoreBreakdown.stageCompatibility },
    { label: 'Location Match', score: matchScoreBreakdown.locationCompatibility },
    { label: 'Purpose Alignment', score: matchScoreBreakdown.purposeAlignment },
  ];

  return (
    <div className="page-container py-8">
      {/* Back */}
      <button
        onClick={() => navigate('/schemes')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1e3a5f] mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Scheme Passport
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── Main Column ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header Card */}
          <div className="card">
            <div className="flex items-start gap-5">
              <MatchScoreRing score={matchScore} size="md" className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{scheme.category.replace(/_/g, ' ')} · {scheme.ministry}</span>
                    <h1 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5 leading-tight">{scheme.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{scheme.implementingAgency}</p>
                  </div>
                  <EligibilityBadge status={eligibilityResult.status} size="md" className="flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{scheme.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {scheme.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, label: 'Max Funding', value: maxFunding ? formatCurrency(maxFunding) : 'Free Training', color: 'text-[#1e3a5f]' },
              { icon: DollarSign, label: 'Min Funding', value: minFunding ? formatCurrency(minFunding) : '—', color: 'text-gray-700' },
              { icon: Clock, label: 'Processing', value: scheme.applicationRoute.processingTime, color: 'text-gray-700' },
              { icon: TrendingUp, label: 'Success Rate', value: `${scheme.successRate}%`, color: 'text-green-600' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="card p-4">
                <Icon size={16} className="text-gray-400 mb-2" />
                <p className="text-xs text-gray-400">{label}</p>
                <p className={cn('text-sm font-bold mt-0.5', color)}>{value}</p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-[#1e3a5f]" />
              <h2 className="font-bold text-[#1e3a5f]">Key Benefits</h2>
            </div>
            <ul className="space-y-2">
              {scheme.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Why It Matches */}
          {whyItMatches.length > 0 && (
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Info size={18} className="text-[#1e3a5f]" />
                <h2 className="font-bold text-[#1e3a5f]">Why This Scheme Matches Your Profile</h2>
              </div>
              <ul className="space-y-2">
                {whyItMatches.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    {reason}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
                <strong>Note:</strong> Match reasons are generated from your profile data and verified scheme criteria — not from an AI language model.
              </div>
            </div>
          )}

          {/* Eligibility Check Details */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#1e3a5f] flex items-center gap-2">
                <FileText size={18} />
                Eligibility Check (Verified Rules)
              </h2>
              <EligibilityBadge status={eligibilityResult.status} size="sm" />
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-600">
              <strong>How this works:</strong> Each criterion below is evaluated against the official government eligibility rules for {scheme.shortName}. This is a deterministic check — no AI is involved in the eligibility decision.
            </div>

            <p className="text-sm text-gray-600 mb-3 italic">{eligibilityResult.summary}</p>

            <div className="space-y-2">
              {eligibilityResult.checks.map((check) => (
                <CriterionRow key={check.criterion} check={check} />
              ))}
            </div>

            {/* Missing Requirements */}
            {missingRequirements.length > 0 && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-bold text-amber-800 mb-2">What you need to become eligible:</p>
                <ul className="space-y-1.5">
                  {missingRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
                      <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Required Documents */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
              <FileText size={18} /> Required Documents
            </h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {scheme.requiredDocuments.map((doc) => (
                <div key={doc} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <CheckCircle2 size={14} className="text-gray-400 flex-shrink-0" />
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Sidebar ─────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Match Score Breakdown */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-4">Match Score Breakdown</h2>
            <div className="flex justify-center mb-4">
              <MatchScoreRing score={matchScore} size="lg" />
            </div>
            <div className="space-y-2.5">
              {breakdownItems.map(({ label, score }) => (
                <div key={label} className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-28 flex-shrink-0 text-right">{label}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-[#1e3a5f] transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className="text-gray-700 font-bold w-7 text-right">{score}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-400">
              Match score ≠ eligibility. High score = good fit for your context.
            </div>
          </div>

          {/* Application Routes */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-3">How to Apply</h2>
            <div className="space-y-2">
              {scheme.applicationRoute.online && (
                <a
                  href={scheme.applicationRoute.online}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#162640] transition-colors"
                >
                  <ExternalLink size={15} /> Apply Online
                </a>
              )}
              {scheme.applicationRoute.helpline && (
                <a
                  href={`tel:${scheme.applicationRoute.helpline}`}
                  className="flex items-center gap-2 w-full px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone size={15} /> {scheme.applicationRoute.helpline}
                </a>
              )}
              {scheme.applicationRoute.offline && (
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                  <MapPin size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  {scheme.applicationRoute.offline}
                </div>
              )}
              <button
                onClick={() => navigate('/partners')}
                className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Find Nearby Partners
              </button>
            </div>
          </div>

          {/* Eligibility Summary Panel */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-3">Your Eligibility Summary</h2>
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Criteria Checked</span>
                <span className="font-bold">{eligibilityResult.checks.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">✓ Passed</span>
                <span className="font-bold text-green-700">{eligibilityResult.passedChecks.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-red-500">✗ Blocking</span>
                <span className="font-bold text-red-600">{eligibilityResult.blockingConditions.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-amber-600">⚠ Missing Info</span>
                <span className="font-bold text-amber-700">{eligibilityResult.missingInfoChecks.length}</span>
              </div>
            </div>
            <ProgressBar
              value={Math.round((eligibilityResult.passedChecks.length / eligibilityResult.checks.length) * 100)}
              showPercent
              color={eligibilityResult.status === 'ELIGIBLE' ? 'bg-green-500' : eligibilityResult.status === 'NOT_ELIGIBLE' ? 'bg-red-500' : 'bg-amber-500'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
