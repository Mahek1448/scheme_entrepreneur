import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, Activity } from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useReadinessScore } from '../hooks/useReadinessScore';
import { SAMPLE_DOCUMENTS } from '../data/mockData';
import { t } from '../services/i18n';
import { cn } from '../utils';

export default function ReadinessScore() {
  const navigate = useNavigate();
  const { profile, language } = useAppStore();
  const score = useReadinessScore(profile, SAMPLE_DOCUMENTS);

  const filledBlocks = Math.round(score.score / 5); // 20 blocks of 5% each

  return (
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2">
          <Activity size={22} /> {t('readiness_title', language as 'en')}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{t('readiness_subtitle', language as 'en')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Score Card */}
        <div className="card text-center py-10 shadow-md">
          {/* Score Ring */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg width={180} height={180} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={90} cy={90} r={72} fill="none" stroke="#e5e7eb" strokeWidth={14} />
              <circle
                cx={90} cy={90} r={72} fill="none"
                stroke={score.color}
                strokeWidth={14}
                strokeLinecap="round"
                strokeDasharray={`${(score.score / 100) * 2 * Math.PI * 72} ${2 * Math.PI * 72}`}
                style={{ transition: 'stroke-dasharray 0.8s ease' }}
              />
            </svg>
            <div className="absolute text-center" style={{ transform: 'rotate(0deg)' }}>
              <p className="text-5xl font-extrabold" style={{ color: score.color }}>{score.score}</p>
              <p className="text-sm text-gray-400 font-medium">/ 100</p>
            </div>
          </div>

          <p className="text-xl font-bold mb-1" style={{ color: score.color }}>{score.label}</p>
          <p className="text-xs text-gray-400 mb-6">
            {score.passedItems.length} of {score.items.length} readiness checks passed
          </p>

          {/* Block Progress */}
          <div className="flex gap-0.5 justify-center mb-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-4 w-5 rounded-sm transition-all',
                  i < filledBlocks ? 'opacity-100' : 'bg-gray-100 opacity-100'
                )}
                style={{ backgroundColor: i < filledBlocks ? score.color : undefined }}
              />
            ))}
          </div>

          <button
            onClick={() => navigate('/partners')}
            className="btn-primary mx-auto"
          >
            Proceed to Partner Routing <ArrowRight size={16} />
          </button>
        </div>

        {/* Readiness Items */}
        <div className="card">
          <h2 className="font-bold text-[#1e3a5f] mb-4">Readiness Breakdown</h2>

          {/* Passed */}
          <div className="mb-4">
            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
              ✓ Completed ({score.passedItems.length})
            </p>
            <div className="space-y-1.5">
              {score.passedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-green-50 border border-green-100">
                  <CheckCircle2 size={15} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800">{item.label}</span>
                  <span className="ml-auto text-xs text-green-600 font-bold">+{item.weight} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Failed */}
          {score.failedItems.length > 0 && (
            <div>
              <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                ✗ Still needed ({score.failedItems.length})
              </p>
              <div className="space-y-1.5">
                {score.failedItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.route && navigate(item.route)}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 transition-colors text-left"
                  >
                    <XCircle size={15} className="text-red-400 flex-shrink-0" />
                    <span className="text-sm text-red-700">{item.label}</span>
                    <span className="ml-auto text-xs text-red-500 font-bold">+{item.weight} pts</span>
                    {item.route && (
                      <ArrowRight size={12} className="text-red-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Click any item above to go to the relevant section and complete it.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* What readiness means */}
      <div className="mt-6 grid sm:grid-cols-4 gap-3 text-center">
        {[
          { range: '85–100', label: 'Excellent', desc: 'Ready to apply', color: 'bg-green-50 border-green-200 text-green-700' },
          { range: '65–84', label: 'Good', desc: 'Minor gaps', color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { range: '45–64', label: 'Fair', desc: 'Several gaps', color: 'bg-amber-50 border-amber-200 text-amber-700' },
          { range: '0–44', label: 'Needs Work', desc: 'Significant prep needed', color: 'bg-red-50 border-red-200 text-red-700' },
        ].map((band) => (
          <div
            key={band.label}
            className={cn(
              'p-3 rounded-xl border text-sm font-semibold',
              band.color,
              score.label === band.label ? 'ring-2 ring-offset-1 ring-current' : ''
            )}
          >
            <p className="font-bold">{band.label}</p>
            <p className="text-xs opacity-75">{band.range}</p>
            <p className="text-xs mt-1">{band.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
