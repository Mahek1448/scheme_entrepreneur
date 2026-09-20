/**
 * Dashboard.tsx — Main dashboard with TWO states:
 * 
 * STATE A (profile incomplete): Shows the FULL dashboard layout with placeholder dashes.
 *   → Same visual structure as State B, no data yet.
 *
 * STATE B (profile complete): Fully populated with REAL dynamic data.
 *   → All values calculated from actual user profile + recommendation engine.
 *   → NO hardcoded Sunita / Chai Stall / ₹40K / 95/100 values.
 *
 * Data sources:
 * - Profile: useAppStore().profile (from sessionStorage, from NLP extraction)
 * - Schemes: useRecommendations() → real ML scores
 * - Readiness: useReadinessScore() → deterministic calculation
 * - Documents: derived from scheme required docs
 * - Capital: profile.availableCapital (user-provided)
 */

import { useNavigate } from 'react-router-dom';
import {
  FileText, DollarSign, Folder, ArrowRight, AlertCircle,
  Activity, Mic, Sparkles, TrendingUp, CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../hooks/useAppStore';
import { useRecommendations } from '../hooks/useRecommendations';
import { useReadinessScore } from '../hooks/useReadinessScore';
import { EligibilityBadge } from '../components/ui/EligibilityBadge';
import { MatchScoreRing } from '../components/ui/MatchScoreRing';
import { ProgressBar } from '../components/ui/ProgressBar';
import { formatCurrency } from '../utils';
import { t } from '../services/i18n';
import { cn } from '../utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, language, currentUser, profileComplete } = useAppStore();
  const { recommendations } = useRecommendations(profile);
  const readiness = useReadinessScore(profile, []);

  // ─── Derived stats (all computed, never hardcoded) ──────────────────────────
  const topSchemes = recommendations.slice(0, 3);
  const eligibleCount = recommendations.filter(
    (r) => r.eligibilityResult.status === 'ELIGIBLE'
  ).length;

  // Document readiness — based on what's needed for all recommended schemes
  const uniqueDocs = [...new Set(recommendations.flatMap((r) => r.requiredDocuments))];
  const docTotal = uniqueDocs.length;
  // Approximate available docs from profile flags (aadhaar, bank, pan)
  const profileDocCount = [profile.aadhaarVerified, profile.bankAccount, profile.panAvailable].filter(Boolean).length;
  const docReady = docTotal > 0 ? Math.min(profileDocCount, docTotal) : 0;
  const docPercent = docTotal > 0 ? Math.round((docReady / docTotal) * 100) : 0;

  // Display name
  const displayName = currentUser?.name ?? profile.name ?? 'User';

  // Hero sub-line from actual profile
  const heroParts: string[] = [];
  if (profile.businessType) heroParts.push(profile.businessType);
  if (profile.district && profile.state) heroParts.push(`${profile.district}, ${profile.state}`);
  if (profile.availableCapital > 0)
    heroParts.push(`${formatCurrency(profile.availableCapital)} ${t('capital_label', language)}`);
  const heroSubline = heroParts.join(' · ');

  // Readiness label in selected language
  const readinessLabelKey =
    readiness.label === 'Excellent' ? 'readiness_excellent' :
    readiness.label === 'Good' ? 'readiness_good' :
    readiness.label === 'Fair' ? 'readiness_fair' :
    'readiness_needs_work';

  // ─── STAT CARD helper ────────────────────────────────────────────────────────
  function StatBox({
    icon: Icon,
    iconBg,
    title,
    value,
    valueSub,
    empty,
    onClick,
  }: {
    icon: typeof FileText;
    iconBg: string;
    title: string;
    value: string;
    valueSub: string;
    empty?: boolean;
    onClick?: () => void;
  }) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 hover:shadow-md transition-shadow',
          onClick ? 'cursor-pointer' : ''
        )}
      >
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon size={20} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500 font-medium mb-0.5">{title}</p>
          <p className={cn('text-xl font-extrabold leading-tight', empty ? 'text-gray-300' : 'text-[#1e3a5f]')}>
            {value}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{valueSub}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container py-8">

      {/* ══════════════════════════════════════════════════════════════
          HERO CARD — Profile card at the top (both states)
          ══════════════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#16345a] rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute right-12 bottom-0 w-32 h-32 bg-orange-400/10 rounded-full translate-y-1/2 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm font-medium">{t('welcome_back', language)},</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5 tracking-tight">{displayName}</h1>
            {profileComplete ? (
              <p className="text-white/70 text-sm mt-1">{heroSubline || t('complete_profile_desc', language)}</p>
            ) : (
              <p className="text-white/65 text-sm mt-1 max-w-xs">{t('complete_profile_desc', language)}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0">
            <button
              onClick={() => navigate('/intake')}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <Mic size={15} />
              {t('talk_to_yojanamitra', language)}
            </button>
            <button
              onClick={() => navigate('/schemes')}
              className="inline-flex items-center gap-2 bg-white/12 hover:bg-white/20 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              {t('view_schemes', language)} <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Profile completeness nudge (empty state only) */}
        {!profileComplete && (
          <div className="relative mt-4 bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
            <Sparkles size={16} className="text-orange-300 flex-shrink-0" />
            <p className="text-sm text-white/80">
              {t('no_profile_desc', language)}
            </p>
            <button
              onClick={() => navigate('/intake')}
              className="ml-auto flex items-center gap-1 text-xs text-orange-300 font-bold whitespace-nowrap hover:text-orange-200"
            >
              {t('get_started', language)} <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          STAT CARDS — 4 cards (both states, dashes when empty)
          ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* 1 — Schemes Matched */}
        <StatBox
          icon={FileText}
          iconBg="bg-[#1e3a5f]"
          title={t('schemes_matched', language)}
          value={profileComplete ? recommendations.length.toString() : '—'}
          valueSub={
            profileComplete
              ? `${eligibleCount} ${t('eligible_now', language)}`
              : t('complete_your_profile', language)
          }
          empty={!profileComplete}
          onClick={() => profileComplete ? navigate('/schemes') : navigate('/intake')}
        />

        {/* 2 — Available Capital */}
        <StatBox
          icon={DollarSign}
          iconBg="bg-green-600"
          title={t('available_capital', language)}
          value={profile.availableCapital > 0 ? formatCurrency(profile.availableCapital) : '—'}
          valueSub={profile.availableCapital > 0 ? t('self_funding', language) : t('not_provided', language)}
          empty={profile.availableCapital === 0}
          onClick={() => navigate('/planner')}
        />

        {/* 3 — Documents Ready */}
        <StatBox
          icon={Folder}
          iconBg="bg-amber-500"
          title={t('documents_ready', language)}
          value={docTotal > 0 ? `${docReady}/${docTotal}` : '—'}
          valueSub={docTotal > 0 ? t('upload_missing', language) : t('complete_your_profile', language)}
          empty={docTotal === 0}
          onClick={() => navigate('/documents')}
        />

        {/* 4 — Readiness Score */}
        <StatBox
          icon={Activity}
          iconBg="bg-indigo-600"
          title={t('readiness_score', language)}
          value={profileComplete ? `${readiness.score}/100` : '—'}
          valueSub={profileComplete ? t(readinessLabelKey, language) : t('not_calculated', language)}
          empty={!profileComplete}
          onClick={() => navigate('/readiness')}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT GRID — schemes list + right sidebar
          ══════════════════════════════════════════════════════════════ */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* ── Top Scheme Matches ─────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#1e3a5f] text-base">{t('top_scheme_matches', language)}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t('engine_ranked_note', language)}</p>
            </div>
            {topSchemes.length > 0 && (
              <button
                onClick={() => navigate('/schemes')}
                className="text-xs text-[#1e3a5f] font-semibold hover:underline flex items-center gap-1"
              >
                {t('view_all', language)} <ArrowRight size={13} />
              </button>
            )}
          </div>

          {!profileComplete ? (
            /* Empty state — profile not yet complete */
            <div className="border-2 border-dashed border-gray-100 rounded-2xl py-12 text-center">
              <Sparkles size={32} className="mx-auto mb-3 text-gray-200" />
              <p className="text-sm font-semibold text-gray-400">{t('no_profile_yet', language)}</p>
              <p className="text-xs text-gray-300 mt-1 max-w-xs mx-auto">{t('complete_profile_for_schemes', language)}</p>
              <button
                onClick={() => navigate('/intake')}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-colors"
              >
                <Mic size={14} /> {t('talk_to_yojanamitra', language)}
              </button>
            </div>
          ) : topSchemes.length === 0 ? (
            <div className="border-2 border-dashed border-gray-100 rounded-2xl py-12 text-center">
              <TrendingUp size={28} className="mx-auto mb-3 text-gray-200" />
              <p className="text-sm text-gray-400">{t('no_schemes_found', language)}</p>
              <p className="text-xs text-gray-300 mt-1">{t('no_match_desc', language)}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topSchemes.map((result, idx) => {
                const maxFunding =
                  result.scheme.fundingDetails.maxAmount ??
                  result.scheme.fundingDetails.maxAmountService ??
                  result.scheme.fundingDetails.tranche3 ?? 0;
                return (
                  <div
                    key={result.scheme.id}
                    onClick={() => navigate(`/schemes/${result.scheme.id}`)}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all group hover:shadow-md',
                      idx === 0
                        ? 'border-green-200 bg-green-50/40 hover:border-green-300'
                        : 'border-gray-100 hover:border-[#1e3a5f]/30 hover:bg-gray-50'
                    )}
                  >
                    {/* Score ring */}
                    <MatchScoreRing score={result.matchScore} size="sm" showLabel={false} />

                    {/* Scheme info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {idx === 0 && (
                          <span className="text-xs bg-green-600 text-white font-bold px-2 py-0.5 rounded-full">
                           {t('top_pick', language)}
                          </span>
                        )}
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-[#1e3a5f] transition-colors">
                          {result.scheme.shortName}
                        </p>
                        <EligibilityBadge status={result.eligibilityResult.status} size="sm" />
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {result.scheme.ministry}
                        {maxFunding > 0 && ` {t('max_label', language)} {formatCurrency(maxFunding)}`}
                      </p>
                      {result.whyItMatches[0] && (
                        <p className="text-xs text-gray-400 mt-1 truncate">{result.whyItMatches[0]}</p>
                      )}
                    </div>

                    {/* Score % */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">{t('match_score', language)}</p>
                      <p className="text-xl font-extrabold text-[#1e3a5f]">{result.matchScore}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ─────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Application Readiness widget */}
          <div
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/readiness')}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1e3a5f] text-sm">{t('application_readiness', language)}</h2>
              <ArrowRight size={14} className="text-gray-400" />
            </div>

            {!profileComplete ? (
              <div className="text-center py-4">
                <p className="text-3xl font-extrabold text-gray-200">—</p>
                <p className="text-xs text-gray-400 mt-1">{t('not_calculated', language)}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-4xl font-extrabold" style={{ color: readiness.color }}>
                    {readiness.score}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: readiness.color }}>
                      {t(readinessLabelKey, language)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {readiness.passedItems.length}/{readiness.items.length} {t('checks_done', language)}
                    </p>
                  </div>
                </div>
                <ProgressBar
                  value={readiness.score}
                  showPercent={false}
                  color={readiness.score >= 85 ? 'bg-green-500' : readiness.score >= 65 ? 'bg-blue-500' : 'bg-amber-500'}
                />
                {readiness.failedItems.length > 0 && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 rounded-xl px-2.5 py-2">
                    <AlertCircle size={13} />
                    {readiness.failedItems.length} {t('items_still_needed', language)}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Documents card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#1e3a5f] text-sm">{t('documents_title', language)}</h2>
              <button
                onClick={() => navigate('/documents')}
                className="text-xs text-[#1e3a5f] hover:underline font-semibold"
              >
                {t('view_all', language)}
              </button>
            </div>

            {docTotal === 0 ? (
              <div className="text-center py-4">
                <p className="text-3xl font-extrabold text-gray-200">—</p>
                <p className="text-xs text-gray-400 mt-1">{t('no_docs_required', language)}</p>
              </div>
            ) : (
              <>
                <ProgressBar value={docPercent} showPercent color="bg-green-600" className="mb-2" />
                <p className="text-sm font-bold text-gray-700">{docPercent}%</p>
                <p className="text-xs text-gray-400">
                  {docReady} of {docTotal} ready
                </p>
              </>
            )}
          </div>

          {/* Eligibility Snapshot */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-[#1e3a5f] text-sm mb-3">{t('eligibility_snapshot', language)}</h2>

            {recommendations.length === 0 ? (
              <p className="text-xs text-gray-400">
                {profileComplete ? t('no_schemes_found', language) : t('complete_your_profile', language)}
              </p>
            ) : (
              <div className="space-y-2">
                {recommendations.map((r) => (
                  <div
                    key={r.scheme.id}
                    onClick={() => navigate(`/schemes/${r.scheme.id}`)}
                    className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {r.eligibilityResult.status === 'ELIGIBLE' ? (
                        <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle size={13} className="text-amber-400 flex-shrink-0" />
                      )}
                      <p className="text-xs font-medium text-gray-700 truncate">{r.scheme.shortName}</p>
                    </div>
                    <EligibilityBadge status={r.eligibilityResult.status} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-[#1e3a5f] text-sm mb-3">{t('quick_actions', language)}</h2>
            <div className="space-y-2">
              {[
                { label: t('nav_planner', language), route: '/planner', icon: '💰' },
                { label: t('nav_partners', language), route: '/partners', icon: '🤝' },
                { label: t('talk_to_yojanamitra', language), route: '/intake', icon: '🎤' },
              ].map(({ label, route, icon }) => (
                <button
                  key={route}
                  onClick={() => navigate(route)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[#1e3a5f]/30 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all text-left"
                >
                  <span className="text-base">{icon}</span>
                  {label}
                  <ArrowRight size={13} className="ml-auto text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
