import { Shield, Users, FileText, TrendingUp, DollarSign, Activity, ArrowUp } from 'lucide-react';
import { ADMIN_STATS } from '../data/mockData';
import { SCHEMES } from '../hooks/useRecommendations';
import { StatCard } from '../components/ui/StatCard';
import { formatCurrency } from '../utils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AdminDashboard() {
  const stats = ADMIN_STATS;
  const maxSignup = Math.max(...stats.weeklySignups);

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f1c30] to-[#1e3a5f] rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Shield size={22} className="text-orange-400" />
          <h1 className="text-xl font-extrabold">Admin Dashboard</h1>
        </div>
        <p className="text-white/60 text-sm">YojanaMitra · SIH 2026 · Platform Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={Users} iconColor="bg-[#1e3a5f]" trend={{ value: '+12% this month', up: true }} />
        <StatCard title="Active Applications" value={stats.activeApplications.toLocaleString()} icon={Activity} iconColor="bg-blue-600" />
        <StatCard title="Approved" value={stats.approvedApplications.toLocaleString()} icon={FileText} iconColor="bg-gov-green-600" trend={{ value: '89% approval rate', up: true }} />
        <StatCard title="Funding Disbursed" value={formatCurrency(stats.totalFundingDisbursed)} icon={DollarSign} iconColor="bg-saffron-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Signups Bar Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1e3a5f]">Weekly Signups</h2>
            <div className="flex items-center gap-1 text-xs text-gov-green-600 font-semibold">
              <ArrowUp size={13} /> 18% vs last week
            </div>
          </div>
          <div className="flex items-end gap-2 h-36">
            {stats.weeklySignups.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500 font-medium">{val}</span>
                <div
                  className="w-full bg-[#1e3a5f] rounded-t-md transition-all hover:bg-[#16345a]"
                  style={{ height: `${Math.round((val / maxSignup) * 100)}%`, minHeight: 4 }}
                />
                <span className="text-xs text-gray-400">{DAYS[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Schemes */}
        <div className="card">
          <h2 className="font-bold text-[#1e3a5f] mb-4">Top Schemes by Applications</h2>
          <div className="space-y-3">
            {stats.topSchemes.map(({ name, applications }, idx) => {
              const maxApps = stats.topSchemes[0].applications;
              return (
                <div key={name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">#{idx + 1}</span> {name}
                    </span>
                    <span className="text-gray-500 font-bold">{applications.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[#1e3a5f]"
                      style={{ width: `${(applications / maxApps) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Users by State */}
        <div className="card">
          <h2 className="font-bold text-[#1e3a5f] mb-4 flex items-center gap-2"><TrendingUp size={16} /> Users by State</h2>
          <div className="space-y-2.5">
            {stats.usersByState.map(({ state, count }) => (
              <div key={state} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{state}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-saffron-500"
                      style={{ width: `${(count / stats.totalUsers) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-700 font-semibold w-12 text-right">{count.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schemes Overview */}
        <div className="card lg:col-span-2">
          <h2 className="font-bold text-[#1e3a5f] mb-4">Scheme Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">Scheme</th>
                  <th className="pb-2 font-medium">Category</th>
                  <th className="pb-2 font-medium">Max Funding</th>
                  <th className="pb-2 font-medium">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {SCHEMES.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-900">{s.shortName}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs capitalize">{s.category}</span>
                    </td>
                    <td className="py-2.5 text-gray-600">{formatCurrency(s.fundingDetails.maxAmount ?? s.fundingDetails.maxAmountService ?? s.fundingDetails.tranche3 ?? 0)}</td>
                    <td className="py-2.5">
                      <span className={`font-bold ${s.successRate >= 75 ? 'text-gov-green-600' : s.successRate >= 60 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {s.successRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
