import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Edit3, AlertCircle, ArrowRight, ChevronLeft, Info } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { t } from '../services/i18n';
import type { ExtractionResult } from '../services/NLPService';
import { formatCurrency, cn } from '../utils';
import type { BusinessStage, Category, UserProfile } from '../types';

const STAGE_LABELS: Record<BusinessStage, string> = {
  idea: '💡 New / Idea stage',
  startup: '🚀 Just started (<1 yr)',
  growing: '📈 Growing (1–3 yrs)',
  established: '🏪 Established (3+ yrs)',
};

const CATEGORY_LABELS: Record<Category, string> = {
  general: 'General',
  sc: 'SC (Scheduled Caste)',
  st: 'ST (Scheduled Tribe)',
  obc: 'OBC (Other Backward Class)',
  minority: 'Minority',
  safai_karamchari: 'Safai Karamchari',
  denotified_nomadic_tribe: 'Denotified / Nomadic Tribe',
  pwd: 'PwD (Differently Abled)',
};

interface EditableField {
  label: string;
  field: keyof UserProfile;
  type: 'text' | 'number' | 'select';
  options?: { value: string; label: string }[];
  required: boolean;
  confidence?: string;
}

export default function ProfileConfirmation() {
  const navigate = useNavigate();
  const { profile, updateProfile, language } = useAppStore();
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
  const [tempValue, setTempValue] = useState<string>('');

  useEffect(() => {
    const stored = sessionStorage.getItem('extractionResult');
    if (stored) setExtraction(JSON.parse(stored));
  }, []);

  const fields: EditableField[] = [
    { label: t('business_type', language), field: 'businessType', type: 'text', required: true, confidence: extraction?.businessType.confidence },
    {
      label: t('business_stage', language), field: 'businessStage', type: 'select', required: true,
      confidence: extraction?.businessStage.confidence,
      options: (['idea', 'startup', 'growing', 'established'] as BusinessStage[]).map((s) => ({ value: s, label: STAGE_LABELS[s] })),
    },
    { label: t('location', language), field: 'district', type: 'text', required: true, confidence: extraction?.location.confidence },
    { label: 'State', field: 'state', type: 'text', required: true, confidence: extraction?.state.confidence },
    {
      label: t('capital', language), field: 'availableCapital', type: 'number', required: true,
      confidence: extraction?.availableCapital.confidence,
    },
    {
      label: t('loan_needed', language), field: 'fundingRequirement', type: 'number', required: true,
      confidence: extraction?.fundingRequirement.confidence,
    },
    {
      label: t('monthly_income', language), field: 'monthlyRevenue', type: 'number', required: false,
      confidence: extraction?.monthlyRevenue.confidence,
    },
    {
      label: t('category', language), field: 'category', type: 'select', required: true,
      confidence: extraction?.category.confidence,
      options: Object.entries(CATEGORY_LABELS).map(([v, l]) => ({ value: v, label: l })),
    },
    {
      label: t('occupation', language), field: 'occupation', type: 'select', required: false,
      confidence: extraction?.occupation.confidence,
      options: [
        { value: 'street_vendor', label: 'Street Vendor' },
        { value: 'unemployed', label: 'Unemployed / Looking to start' },
        { value: 'traditional_artisan', label: 'Traditional Artisan' },
        { value: 'self_employed_informal', label: 'Self-employed (Informal)' },
        { value: 'farmer', label: 'Farmer' },
        { value: 'salaried', label: 'Salaried' },
        { value: 'any', label: 'Other' },
      ],
    },
    {
      label: 'Gender', field: 'gender', type: 'select', required: false,
      confidence: extraction?.gender.confidence,
      options: [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
        { value: 'other', label: 'Other' },
        { value: 'prefer_not_to_say', label: 'Prefer not to say' },
      ],
    },
    { label: 'Age', field: 'age', type: 'number', required: true, confidence: extraction?.age.confidence },
  ];

  const startEdit = (field: keyof UserProfile) => {
    setEditingField(field);
    const val = profile[field];
    setTempValue(val !== null && val !== undefined ? String(val) : '');
  };

  const saveEdit = () => {
    if (!editingField) return;
    const f = fields.find((fld) => fld.field === editingField);
    if (f?.type === 'number') {
      updateProfile({ [editingField]: Number(tempValue) } as Partial<UserProfile>);
    } else {
      updateProfile({ [editingField]: tempValue } as Partial<UserProfile>);
    }
    setEditingField(null);
  };




  const confidenceIcon = (conf?: string) => {
    if (conf === 'high') return <CheckCircle2 size={13} className="text-green-500" />;
    if (conf === 'unknown') return <AlertCircle size={13} className="text-red-400" />;
    return <AlertCircle size={13} className="text-amber-400" />;
  };

  const renderFieldValue = (f: EditableField) => {
    const val = profile[f.field];
    if (val === null || val === undefined || val === '') return <span className="text-red-400 italic text-sm">Not detected</span>;
    if (f.type === 'number') return <span className="font-bold text-gray-900">{formatCurrency(Number(val))}</span>;
    if (f.field === 'businessStage') return <span className="font-bold text-gray-900">{STAGE_LABELS[val as BusinessStage]}</span>;
    if (f.field === 'category') return <span className="font-bold text-gray-900">{CATEGORY_LABELS[val as Category] ?? String(val)}</span>;
    if (f.field === 'gender') return <span className="font-bold text-gray-900 capitalize">{String(val).replace(/_/g, ' ')}</span>;
    if (f.field === 'occupation') return <span className="font-bold text-gray-900 capitalize">{String(val).replace(/_/g, ' ')}</span>;
    return <span className="font-bold text-gray-900">{String(val)}</span>;
  };

  const missingRequired = fields.filter((f) => f.required && (!profile[f.field] || profile[f.field] === ''));

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <button onClick={() => navigate('/intake')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1e3a5f] mb-6 transition-colors">
          <ChevronLeft size={16} /> Back
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium text-green-700 mb-3">
            <CheckCircle2 size={14} />
            Profile Extracted
          </div>
          <h1 className="text-2xl font-extrabold text-[#1e3a5f]">{t('we_understood', language)}</h1>
          <p className="text-gray-500 text-sm mt-1">Review and edit any field before we find your schemes.</p>
        </div>

        {/* Extraction Method Note */}
        {extraction && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4 flex items-start gap-2.5 text-xs text-blue-700">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              Profile extracted using <strong>{extraction.extractionMethod === 'local_mock' ? 'local pattern matching' : 'AI language model'}</strong>{' '}
              from your input in <strong>{extraction.language === 'hi' ? 'Hindi' : extraction.language === 'mr' ? 'Marathi' : extraction.language === 'mixed' ? 'mixed language' : 'English'}</strong>.{' '}
              Confidence shown per field — please verify and edit any inaccuracies.
            </span>
          </div>
        )}

        {/* Missing Required Fields Alert */}
        {missingRequired.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-orange-800">Some fields were not detected</p>
              <p className="text-xs text-orange-700 mt-0.5">
                Please fill: {missingRequired.map((f) => f.label).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* Fields Card */}
        <div className="card shadow-md mb-4">
          <div className="space-y-0.5">
            {fields.map((f, idx) => (
              <div
                key={f.field}
                className={cn(
                  'flex items-center justify-between gap-4 py-3',
                  idx < fields.length - 1 && 'border-b border-gray-50'
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {confidenceIcon(f.confidence)}
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{f.label}{f.required && <span className="text-red-400 ml-0.5">*</span>}</p>
                    {editingField === f.field ? (
                      <div className="flex items-center gap-2 mt-1">
                        {f.type === 'select' && f.options ? (
                          <select
                            className="input py-1 text-sm"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            autoFocus
                          >
                            {f.options.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            className="input py-1 text-sm"
                            type={f.type}
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                          />
                        )}
                        <button onClick={saveEdit} className="text-xs bg-[#1e3a5f] text-white px-3 py-1.5 rounded-lg font-semibold">Save</button>
                        <button onClick={() => setEditingField(null)} className="text-xs text-gray-400 px-2 py-1.5">Cancel</button>
                      </div>
                    ) : (
                      <div className="mt-0.5">{renderFieldValue(f)}</div>
                    )}
                  </div>
                </div>
                {editingField !== f.field && (
                  <button
                    onClick={() => startEdit(f.field)}
                    className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400 hover:text-[#1e3a5f] transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
                  >
                    <Edit3 size={13} /> {t('edit', language)}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Also configure key toggles */}
        <div className="card shadow-sm mb-6">
          <p className="text-sm font-bold text-[#1e3a5f] mb-3">Quick Eligibility Toggles</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { key: 'isStreetVendor', label: 'Street Vendor' },
              { key: 'aadhaarVerified', label: 'Aadhaar Available' },
              { key: 'panAvailable', label: 'PAN Available' },
              { key: 'bankAccount', label: 'Bank Account' },
              { key: 'existingLoan', label: 'Has Existing Loan' },
              { key: 'hasCIBILDefault', label: 'CIBIL Default' },
              { key: 'previousPMEGPBeneficiary', label: 'Previous PMEGP Beneficiary' },
              { key: 'casteCertificateAvailable', label: 'Caste Certificate Available' },
              { key: 'hasStreetVendorCertificate', label: 'Street Vendor Certificate (CoV)' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#1e3a5f] rounded"
                  checked={!!(profile as unknown as Record<string, unknown>)[key]}
                  onChange={(e) => updateProfile({ [key]: e.target.checked } as Partial<UserProfile>)}
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action */}
        <button
          onClick={() => navigate('/schemes')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#1e3a5f] text-white font-bold text-base hover:bg-[#162640] shadow-lg transition-all"
        >
          <CheckCircle2 size={18} />
          {t('confirm', language)}
          <ArrowRight size={16} />
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          You can edit your profile at any time from the dashboard.
        </p>
      </div>
    </div>
  );
}
