import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, FileText, AlertTriangle } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { ProgressBar } from '../components/ui/ProgressBar';
import { t } from '../services/i18n';
import { cn } from '../utils';

interface DocStatus { [docName: string]: boolean }

export default function DocumentChecklist() {
  const navigate = useNavigate();
  const { profile, language } = useAppStore();
  const { recommendations } = useRecommendations(profile);

  const [activeScheme, setActiveScheme] = useState<string>(recommendations[0]?.scheme.id ?? '');
  const [docStatus, setDocStatus] = useState<DocStatus>({
    'Aadhaar Card': profile.aadhaarVerified,
    'Bank Account Passbook / Statement (last 6 months)': profile.bankAccount,
    'Bank Account Passbook': profile.bankAccount,
    'Passport Photo (3 copies)': true,
    'Passport Photo': true,
    'Passport Photo (2 copies)': true,
    'Residence Proof': true,
    'Income Certificate': true,
  });

  const currentRec = recommendations.find((r) => r.scheme.id === activeScheme);
  const docs = currentRec?.requiredDocuments ?? [];

  const available = docs.filter((d) => !!docStatus[d]);
  const missing = docs.filter((d) => !docStatus[d]);
  const completionPct = docs.length > 0 ? Math.round((available.length / docs.length) * 100) : 0;

  const toggleDoc = (name: string) => {
    setDocStatus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Overall doc readiness across all schemes
  const overallDocs = useMemo(() => {
    const allDocs = new Set(recommendations.flatMap((r) => r.requiredDocuments));
    const allAvail = [...allDocs].filter((d) => !!docStatus[d]);
    return { total: allDocs.size, available: allAvail.length };
  }, [recommendations, docStatus]);

  return (
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2">
          <FileText size={22} /> {t('documents_title', language as 'en')}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{t('documents_subtitle', language as 'en')}</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold text-green-600">{overallDocs.available}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('available', language as 'en')}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold text-red-500">{overallDocs.total - overallDocs.available}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('missing', language as 'en')}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-extrabold text-[#1e3a5f]">{overallDocs.total}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('required', language as 'en')}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scheme Selector */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Select Scheme</p>
          {recommendations.map((r) => {
            const schemeDocs = r.requiredDocuments;
            const schemeAvailable = schemeDocs.filter((d) => !!docStatus[d]).length;
            const pct = schemeDocs.length > 0 ? Math.round((schemeAvailable / schemeDocs.length) * 100) : 0;
            return (
              <button
                key={r.scheme.id}
                onClick={() => setActiveScheme(r.scheme.id)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border transition-all',
                  activeScheme === r.scheme.id
                    ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                )}
              >
                <p className={cn('text-sm font-bold', activeScheme === r.scheme.id ? 'text-[#1e3a5f]' : 'text-gray-800')}>
                  {r.scheme.shortName}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div
                      className={cn('h-1.5 rounded-full transition-all', pct === 100 ? 'bg-green-500' : pct >= 60 ? 'bg-blue-500' : 'bg-amber-500')}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-500">{pct}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{schemeAvailable}/{schemeDocs.length} docs ready</p>
              </button>
            );
          })}
        </div>

        {/* Document Checklist */}
        <div className="lg:col-span-2">
          {currentRec && (
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#1e3a5f]">{currentRec.scheme.name}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{currentRec.scheme.implementingAgency}</p>
                </div>
                <div className="text-right">
                  <p className={cn('text-2xl font-extrabold', completionPct === 100 ? 'text-green-600' : 'text-[#1e3a5f]')}>
                    {completionPct}%
                  </p>
                  <p className="text-xs text-gray-400">ready</p>
                </div>
              </div>

              <ProgressBar
                value={completionPct}
                showPercent={false}
                color={completionPct === 100 ? 'bg-green-500' : 'bg-[#1e3a5f]'}
                className="mb-5"
              />

              {/* Available Docs */}
              {available.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
                    ✓ {t('available', language as 'en')} ({available.length})
                  </p>
                  <div className="space-y-2">
                    {available.map((doc) => (
                      <button
                        key={doc}
                        onClick={() => toggleDoc(doc)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors text-left"
                      >
                        <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm text-green-800 font-medium">{doc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Docs */}
              {missing.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                    ○ {t('missing', language as 'en')} ({missing.length})
                  </p>
                  <div className="space-y-2">
                    {missing.map((doc) => (
                      <button
                        key={doc}
                        onClick={() => toggleDoc(doc)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors text-left"
                      >
                        <Circle size={18} className="text-red-400 flex-shrink-0" />
                        <span className="text-sm text-red-700">{doc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
                    <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      You are missing <strong>{missing.length}</strong> document(s) for {currentRec.scheme.shortName}.
                      Click any document above to mark it as available once you have it ready.
                      Document requirements are sourced directly from the official scheme data.
                    </p>
                  </div>
                </div>
              )}

              {completionPct === 100 && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <CheckCircle2 size={24} className="text-green-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-green-800">All documents ready for {currentRec.scheme.shortName}!</p>
                  <p className="text-xs text-green-600 mt-0.5">You can now proceed to apply.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Next Step */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate('/readiness')}
          className="btn-primary flex items-center gap-2"
        >
          Check Application Readiness <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
