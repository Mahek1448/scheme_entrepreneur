import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Phone, CheckCircle2, XCircle, AlertCircle,
  Clock, TrendingUp, DollarSign, BookOpen, FileText, Info, MapPin, PlayCircle,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { EligibilityBadge } from '../components/ui/EligibilityBadge';
import { MatchScoreRing } from '../components/ui/MatchScoreRing';
import { ProgressBar } from '../components/ui/ProgressBar';
import { formatCurrency, cn } from '../utils';
import { t } from '../services/i18n';
import type { EligibilityCriterionCheck } from '../types';
import type { Language } from '../services/i18n';

// ── Language-keyed helper phrases ────────────────────────────────────────────
const LABELS = {
  backToSchemes:    { en: ' Back to Scheme Passport', hi: ' योजना पासपोर्ट पर वापस', mr: ' योजना पासपोर्टवर परत' },
  yourValue:        { en: 'Your value:', hi: 'आपका मूल्य:', mr: 'तुमचे मूल्य:' },
  requiredValue:    { en: 'Required:', hi: 'आवश्यक:', mr: 'आवश्यक:' },
  blocking:         { en: 'BLOCKING', hi: 'बाधक', mr: 'अवरोधक' },
  maxFunding:       { en: 'Max Funding', hi: 'अधिकतम वित्तपोषण', mr: 'जास्तीत जास्त निधी' },
  minFunding:       { en: 'Min Funding', hi: 'न्यूनतम वित्तपोषण', mr: 'किमान निधी' },
  processing:       { en: 'Processing', hi: 'प्रक्रिया', mr: 'प्रक्रिया' },
  freeTraining:     { en: 'Free Training', hi: 'निशुल्क प्रशिक्षण', mr: 'मोफत प्रशिक्षण' },
  keyBenefits:      { en: 'Key Benefits', hi: 'मुख्य लाभ', mr: 'मुख्य फायदे' },
  whyMatches:       { en: 'Why This Scheme Matches Your Profile', hi: 'यह योजना आपके प्रोफ़ाइल से क्यों मेल खाती है', mr: 'ही योजना तुमच्या प्रोफाइलशी का जुळते' },
  noteLabel:        { en: 'Note:', hi: 'नोट:', mr: 'नोंद:' },
  noteText:         { en: 'Match reasons are generated from your profile data and verified scheme criteria — not from an AI language model.', hi: 'मिलान कारण आपके प्रोफ़ाइल डेटा से उत्पन्न होते हैं — AI मॉडल से नहीं।', mr: 'जुळणी कारणे तुमच्या प्रोफाइल डेटावरून तयार होतात — AI मॉडेलकडून नाही.' },
  eligCheck:        { en: 'Eligibility Check (Verified Rules)', hi: 'पात्रता जांच (सत्यापित नियम)', mr: 'पात्रता तपासणी (सत्यापित नियम)' },
  howItWorks:       { en: 'How this works:', hi: 'यह कैसे काम करता है:', mr: 'हे कसे कार्य करते:' },
  eligCheckDesc:    { en: 'Each criterion is evaluated against official government eligibility rules. This is a deterministic check — no AI is involved.', hi: 'प्रत्येक मानदंड सरकारी पात्रता नियमों के अनुसार जांचा जाता है। यह AI-मुक्त जांच है।', mr: 'प्रत्येक निकष सरकारी पात्रता नियमांनुसार तपासला जातो. AI सहभागी नाही.' },
  whatYouNeed:      { en: 'What you need to become eligible:', hi: 'पात्र बनने के लिए क्या चाहिए:', mr: 'पात्र होण्यासाठी तुम्हाला काय हवे:' },
  requiredDocs:     { en: 'Required Documents', hi: 'आवश्यक दस्तावेज़', mr: 'आवश्यक कागदपत्रे' },
  matchBreakdown:   { en: 'Match Score Breakdown', hi: 'मिलान स्कोर विवरण', mr: 'जुळणी गुण तपशील' },
  matchNote:        { en: 'Match score ≠ eligibility. High score = good fit for your context.', hi: 'मिलान स्कोर ≠ पात्रता। उच्च स्कोर = आपके संदर्भ के लिए उपयुक्त।', mr: 'जुळणी गुण ≠ पात्रता. उच्च गुण = तुमच्या संदर्भासाठी योग्य.' },
  howToApply:       { en: 'How to Apply', hi: 'आवेदन कैसे करें', mr: 'अर्ज कसा करावा' },
  applyOnline:      { en: 'Apply Online', hi: 'ऑनलाइन आवेदन करें', mr: 'ऑनलाइन अर्ज करा' },
  findPartners:     { en: 'Find Nearby Partners', hi: 'पास के साझेदार खोजें', mr: 'जवळचे भागीदार शोधा' },
  eligSummary:      { en: 'Your Eligibility Summary', hi: 'आपका पात्रता सारांश', mr: 'तुमचा पात्रता सारांश' },
  criteriaChecked:  { en: 'Criteria Checked', hi: 'मानदंड जांचे गए', mr: 'निकष तपासले' },
  passed:           { en: '✓ Passed', hi: '✓ उत्तीर्ण', mr: '✓ उत्तीर्ण' },
  blockingLabel:    { en: '✗ Blocking', hi: '✗ बाधक', mr: '✗ अवरोधक' },
  missingInfo:      { en: '⚠ Missing Info', hi: '⚠ जानकारी गायब', mr: '⚠ माहिती गहाळ' },
  schemeNotFound:   { en: 'Scheme not found.', hi: 'योजना नहीं मिली।', mr: 'योजना सापडली नाही.' },
  backToSchemesBtn: { en: ' Back to Schemes', hi: ' योजनाओं पर वापस', mr: ' योजनांकडे परत' },
  howToFillForm:    { en: 'How to Fill the Form', hi: 'फॉर्म कैसे भरें', mr: 'फॉर्म कसा भरावा' },
  watchTutorial:    { en: 'Watch Tutorial', hi: 'ट्यूटोरियल देखें', mr: 'ट्यूटोरियल पहा' },
  formTutorialDesc: { en: 'Step-by-step video guide on how to fill and submit the application.', hi: 'आवेदन भरने और जमा करने का चरण-दर-चरण वीडियो गाइड।', mr: 'अर्ज भरण्यासाठी आणि सबमिट करण्यासाठी पायरी-पायरी व्हिडिओ मार्गदर्शक.' },
  breakdownLabels: {
    businessCompatibility: { en: 'Business Fit',       hi: 'व्यवसाय फिट',    mr: 'व्यवसाय जुळणी' },
    fundingCompatibility:   { en: 'Funding Match',      hi: 'फंडिंग मिलान',   mr: 'निधी जुळणी' },
    beneficiaryCompatibility:{ en: 'Beneficiary Match', hi: 'लाभार्थी मिलान', mr: 'लाभार्थी जुळणी' },
    stageCompatibility:     { en: 'Stage Match',        hi: 'चरण मिलान',      mr: 'टप्पा जुळणी' },
    locationCompatibility:  { en: 'Location Match',     hi: 'स्थान मिलान',    mr: 'स्थान जुळणी' },
    purposeAlignment:       { en: 'Purpose Alignment',  hi: 'उद्देश्य संरेखन', mr: 'उद्देश संरेखन' },
  } as Record<string, Record<Language, string>>,
};

function L(key: keyof typeof LABELS, lang: Language): string {
  const val = LABELS[key];
  if (typeof val === 'object' && 'en' in val) {
    return (val as Record<Language, string>)[lang] ?? (val as Record<Language, string>).en;
  }
  return String(val);
}

function CriterionRow({ check, language }: { check: EligibilityCriterionCheck; language: Language }) {
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
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
              {L('blocking', language)}
            </span>
          )}
        </div>
        <div className="flex gap-3 mt-1 flex-wrap">
          <span className="text-xs text-gray-500">{L('yourValue', language)} <strong>{check.userValue}</strong></span>
          <span className="text-xs text-gray-400">{L('requiredValue', language)} <strong>{check.requiredValue}</strong></span>
        </div>
        {check.note && <p className="text-xs text-gray-600 mt-1 italic">{check.note}</p>}
      </div>
    </div>
  );
}

export default function SchemeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile, language } = useAppStore();
  const { recommendations } = useRecommendations(profile);
  const result = recommendations.find((r) => r.scheme.id === id);

  if (!result) {
    return (
      <div className="page-container py-16 text-center">
        <p className="text-gray-400 mb-4">{L('schemeNotFound', language)}</p>
        <button onClick={() => navigate('/schemes')} className="btn-primary">
          {L('backToSchemesBtn', language)}
        </button>
      </div>
    );
  }

  const { scheme, matchScore, matchScoreBreakdown, eligibilityResult, whyItMatches, missingRequirements } = result;
  const fd = scheme.fundingDetails;

  const maxFunding = fd.maxAmount ?? fd.maxAmountService ?? fd.tranche3 ?? 0;
  const minFunding = fd.minAmount ?? fd.tranche1 ?? 0;

  const breakdownItems = [
    { key: 'businessCompatibility',    score: matchScoreBreakdown.businessCompatibility },
    { key: 'fundingCompatibility',     score: matchScoreBreakdown.fundingCompatibility },
    { key: 'beneficiaryCompatibility', score: matchScoreBreakdown.beneficiaryCompatibility },
    { key: 'stageCompatibility',       score: matchScoreBreakdown.stageCompatibility },
    { key: 'locationCompatibility',    score: matchScoreBreakdown.locationCompatibility },
    { key: 'purposeAlignment',         score: matchScoreBreakdown.purposeAlignment },
  ];

  return (
    <div className="page-container py-8">
      {/* Back */}
      <button
        onClick={() => navigate('/schemes')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1e3a5f] mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> {L('backToSchemes', language)}
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ─── Main Column ──────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header Card */}
          <div className="card">
            <div className="flex items-start gap-5">
              <MatchScoreRing score={matchScore} size="md" className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {scheme.category.replace(/_/g, ' ')} · {scheme.ministry}
                    </span>
                    <h1 className="text-xl font-extrabold text-[#1e3a5f] mt-0.5 leading-tight">{scheme.name}</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{scheme.implementingAgency}</p>
                  </div>
                  <EligibilityBadge status={eligibilityResult.status} size="md" className="flex-shrink-0" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{scheme.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {scheme.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: DollarSign, label: L('maxFunding', language), value: maxFunding ? formatCurrency(maxFunding) : L('freeTraining', language), color: 'text-[#1e3a5f]' },
              { icon: DollarSign, label: L('minFunding', language), value: minFunding ? formatCurrency(minFunding) : '—', color: 'text-gray-700' },
              { icon: Clock,      label: L('processing', language), value: scheme.applicationRoute.processingTime, color: 'text-gray-700' },
              { icon: TrendingUp, label: t('success_rate', language), value: `${scheme.successRate}%`, color: 'text-green-600' },
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
              <h2 className="font-bold text-[#1e3a5f]">{L('keyBenefits', language)}</h2>
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
                <h2 className="font-bold text-[#1e3a5f]">{L('whyMatches', language)}</h2>
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
                <strong>{L('noteLabel', language)}</strong> {L('noteText', language)}
              </div>
            </div>
          )}

          {/* Eligibility Check Details */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#1e3a5f] flex items-center gap-2">
                <FileText size={18} />
                {L('eligCheck', language)}
              </h2>
              <EligibilityBadge status={eligibilityResult.status} size="sm" />
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-600">
              <strong>{L('howItWorks', language)}</strong> {L('eligCheckDesc', language)}
            </div>

            <p className="text-sm text-gray-600 mb-3 italic">{eligibilityResult.summary}</p>

            <div className="space-y-2">
              {eligibilityResult.checks.map((check) => (
                <CriterionRow key={check.criterion} check={check} language={language} />
              ))}
            </div>

            {/* Missing Requirements */}
            {missingRequirements.length > 0 && (
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-bold text-amber-800 mb-2">{L('whatYouNeed', language)}</p>
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
              <FileText size={18} /> {L('requiredDocs', language)}
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

        {/* ─── Sidebar ──────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Match Score Breakdown */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-4">{L('matchBreakdown', language)}</h2>
            <div className="flex justify-center mb-4">
              <MatchScoreRing score={matchScore} size="lg" />
            </div>
            <div className="space-y-2.5">
              {breakdownItems.map(({ key, score }) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 w-28 flex-shrink-0 text-right">
                    {(LABELS.breakdownLabels as Record<string, Record<Language, string>>)[key]?.[language] ?? key}
                  </span>
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
              {L('matchNote', language)}
            </div>
          </div>

          {/* Application Routes */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-3">{L('howToApply', language)}</h2>
            <div className="space-y-2">
              {scheme.applicationRoute.online && (
                <a
                  href={scheme.applicationRoute.online}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-[#1e3a5f] text-white text-sm font-semibold rounded-lg hover:bg-[#162640] transition-colors"
                >
                  <ExternalLink size={15} /> {L('applyOnline', language)}
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
                {L('findPartners', language)}
              </button>

              {/* YouTube Tutorial Card — shown only if URL exists */}
              {scheme.formTutorialUrl && (
                <div className="mt-2 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <PlayCircle size={18} className="text-red-600 flex-shrink-0" />
                    <span className="font-bold text-red-700 text-sm">
                      {L('howToFillForm', language)}
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mb-3 leading-relaxed">
                    {L('formTutorialDesc', language)}
                  </p>
                  <a
                    href={scheme.formTutorialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors justify-center"
                  >
                    <PlayCircle size={15} />
                    {L('watchTutorial', language)}
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Eligibility Summary Panel */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] mb-3">{L('eligSummary', language)}</h2>
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{L('criteriaChecked', language)}</span>
                <span className="font-bold">{eligibilityResult.checks.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-green-600">{L('passed', language)}</span>
                <span className="font-bold text-green-700">{eligibilityResult.passedChecks.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-red-500">{L('blockingLabel', language)}</span>
                <span className="font-bold text-red-600">{eligibilityResult.blockingConditions.length}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-amber-600">{L('missingInfo', language)}</span>
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
