import { useNavigate } from 'react-router-dom';
import {
  FileText, DollarSign, Folder, ArrowRight, AlertCircle, Activity,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { useReadinessScore } from '../hooks/useReadinessScore';
import { SAMPLE_DOCUMENTS } from '../data/mockData';
import { StatCard } from '../components/ui/StatCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { EligibilityBadge } from '../components/ui/EligibilityBadge';
import { MatchScoreRing } from '../components/ui/MatchScoreRing';
import { formatCurrency } from '../utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useAppStore();
  const { recommendations } = useRecommendations(profile);
  const readiness = useReadinessScore(profile, SAMPLE_DOCUMENTS);

  const topSchemes = recommendations.slice(0, 3);
  const eligibleCount = recommendations.filter((r) => r.eligibilityResult.status === 'ELIGIBLE').length;
  const docReady = SAMPLE_DOCUMENTS.filter((d) => d.status === 'available').length;
  const docTotal = SAMPLE_DOCUMENTS.length;
  const docPercent = Math.round((docReady / docTotal) * 100);

  return (
    <div className="page-container py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#16345a] rounded-2xl p-6 text-white mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white/60 text-sm font-medium">Welcome back,</p>
          <h1 className="text-2xl font-extrabold mt-0.5">{profile.name}</h1>
          <p className="text-white/70 text-sm mt-1">
            {profile.businessType} · {profile.district}, {profile.state} · {formatCurrency(profile.availableCapital)} capital
          </p>
        </div>
        <button
          onClick={() => navigate('/schemes')}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm flex-shrink-0"
        >
          View My Schemes <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Schemes Matched"
          value={recommendations.length.toString()}
          subtitle={`${eligibleCount} eligible now`}
          icon={FileText}
          iconColor="bg-[#1e3a5f]"
        />
        <StatCard
          title="Available Capital"
          value={formatCurrency(profile.availableCapital)}
          subtitle="Self funding"
          icon={DollarSign}
          iconColor="bg-gov-green-600"
        />
        <StatCard
          title="Documents Ready"
          value={`${docReady}/${docTotal}`}
          subtitle="Upload missing docs"
          icon={Folder}
          iconColor="bg-saffron-500"
        />
        <StatCard
          title="Readiness Score"
          value={`${readiness.score}/100`}
          subtitle={readiness.label}
          icon={Activity}
          iconColor="bg-indigo-600"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Scheme Matches */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#1e3a5f] text-base">Top Scheme Matches</h2>
              <p className="text-xs text-gray-400 mt-0.5">Engine-ranked · Match score ≠ eligibility</p>
            </div>
            <button onClick={() => navigate('/schemes')} className="text-xs text-[#1e3a5f] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={13} />
            </button>
          </div>
          <div className="space-y-3">
            {topSchemes.map((result) => (
              <div
                key={result.scheme.id}
                onClick={() => navigate(`/schemes/${result.scheme.id}`)}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#1e3a5f]/30 hover:bg-gray-50 cursor-pointer transition-all group"
              >
                <MatchScoreRing score={result.matchScore} size="sm" showLabel={false} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-[#1e3a5f] transition-colors">
                      {result.scheme.shortName}
                    </p>
                    <EligibilityBadge status={result.eligibilityResult.status} size="sm" />
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {result.scheme.ministry} · Max {formatCurrency(
                      result.scheme.fundingDetails.maxAmount ??
                      result.scheme.fundingDetails.maxAmountService ??
                      result.scheme.fundingDetails.tranche3 ?? 0
                    )}
                  </p>
                  {result.whyItMatches[0] && (
                    <p className="text-xs text-gray-400 mt-1 truncate">{result.whyItMatches[0]}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">Match</p>
                  <p className="text-lg font-extrabold text-[#1e3a5f]">{result.matchScore}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Readiness Score Widget */}
          <div className="card cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/readiness')}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1e3a5f] text-sm">Application Readiness</h2>
              <ArrowRight size={14} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl font-extrabold" style={{ color: readiness.color }}>{readiness.score}</div>
              <div>
                <p className="font-bold text-sm" style={{ color: readiness.color }}>{readiness.label}</p>
                <p className="text-xs text-gray-400">{readiness.passedItems.length}/{readiness.items.length} checks done</p>
              </div>
            </div>
            <ProgressBar
              value={readiness.score}
              showPercent={false}
              color={readiness.score >= 85 ? 'bg-green-500' : readiness.score >= 65 ? 'bg-blue-500' : 'bg-amber-500'}
            />
            {readiness.failedItems.length > 0 && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-lg px-2.5 py-2">
                <AlertCircle size={13} />
                {readiness.failedItems.length} item(s) still needed
              </div>
            )}
          </div>

          {/* Document Readiness */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1e3a5f] text-sm">Documents</h2>
              <button onClick={() => navigate('/documents')} className="text-xs text-[#1e3a5f] hover:underline">View All</button>
            </div>
            <ProgressBar value={docPercent} showPercent color="bg-gov-green-600" className="mb-2" />
            <p className="text-xs text-gray-500">{docReady} of {docTotal} uploaded</p>
          </div>

          {/* Eligibility Snapshot */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] text-sm mb-3">Eligibility Snapshot</h2>
            <div className="space-y-2">
              {recommendations.map((r) => (
                <div
                  key={r.scheme.id}
                  onClick={() => navigate(`/schemes/${r.scheme.id}`)}
                  className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
                >
                  <p className="text-xs font-medium text-gray-700 truncate">{r.scheme.shortName}</p>
                  <EligibilityBadge status={r.eligibilityResult.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="font-bold text-[#1e3a5f] text-sm mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Cost Planner', route: '/planner', icon: '💰' },
                { label: 'Find Partners', route: '/partners', icon: '🤝' },
                { label: 'Edit Profile', route: '/intake', icon: '✏️' },
              ].map(({ label, route, icon }) => (
                <button
                  key={route}
                  onClick={() => navigate(route)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:border-[#1e3a5f]/30 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all text-left"
                >
                  <span>{icon}</span> {label}
                  <ArrowRight size={13} className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
