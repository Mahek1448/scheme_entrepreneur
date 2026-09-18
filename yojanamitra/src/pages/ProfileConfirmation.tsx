import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Edit3, ArrowRight, ChevronLeft, Info,
  Building2, MapPin, Wallet, TrendingUp, Users, Briefcase,
  User, Calendar, GraduationCap, Sparkles, Check,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { t } from '../services/i18n';
import type { ExtractionResult } from '../services/NLPService';
import { formatCurrency, cn } from '../utils';
import type { BusinessStage, Category, UserProfile } from '../types';

// ── Demo fallback (prototype only) ──────────────────────────────────────────
const DEMO_PROFILE_PC: Partial<UserProfile> = {
  name: 'Demo Entrepreneur',
  businessType: 'Vegetable Vendor',
  businessStage: 'idea',
  district: 'Pune',
  state: 'Maharashtra',
  availableCapital: 50000,
  fundingRequirement: 200000,
  monthlyRevenue: 20000,
  category: 'obc',
  age: 32,
  gender: 'female',
  occupation: 'street_vendor',
  isStreetVendor: true,
  aadhaarVerified: true,
  panAvailable: true,
  bankAccount: true,
  casteCertificateAvailable: true,
  educationLevel: '10th_pass',
};

const STAGE_LABELS: Record<BusinessStage, string> = {
  idea: 'New / Idea Stage',
  startup: 'Just Started (<1 yr)',
  growing: 'Growing (1–3 yrs)',
  established: 'Established (3+ yrs)',
};
const STAGE_LABELS_HI: Record<BusinessStage, string> = {
  idea: 'नया / विचार चरण',
  startup: 'अभी शुरू (<1 वर्ष)',
  growing: 'बढ़ रहा है (1–3 वर्ष)',
  established: 'स्थापित (3+ वर्ष)',
};

const CATEGORY_LABELS: Record<Category, string> = {
  general: 'General', sc: 'SC', st: 'ST', obc: 'OBC',
  minority: 'Minority', safai_karamchari: 'Safai Karamchari',
  denotified_nomadic_tribe: 'Denotified / Nomadic Tribe', pwd: 'PwD',
};
const CATEGORY_LABELS_HI: Record<Category, string> = {
  general: 'सामान्य', sc: 'SC', st: 'ST', obc: 'OBC',
  minority: 'अल्पसंख्यक', safai_karamchari: 'सफाई कर्मचारी',
  denotified_nomadic_tribe: 'विमुक्त / घुमंतू', pwd: 'PwD (दिव्यांग)',
};

const EDU_LABELS: Record<string, string> = {
  no_formal: 'No Formal Education', primary: 'Primary (1–5)',
  '8th_pass': '8th Pass', '10th_pass': '10th Pass', '12th_pass': '12th Pass',
  graduate: 'Graduate', postgraduate: 'Post-Graduate',
};
const EDU_LABELS_HI: Record<string, string> = {
  no_formal: 'कोई शिक्षा नहीं', primary: 'प्राथमिक',
  '8th_pass': '8वीं पास', '10th_pass': '10वीं पास', '12th_pass': '12वीं पास',
  graduate: 'स्नातक', postgraduate: 'स्नातकोत्तर',
};

const TOGGLES = [
  { key: 'isStreetVendor',             en: 'Street Vendor',              hi: 'स्ट्रीट वेंडर' },
  { key: 'aadhaarVerified',            en: 'Aadhaar Available',          hi: 'आधार उपलब्ध' },
  { key: 'panAvailable',               en: 'PAN Available',              hi: 'PAN उपलब्ध' },
  { key: 'bankAccount',                en: 'Bank Account',               hi: 'बैंक खाता' },
  { key: 'existingLoan',               en: 'Existing Loan',              hi: 'मौजूदा ऋण' },
  { key: 'hasCIBILDefault',            en: 'CIBIL Default',              hi: 'CIBIL डिफ़ॉल्ट' },
  { key: 'previousPMEGPBeneficiary',   en: 'Previous PMEGP Beneficiary', hi: 'पूर्व PMEGP लाभार्थी' },
  { key: 'casteCertificateAvailable',  en: 'Caste Certificate',          hi: 'जाति प्रमाणपत्र' },
  { key: 'hasStreetVendorCertificate', en: 'Vendor Certificate (CoV)',   hi: 'वेंडर प्रमाणपत्र' },
];

interface FieldDef {
  label: string;
  labelHi: string;
  field: keyof UserProfile;
  type: 'text' | 'number' | 'select';
  options?: { value: string; label: string }[];
  icon: React.ElementType;
  colorClass?: string;
  format?: (v: unknown) => string;
}

export default function ProfileConfirmation() {
  const navigate = useNavigate();
  const { profile, updateProfile, language } = useAppStore();
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('extractionResult');
    if (stored) setExtraction(JSON.parse(stored));
    const isEmpty = !profile.businessType || !profile.district;
    if (isEmpty) {
      Object.entries(DEMO_PROFILE_PC).forEach(([k, v]) => {
        if (!profile[k as keyof UserProfile])
          updateProfile({ [k]: v } as Partial<UserProfile>);
      });
      setIsDemoMode(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isHi = language === 'hi';
  const stageLabels = isHi ? STAGE_LABELS_HI : STAGE_LABELS;
  const catLabels   = isHi ? CATEGORY_LABELS_HI : CATEGORY_LABELS;
  const eduLabels   = isHi ? EDU_LABELS_HI : EDU_LABELS;

  const occupationOptions = [
    { value: 'street_vendor',          label: isHi ? 'स्ट्रीट वेंडर' : 'Street Vendor' },
    { value: 'unemployed',             label: isHi ? 'बेरोजगार' : 'Unemployed / Looking to start' },
    { value: 'traditional_artisan',    label: isHi ? 'पारंपरिक कारीगर' : 'Traditional Artisan' },
    { value: 'self_employed_informal', label: isHi ? 'स्व-नियोजित' : 'Self-employed (Informal)' },
    { value: 'farmer',                 label: isHi ? 'किसान' : 'Farmer' },
    { value: 'salaried',               label: isHi ? 'वेतनभोगी' : 'Salaried' },
    { value: 'any',                    label: isHi ? 'अन्य' : 'Other' },
  ];
  const genderOptions = [
    { value: 'female',           label: isHi ? 'महिला' : 'Female' },
    { value: 'male',             label: isHi ? 'पुरुष' : 'Male' },
    { value: 'other',            label: isHi ? 'अन्य' : 'Other' },
    { value: 'prefer_not_to_say',label: isHi ? 'बताना नहीं चाहते' : 'Prefer not to say' },
  ];
  const stageOptions = (['idea','startup','growing','established'] as BusinessStage[]).map(s => ({
    value: s, label: stageLabels[s],
  }));
  const catOptions = Object.entries(catLabels).map(([v,l]) => ({ value: v, label: l }));
  const eduOptions = Object.keys(EDU_LABELS).map(v => ({ value: v, label: eduLabels[v] ?? v }));

  type SectionDef = {
    title: string;
    icon: React.ElementType;
    headerBg: string;
    badgeBg: string;
    iconColor: string;
    fields: FieldDef[];
  };

  const sections: SectionDef[] = [
    {
      title: isHi ? 'व्यवसाय जानकारी' : 'Business Information',
      icon: Building2,
      headerBg: 'bg-gradient-to-r from-blue-50 to-indigo-50/60 border-blue-100 text-blue-900',
      badgeBg: 'bg-blue-600 text-white',
      iconColor: 'bg-blue-100 text-blue-700 border-blue-200',
      fields: [
        { label: 'Business Type', labelHi: 'व्यवसाय प्रकार', field: 'businessType', type: 'text', icon: Building2 },
        { label: 'Business Stage', labelHi: 'व्यवसाय स्थिति', field: 'businessStage', type: 'select', icon: TrendingUp, options: stageOptions },
      ],
    },
    {
      title: isHi ? 'स्थान विवरण' : 'Location Details',
      icon: MapPin,
      headerBg: 'bg-gradient-to-r from-amber-50 to-orange-50/60 border-amber-100 text-amber-900',
      badgeBg: 'bg-orange-500 text-white',
      iconColor: 'bg-amber-100 text-amber-700 border-amber-200',
      fields: [
        { label: 'District / City', labelHi: 'जिला / शहर', field: 'district', type: 'text', icon: MapPin },
        { label: 'State', labelHi: 'राज्य', field: 'state', type: 'text', icon: MapPin },
      ],
    },
    {
      title: isHi ? 'वित्तीय विवरण' : 'Financial Details',
      icon: Wallet,
      headerBg: 'bg-gradient-to-r from-emerald-50 to-teal-50/60 border-emerald-100 text-emerald-900',
      badgeBg: 'bg-emerald-600 text-white',
      iconColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      fields: [
        { label: 'Available Capital', labelHi: 'उपलब्ध पूंजी', field: 'availableCapital', type: 'number', icon: Wallet, colorClass: 'text-emerald-700 font-bold', format: (v) => formatCurrency(Number(v)) },
        { label: 'Funding Required', labelHi: 'वित्तपोषण आवश्यक', field: 'fundingRequirement', type: 'number', icon: Wallet, colorClass: 'text-blue-700 font-bold', format: (v) => formatCurrency(Number(v)) },
        { label: 'Monthly Income', labelHi: 'मासिक आय', field: 'monthlyRevenue', type: 'number', icon: TrendingUp, colorClass: 'text-indigo-700 font-semibold', format: (v) => formatCurrency(Number(v)) },
      ],
    },
    {
      title: isHi ? 'व्यक्तिगत और सामाजिक' : 'Personal & Demographics',
      icon: Users,
      headerBg: 'bg-gradient-to-r from-purple-50 to-fuchsia-50/60 border-purple-100 text-purple-900',
      badgeBg: 'bg-purple-600 text-white',
      iconColor: 'bg-purple-100 text-purple-700 border-purple-200',
      fields: [
        { label: 'Category', labelHi: 'सामाजिक वर्ग', field: 'category', type: 'select', icon: Users, options: catOptions },
        { label: 'Age', labelHi: 'आयु', field: 'age', type: 'number', icon: Calendar },
        { label: 'Gender', labelHi: 'लिंग', field: 'gender', type: 'select', icon: User, options: genderOptions },
        { label: 'Occupation', labelHi: 'व्यवसाय', field: 'occupation', type: 'select', icon: Briefcase, options: occupationOptions },
        { label: 'Education', labelHi: 'शिक्षा', field: 'educationLevel', type: 'select', icon: GraduationCap, options: eduOptions },
      ],
    },
  ];

  const getDisplayValue = (def: FieldDef): string | null => {
    const val = profile[def.field];
    const empty = val === null || val === undefined || val === '' || val === 0;
    if (empty) {
      const demo = DEMO_PROFILE_PC[def.field];
      if (demo !== undefined && demo !== null && demo !== 0 && demo !== '')
        return fmtVal(def, demo);
      return null;
    }
    return fmtVal(def, val);
  };

  const fmtVal = (def: FieldDef, v: unknown): string => {
    if (def.format) return def.format(v);
    if (def.field === 'businessStage') return stageLabels[v as BusinessStage] ?? String(v);
    if (def.field === 'category')      return catLabels[v as Category] ?? String(v);
    if (def.field === 'educationLevel') return eduLabels[String(v)] ?? String(v);
    if (def.type === 'select') return def.options?.find(o => o.value === String(v))?.label ?? String(v).replace(/_/g,' ');
    return String(v).replace(/_/g,' ');
  };

  const startEdit = (field: keyof UserProfile) => {
    setEditingField(field);
    const v = profile[field];
    setTempValue(v !== null && v !== undefined ? String(v) : '');
  };

  const saveEdit = () => {
    if (!editingField) return;
    const flat = sections.flatMap(s => s.fields);
    const def = flat.find(f => f.field === editingField);
    updateProfile({
      [editingField]: def?.type === 'number' ? Number(tempValue) : tempValue,
    } as Partial<UserProfile>);
    setEditingField(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e1d33] via-[#162d4e] to-[#f0f4f9]">

      {/* ── Top Hero Banner with Deep Colors ──────────────────────── */}
      <div className="pt-6 pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Colorful ambient background glows */}
        <div className="absolute -top-16 left-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">

          {/* Back button */}
          <button
            onClick={() => navigate('/intake')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg mb-6 backdrop-blur-sm transition-all group"
          >
            <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-0.5 text-orange-400" />
            {t('back', language)}
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-3.5 py-1.5 mb-3.5 backdrop-blur-sm shadow-sm">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>{t('profile_extracted', language)}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {t('profile_review_title', language)}
          </h1>
          <p className="text-sm text-blue-100/80 mt-1.5 max-w-xl">
            {t('profile_review_subtitle', language)}
          </p>

          {/* Colorful Quick Highlight Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
              🥦 {profile.businessType || DEMO_PROFILE_PC.businessType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-400/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm">
              📍 {profile.district || DEMO_PROFILE_PC.district}, {profile.state || DEMO_PROFILE_PC.state}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
              💰 ₹{((profile.fundingRequirement || DEMO_PROFILE_PC.fundingRequirement || 0) / 100000).toFixed(1)}L Need
            </span>
          </div>

          {/* Info Banner */}
          <div className="mt-5 flex items-start gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-blue-100 backdrop-blur-md shadow-lg">
            <Info size={16} className="text-orange-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {isDemoMode
                ? (isHi
                    ? 'यह प्रीव्यू के लिए तैयार प्रोफ़ाइल है। योजनाएं खोजने से पहले किसी भी फ़ील्ड को संपादित कर सकते हैं।'
                    : 'Your details have been pre-filled for this demo. You can review and edit any field below.')
                : (isHi
                    ? 'आपकी प्रोफ़ाइल इनपुट से निकाली गई है। आगे बढ़ने से पहले विवरण की समीक्षा करें।'
                    : 'Your profile has been extracted from your input. Please review each detail before continuing.')}
              {extraction && !isDemoMode && (
                <span className="ml-1 text-orange-300 font-semibold">
                  ({extraction.extractionMethod === 'local_mock' ? 'Pattern Analysis' : 'AI Analysis'})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content Body ───────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-4 pb-16 relative z-10">

        {/* ── Profile Sections Card ─────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 overflow-hidden mb-5">
          {sections.map((section, si) => {
            const SectionIcon = section.icon;
            return (
              <div key={si} className={cn(si > 0 && 'border-t border-slate-200/70')}>

                {/* Colorful Section Header */}
                <div className={cn(
                  'flex items-center justify-between px-5 py-3 border-b border-slate-200/60',
                  section.headerBg
                )}>
                  <div className="flex items-center gap-2">
                    <span className={cn('p-1.5 rounded-lg text-white shadow-sm', section.badgeBg)}>
                      <SectionIcon size={14} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {section.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold opacity-70">
                    {section.fields.length} {isHi ? 'फ़ील्ड' : 'fields'}
                  </span>
                </div>

                {/* Field rows */}
                <div className="divide-y divide-slate-100 bg-white">
                  {section.fields.map((def) => {
                    const Icon = def.icon;
                    const display = getDisplayValue(def);
                    const isEditing = editingField === def.field;

                    return (
                      <div
                        key={def.field}
                        className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-slate-50/70 transition-colors"
                      >
                        {/* Colored Icon container */}
                        <div className={cn(
                          'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs border',
                          section.iconColor
                        )}>
                          <Icon size={16} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-1">
                            {isHi ? def.labelHi : def.label}
                          </p>

                          {isEditing ? (
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                              {def.type === 'select' && def.options ? (
                                <select
                                  autoFocus
                                  className="input text-sm py-1.5 max-w-56 border-blue-400 ring-2 ring-blue-100"
                                  value={tempValue}
                                  onChange={e => setTempValue(e.target.value)}
                                >
                                  {def.options.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  autoFocus
                                  className="input text-sm py-1.5 max-w-44 border-blue-400 ring-2 ring-blue-100"
                                  type={def.type}
                                  value={tempValue}
                                  onChange={e => setTempValue(e.target.value)}
                                  onKeyDown={e => e.key === 'Enter' && saveEdit()}
                                />
                              )}
                              <button
                                onClick={saveEdit}
                                className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs font-bold rounded-lg hover:bg-[#142840] shadow-sm transition-colors"
                              >
                                {t('save', language)}
                              </button>
                              <button
                                onClick={() => setEditingField(null)}
                                className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                {t('cancel', language)}
                              </button>
                            </div>
                          ) : (
                            <p className={cn(
                              'text-sm font-semibold leading-snug',
                              def.colorClass ? def.colorClass : 'text-slate-900',
                              !display && 'text-slate-400 font-normal italic text-xs'
                            )}>
                              {display ?? (isHi ? 'दर्ज नहीं' : 'Not entered')}
                            </p>
                          )}
                        </div>

                        {/* Edit button */}
                        {!isEditing && (
                          <button
                            onClick={() => startEdit(def.field)}
                            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/60 px-2.5 py-1 rounded-lg transition-all"
                          >
                            <Edit3 size={11} />
                            <span>{t('edit', language)}</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Eligibility Details with Vibrant Color Accents ──────────── */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 overflow-hidden mb-6">
          <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-emerald-50 to-blue-50/60 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-sm">
                <Check size={14} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {isHi ? 'त्वरित पात्रता स्थिति' : 'Quick Eligibility Status'}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500">
              {isHi ? 'टॉगल करें' : 'Click to toggle'}
            </span>
          </div>

          <div className="p-5 grid sm:grid-cols-2 gap-3 bg-white">
            {TOGGLES.map(({ key, en, hi }) => {
              const checked = !!(profile as unknown as Record<string, unknown>)[key];
              return (
                <label
                  key={key}
                  onClick={() => updateProfile({ [key]: !checked } as Partial<UserProfile>)}
                  className={cn(
                    'flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none',
                    checked
                      ? 'bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border-blue-200 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/60'
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <div className={cn(
                      'w-9 h-5 rounded-full transition-colors duration-200',
                      checked ? 'bg-orange-500 shadow-sm' : 'bg-slate-300'
                    )} />
                    <div className={cn(
                      'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200',
                      checked ? 'translate-x-4' : 'translate-x-0'
                    )} />
                  </div>
                  <span className={cn(
                    'text-xs font-semibold transition-colors',
                    checked ? 'text-slate-900' : 'text-slate-500'
                  )}>
                    {isHi ? hi : en}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* ── Prominent CTA ─────────────────────────────────────────── */}
        <div className="space-y-2.5">
          <button
            onClick={() => navigate('/schemes')}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-black text-base text-white shadow-xl transition-all active:scale-[0.99] hover:brightness-105"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
              boxShadow: '0 10px 25px -3px rgba(234, 88, 12, 0.4), 0 4px 6px -2px rgba(234, 88, 12, 0.2)',
            }}
          >
            <Sparkles size={18} className="animate-pulse text-amber-200" />
            <span>{t('confirm', language)}</span>
            <ArrowRight size={18} />
          </button>
          <p className="text-center text-xs font-medium text-slate-500">
            {isHi
              ? '🔒 आपकी प्रोफ़ाइल का उपयोग करके उपयुक्त सरकारी योजनाएं जांची जाएंगी।'
              : '🔒 Your verified profile will now match against all national & state schemes.'}
          </p>
        </div>

      </div>
    </div>
  );
}
