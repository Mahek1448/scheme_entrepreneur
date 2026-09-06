import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, Info, CheckCircle2, AlertCircle,
  ChevronDown, ChevronUp, SlidersHorizontal,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { EligibilityBadge } from '../components/ui/EligibilityBadge';
import { MatchScoreRing } from '../components/ui/MatchScoreRing';
import { formatCurrency, cn } from '../utils';
import type { RecommendationResult, EligibilityStatus } from '../types';

type CategoryFilter = 'all' | 'loan' | 'loan_with_subsidy' | 'training';
type EligibilityFilter = 'all' | EligibilityStatus;
type BeneficiaryFilter = 'all' | 'women' | 'sc_st' | 'obc' | 'street_vendor';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Types',
  loan: 'Loan',
  loan_with_subsidy: 'Loan + Subsidy',
  training: 'Training',
};

const ELIGIBILITY_LABELS: Record<string, string> = {
  all: 'All Status',
  ELIGIBLE: 'Eligible',
  NEEDS_MORE_INFORMATION: 'Needs Info',
  NOT_ELIGIBLE: 'Not Eligible',
};

function SchemeCardMini({ result, onClick }: { result: RecommendationResult; onClick: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const { scheme, matchScore, eligibilityResult, whyItMatches, missingRequirements } = result;

  const statusBorderColor: Record<EligibilityStatus, string> = {
    ELIGIBLE: 'border-l-green-500',
    NOT_ELIGIBLE: 'border-l-red-400',
    NEEDS_MORE_INFORMATION: 'border-l-amber-400',
  };

  const fundingLabel = () => {
    const fd = scheme.fundingDetails;
    if (fd.tranche1) return `₹${(fd.tranche1 / 1000).toFixed(0)}K – ₹${((fd.tranche3 ?? fd.tranche1) / 1000).toFixed(0)}K`;
    const max = fd.maxAmount ?? fd.maxAmountService ?? 0;
    return max ? formatCurrency(max) : 'Grant / Training';
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 overflow-hidden transition-all hover:shadow-md',
        statusBorderColor[eligibilityResult.status]
      )}
    >
      {/* Card Header */}
      <div
        className="p-5 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          {/* Score Ring */}
          <MatchScoreRing score={matchScore} size="sm" showLabel={false} className="flex-shrink-0 mt-1" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider"># {result.priorityRank} · {scheme.category.replace(/_/g, ' ')}</span>
                <h3 className="font-bold text-gray-900 text-base leading-tight mt-0.5">{scheme.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{scheme.ministry}</p>
              </div>
              <EligibilityBadge status={eligibilityResult.status} size="sm" className="flex-shrink-0" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div>
                <p className="text-xs text-gray-400">Funding</p>
                <p className="text-sm font-bold text-[#1e3a5f]">{fundingLabel()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Match Score</p>
                <p className="text-sm font-bold" style={{ color: matchScore >= 80 ? '#16a34a' : matchScore >= 60 ? '#d97706' : '#2563eb' }}>
                  {matchScore}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Success Rate</p>
                <p className="text-sm font-bold text-gray-700">{scheme.successRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Processing</p>
                <p className="text-sm font-bold text-gray-700">{scheme.applicationRoute.processingTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Preview */}
      <div className="px-5 pb-1">
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1e3a5f] transition-colors mb-2"
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Show less' : 'Quick preview'}
        </button>

        {expanded && (
          <div className="pb-4 space-y-3">
            {/* Why It Matches */}
            {whyItMatches.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">Why it matches you</p>
                <div className="space-y-1">
                  {whyItMatches.slice(0, 3).map((reason, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {reason}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Requirements */}
            {missingRequirements.length > 0 && eligibilityResult.status !== 'ELIGIBLE' && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">What you still need</p>
                <div className="space-y-1">
                  {missingRequirements.slice(0, 2).map((req, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg px-2 py-1">
                      <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligible checks */}
            {eligibilityResult.status === 'ELIGIBLE' && (
              <div className="bg-green-50 rounded-lg px-3 py-2">
                <p className="text-xs font-semibold text-green-800 mb-1">All eligibility criteria met ✓</p>
                <p className="text-xs text-green-700">{eligibilityResult.summary}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-5 pb-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {scheme.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">{tag}</span>
          ))}
        </div>
        <button
          onClick={onClick}
          className="flex items-center gap-1 text-xs text-[#1e3a5f] font-bold hover:underline flex-shrink-0"
        >
          Full Details <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}




export default function SchemePassport() {
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const { recommendations } = useRecommendations(profile);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [eligFilter, setEligFilter] = useState<EligibilityFilter>('all');
  const [beneficiaryFilter, setBeneficiaryFilter] = useState<BeneficiaryFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  const filtered = useMemo(() => {
    return recommendations.filter((r) => {
      const s = r.scheme;
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (eligFilter !== 'all' && r.eligibilityResult.status !== eligFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.shortName.toLowerCase().includes(q) && !s.tags.some((t) => t.includes(q))) return false;
      }
      if (beneficiaryFilter === 'women' && !s.eligibilityCriteria.gender.includes('female')) return false;
      if (beneficiaryFilter === 'sc_st' && !s.eligibilityCriteria.category.some((c) => ['sc', 'st'].includes(c))) return false;
      if (beneficiaryFilter === 'obc' && !s.eligibilityCriteria.category.includes('obc')) return false;
      if (beneficiaryFilter === 'street_vendor' && !s.eligibilityCriteria.streetVendor) return false;
      return true;
    });
  }, [recommendations, search, categoryFilter, eligFilter, beneficiaryFilter]);

  const eligibleCount = recommendations.filter((r) => r.eligibilityResult.status === 'ELIGIBLE').length;
  const needsInfoCount = recommendations.filter((r) => r.eligibilityResult.status === 'NEEDS_MORE_INFORMATION').length;

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="section-title">Scheme Passport</h1>
        <p className="text-gray-500 text-sm mt-1">
          Schemes ranked by relevance to your profile. Eligibility is determined by verified government rules — not AI.
        </p>
      </div>

      {/* Profile + Summary Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#16345a] rounded-2xl p-5 text-white mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/60 text-xs font-medium mb-0.5">Active Profile</p>
          <p className="font-bold text-base">{profile.name} · {profile.businessType}</p>
          <p className="text-white/70 text-sm">{profile.district}, {profile.state} · {profile.category.toUpperCase()} · ₹{(profile.fundingRequirement / 1000).toFixed(0)}K funding need</p>
        </div>
        <div className="flex gap-4 text-center flex-shrink-0">
          <div>
            <p className="text-2xl font-extrabold text-green-400">{eligibleCount}</p>
            <p className="text-xs text-white/60">Eligible</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-amber-400">{needsInfoCount}</p>
            <p className="text-xs text-white/60">Needs Info</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{recommendations.length}</p>
            <p className="text-xs text-white/60">Total</p>
          </div>
        </div>
      </div>

      {/* IMPORTANT: Match Score ≠ Eligibility callout */}
      <div
        className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3 cursor-pointer"
        onClick={() => setShowScoreInfo(!showScoreInfo)}
      >
        <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800">Match Score ≠ Eligibility Status</p>
          {showScoreInfo ? (
            <p className="text-xs text-blue-700 mt-1">
              <strong>Match Score</strong> measures how relevant a scheme is to your business profile (funding need, business type, stage, location). A high match score means the scheme is <em>well-suited</em> for your situation.
              <br /><br />
              <strong>Eligibility Status</strong> is a separate deterministic check against official government criteria (age, category, occupation, income limits etc). A scheme can have a 90% match score but still show "Not Eligible" if you don't meet a specific criterion.
              <br /><br />
              <strong>Both are shown side-by-side</strong> so you get the full picture.
            </p>
          ) : (
            <p className="text-xs text-blue-600">Tap to understand how match scores and eligibility work together. ↓</p>
          )}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9"
            placeholder="Search by scheme name or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors',
            showFilters ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
          )}
        >
          <SlidersHorizontal size={15} /> Filters
          {(categoryFilter !== 'all' || eligFilter !== 'all' || beneficiaryFilter !== 'all') && (
            <span className="w-2 h-2 rounded-full bg-orange-400" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-xl p-4 mb-5 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Scheme Type</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(CATEGORY_LABELS) as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                    categoryFilter === cat ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 text-gray-600'
                  )}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Eligibility</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(ELIGIBILITY_LABELS) as EligibilityFilter[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setEligFilter(e)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                    eligFilter === e ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 text-gray-600'
                  )}
                >
                  {ELIGIBILITY_LABELS[e]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Beneficiary</p>
            <div className="flex flex-wrap gap-1.5">
              {([
                ['all', 'All'],
                ['women', 'Women'],
                ['sc_st', 'SC/ST'],
                ['obc', 'OBC'],
                ['street_vendor', 'Street Vendor'],
              ] as [BeneficiaryFilter, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setBeneficiaryFilter(val)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                    beneficiaryFilter === val ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 text-gray-600'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result count */}
      <p className="text-xs text-gray-400 mb-4">
        Showing {filtered.length} of {recommendations.length} schemes · sorted by eligibility status then match score
      </p>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filtered.map((result) => (
          <SchemeCardMini
            key={result.scheme.id}
            result={result}
            onClick={() => navigate(`/schemes/${result.scheme.id}`)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No schemes match your filters.</p>
          <button
            onClick={() => { setSearch(''); setCategoryFilter('all'); setEligFilter('all'); setBeneficiaryFilter('all'); }}
            className="btn-secondary mt-4 text-sm"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
