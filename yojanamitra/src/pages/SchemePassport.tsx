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
import { t } from '../services/i18n';
import type { RecommendationResult, EligibilityStatus } from '../types';
import type { Language } from '../services/i18n';

type CategoryFilter = 'all' | 'loan' | 'loan_with_subsidy' | 'training';
type EligibilityFilter = 'all' | EligibilityStatus;
type BeneficiaryFilter = 'all' | 'women' | 'sc_st' | 'obc' | 'street_vendor';

// ── Translated filter label maps ──────────────────────────────────────────────
function getCategoryLabels(lang: Language) {
  const map: Record<Language, Record<string, string>> = {
    en: { all: 'All Types', loan: 'Loan', loan_with_subsidy: 'Loan + Subsidy', training: 'Training' },
    hi: { all: 'सभी प्रकार', loan: 'ऋण', loan_with_subsidy: 'ऋण + सब्सिडी', training: 'प्रशिक्षण' },
    mr: { all: 'सर्व प्रकार', loan: 'कर्ज', loan_with_subsidy: 'कर्ज + अनुदान', training: 'प्रशिक्षण' },
  };
  return map[lang] ?? map.en;
}

function getEligibilityLabels(lang: Language) {
  const map: Record<Language, Record<string, string>> = {
    en: { all: 'All Status', ELIGIBLE: 'Eligible', NEEDS_MORE_INFORMATION: 'Needs Info', NOT_ELIGIBLE: 'Not Eligible' },
    hi: { all: 'सभी स्थिति', ELIGIBLE: 'पात्र', NEEDS_MORE_INFORMATION: 'जानकारी चाहिए', NOT_ELIGIBLE: 'अपात्र' },
    mr: { all: 'सर्व स्थिती', ELIGIBLE: 'पात्र', NEEDS_MORE_INFORMATION: 'माहिती हवी', NOT_ELIGIBLE: 'अपात्र' },
  };
  return map[lang] ?? map.en;
}

function getBeneficiaryLabels(lang: Language): [BeneficiaryFilter, string][] {
  const labels: Record<Language, [BeneficiaryFilter, string][]> = {
    en: [['all','All'], ['women','Women'], ['sc_st','SC/ST'], ['obc','OBC'], ['street_vendor','Street Vendor']],
    hi: [['all','सभी'], ['women','महिलाएं'], ['sc_st','SC/ST'], ['obc','OBC'], ['street_vendor','स्ट्रीट वेंडर']],
    mr: [['all','सर्व'], ['women','महिला'], ['sc_st','SC/ST'], ['obc','OBC'], ['street_vendor','रस्त्यावरील विक्रेता']],
  };
  return labels[lang] ?? labels.en;
}

// ── Translated helper phrases ─────────────────────────────────────────────────
function getInfoNote(lang: Language, show: boolean) {
  if (lang === 'hi') return show
    ? ['मिलान स्कोर ≠ पात्रता स्थिति', 'मिलान स्कोर मापता है कि कोई योजना आपके प्रोफ़ाइल के लिए कितनी प्रासंगिक है। पात्रता स्थिति सरकारी मानदंडों की अलग जांच है।']
    : ['मिलान स्कोर ≠ पात्रता स्थिति', 'समझने के लिए टैप करें ↓'];
  if (lang === 'mr') return show
    ? ['जुळणी गुण ≠ पात्रता स्थिती', 'जुळणी गुण मोजतो की योजना तुमच्या प्रोफाइलसाठी किती योग्य आहे. पात्रता स्थिती सरकारी निकषांची स्वतंत्र तपासणी आहे.']
    : ['जुळणी गुण ≠ पात्रता स्थिती', 'समजण्यासाठी टॅप करा ↓'];
  return show
    ? ['Match Score ≠ Eligibility Status', 'Match Score measures how relevant a scheme is to your business profile. Eligibility Status is a separate deterministic check against official government criteria. Both shown side-by-side for the full picture.']
    : ['Match Score ≠ Eligibility Status', 'Tap to understand how match scores and eligibility work together. ↓'];
}

function getResultCountLabel(lang: Language, shown: number, total: number) {
  if (lang === 'hi') return `${shown} / ${total} योजनाएं दिखाई जा रही हैं`;
  if (lang === 'mr') return `${shown} / ${total} योजना दाखवत आहे`;
  return `Showing ${shown} of ${total} schemes`;
}

function getNoFilterLabel(lang: Language) {
  if (lang === 'hi') return ['फ़िल्टर से कोई योजना नहीं मिली।', 'सभी फ़िल्टर हटाएं'];
  if (lang === 'mr') return ['फिल्टरमध्ये कोणतीही योजना सापडली नाही.', 'सर्व फिल्टर काढा'];
  return ['No schemes match your filters.', 'Clear All Filters'];
}

function getFullDetailsLabel(lang: Language) {
  if (lang === 'hi') return 'पूरा विवरण';
  if (lang === 'mr') return 'पूर्ण तपशील';
  return 'Full Details';
}

function getShowMoreLabel(lang: Language, expanded: boolean) {
  if (lang === 'hi') return expanded ? 'कम दिखाएं' : 'त्वरित पूर्वावलोकन';
  if (lang === 'mr') return expanded ? 'कमी दाखवा' : 'जलद पूर्वावलोकन';
  return expanded ? 'Show less' : 'Quick preview';
}

function getAllEligMetLabel(lang: Language) {
  if (lang === 'hi') return 'सभी पात्रता मानदंड पूरे ✓';
  if (lang === 'mr') return 'सर्व पात्रता निकष पूर्ण ✓';
  return 'All eligibility criteria met ✓';
}

function getStillNeedLabel(lang: Language) {
  if (lang === 'hi') return 'आपको अभी भी क्या चाहिए';
  if (lang === 'mr') return 'तुम्हाला अजून काय हवे';
  return 'What you still need';
}

function getActiveProfileLabel(lang: Language) {
  if (lang === 'hi') return 'सक्रिय प्रोफ़ाइल';
  if (lang === 'mr') return 'सक्रिय प्रोफाइल';
  return 'Active Profile';
}

function getFundingNeedLabel(lang: Language, amount: string) {
  if (lang === 'hi') return `${amount} वित्तपोषण आवश्यकता`;
  if (lang === 'mr') return `${amount} निधी गरज`;
  return `${amount} funding need`;
}

// ── Scheme Card Mini ──────────────────────────────────────────────────────────
function SchemeCardMini({ result, onClick, language }: { result: RecommendationResult; onClick: () => void; language: Language }) {
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
      <div className="p-5 cursor-pointer" onClick={onClick}>
        <div className="flex items-start gap-4">
          <MatchScoreRing score={matchScore} size="sm" showLabel={false} className="flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
              <div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  # {result.priorityRank} · {scheme.category.replace(/_/g, ' ')}
                </span>
                <h3 className="font-bold text-gray-900 text-base leading-tight mt-0.5">{scheme.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{scheme.ministry}</p>
              </div>
              <EligibilityBadge status={eligibilityResult.status} size="sm" className="flex-shrink-0" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div>
                <p className="text-xs text-gray-400">{t('funding_label', language)}</p>
                <p className="text-sm font-bold text-[#1e3a5f]">{fundingLabel()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('match_score', language)}</p>
                <p className="text-sm font-bold" style={{ color: matchScore >= 80 ? '#16a34a' : matchScore >= 60 ? '#d97706' : '#2563eb' }}>
                  {matchScore}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('success_rate', language)}</p>
                <p className="text-sm font-bold text-gray-700">{scheme.successRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">{t('processing_time', language)}</p>
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
          {getShowMoreLabel(language, expanded)}
        </button>

        {expanded && (
          <div className="pb-4 space-y-3">
            {/* Why It Matches */}
            {whyItMatches.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1.5">{t('why_matches_you', language)}</p>
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
                <p className="text-xs font-semibold text-gray-600 mb-1.5">{getStillNeedLabel(language)}</p>
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
                <p className="text-xs font-semibold text-green-800 mb-1">{getAllEligMetLabel(language)}</p>
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
          {getFullDetailsLabel(language)} <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}


export default function SchemePassport() {
  const navigate = useNavigate();
  const { profile, language } = useAppStore();
  const { recommendations } = useRecommendations(profile);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [eligFilter, setEligFilter] = useState<EligibilityFilter>('all');
  const [beneficiaryFilter, setBeneficiaryFilter] = useState<BeneficiaryFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showScoreInfo, setShowScoreInfo] = useState(false);

  const categoryLabels = getCategoryLabels(language);
  const eligibilityLabels = getEligibilityLabels(language);
  const beneficiaryLabels = getBeneficiaryLabels(language);
  const infoNote = getInfoNote(language, showScoreInfo);
  const [noFilterMsg, clearFilterBtn] = getNoFilterLabel(language);

  const filtered = useMemo(() => {
    return recommendations.filter((r) => {
      const s = r.scheme;
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (eligFilter !== 'all' && r.eligibilityResult.status !== eligFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.shortName.toLowerCase().includes(q) && !s.tags.some((tag) => tag.includes(q))) return false;
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

  const searchPlaceholder = language === 'hi'
    ? 'योजना का नाम या कीवर्ड खोजें…'
    : language === 'mr'
    ? 'योजनेचे नाव किंवा कीवर्ड शोधा…'
    : 'Search by scheme name or keyword…';

  const filterLabel = language === 'hi' ? 'फ़िल्टर' : language === 'mr' ? 'फिल्टर' : 'Filters';
  const schemeTypeLabel = language === 'hi' ? 'योजना प्रकार' : language === 'mr' ? 'योजना प्रकार' : 'Scheme Type';
  const eligibilityLabel = language === 'hi' ? 'पात्रता' : language === 'mr' ? 'पात्रता' : 'Eligibility';
  const beneficiaryLabel = language === 'hi' ? 'लाभार्थी' : language === 'mr' ? 'लाभार्थी' : 'Beneficiary';
  const totalLabel = language === 'hi' ? 'कुल' : language === 'mr' ? 'एकूण' : 'Total';

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="section-title">{t('scheme_passport', language)}</h1>
        <p className="text-gray-500 text-sm mt-1">{t('scheme_passport_subtitle', language)}</p>
      </div>

      {/* Profile + Summary Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#16345a] rounded-2xl p-5 text-white mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/60 text-xs font-medium mb-0.5">{getActiveProfileLabel(language)}</p>
          <p className="font-bold text-base">
            {profile.name }{profile.businessType ? `  ${profile.businessType}` : ''}
          </p>
          <p className="text-white/70 text-sm">
            {[profile.district, profile.state].filter(Boolean).join(', ')}
            {profile.category ? ` · ${profile.category.toUpperCase()}` : ''}
            {profile.fundingRequirement > 0 ? ` · ${getFundingNeedLabel(language, formatCurrency(profile.fundingRequirement))}` : ''}
          </p>
        </div>
        <div className="flex gap-4 text-center flex-shrink-0">
          <div>
            <p className="text-2xl font-extrabold text-green-400">{eligibleCount}</p>
            <p className="text-xs text-white/60">{t('eligible', language)}</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-amber-400">{needsInfoCount}</p>
            <p className="text-xs text-white/60">{t('needs_info', language)}</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">{recommendations.length}</p>
            <p className="text-xs text-white/60">{totalLabel}</p>
          </div>
        </div>
      </div>

      {/* Match Score ≠ Eligibility callout */}
      <div
        className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3 cursor-pointer"
        onClick={() => setShowScoreInfo(!showScoreInfo)}
      >
        <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800">{infoNote[0]}</p>
          <p className="text-xs text-blue-600 mt-1">{infoNote[1]}</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input pl-9"
            placeholder={searchPlaceholder}
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
          <SlidersHorizontal size={15} /> {filterLabel}
          {(categoryFilter !== 'all' || eligFilter !== 'all' || beneficiaryFilter !== 'all') && (
            <span className="w-2 h-2 rounded-full bg-orange-400" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 rounded-xl p-4 mb-5 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">{schemeTypeLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                    categoryFilter === cat ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 text-gray-600'
                  )}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">{eligibilityLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(eligibilityLabels) as EligibilityFilter[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setEligFilter(e)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                    eligFilter === e ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 text-gray-600'
                  )}
                >
                  {eligibilityLabels[e]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">{beneficiaryLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {beneficiaryLabels.map(([val, label]) => (
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
        {getResultCountLabel(language, filtered.length, recommendations.length)}
      </p>

      {/* Scheme Cards */}
      <div className="space-y-4">
        {filtered.map((result) => (
          <SchemeCardMini
            key={result.scheme.id}
            result={result}
            language={language}
            onClick={() => navigate(`/schemes/${result.scheme.id}`)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">{noFilterMsg}</p>
          <button
            onClick={() => { setSearch(''); setCategoryFilter('all'); setEligFilter('all'); setBeneficiaryFilter('all'); }}
            className="btn-secondary mt-4 text-sm"
          >
            {clearFilterBtn}
          </button>
        </div>
      )}
    </div>
  );
}
