import { Activity, CheckCircle2, Clock, Circle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_APPLICATIONS } from '../data/mockData';
import type { ApplicationStatus } from '../types';
import { cn, formatDate, formatCurrency, getStatusColor, getStatusLabel } from '../utils';

const STATUS_STEP_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  completed: CheckCircle2,
  current: Clock,
  pending: Circle,
};

function StatusDot({ status }: { status: ApplicationStatus }) {
  const colors: Record<string, string> = {
    draft: 'bg-gray-400',
    submitted: 'bg-blue-500',
    under_review: 'bg-yellow-500',
    approved: 'bg-green-500',
    rejected: 'bg-red-500',
    disbursed: 'bg-emerald-500',
  };
  return <span className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', colors[status] ?? 'bg-gray-400')} />;
}

export default function ApplicationTracker() {
  const navigate = useNavigate();

  return (
    <div className="page-container py-8">
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2"><Activity size={22} /> Application Tracker</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor the status of all your scheme applications in real time.</p>
      </div>

      <div className="space-y-6">
        {SAMPLE_APPLICATIONS.map((app) => (
          <div key={app.id} className="card border border-gray-100">
            {/* App Header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="font-bold text-gray-900">{app.schemeName}</h2>
                  <span className={cn('badge text-xs', getStatusColor(app.status))}>
                    <StatusDot status={app.status} />
                    {getStatusLabel(app.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Ref: {app.referenceNumber}</p>
                <p className="text-xs text-gray-400 mt-0.5">Applied {formatDate(app.appliedAt)} · Updated {formatDate(app.lastUpdated)}</p>
              </div>
              {app.amount && (
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">Amount</p>
                  <p className="text-base font-extrabold text-[#1e3a5f]">{formatCurrency(app.amount)}</p>
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div className="space-y-3">
              {app.steps.map((step, idx) => {
                const Icon = STATUS_STEP_ICON[step.status] ?? Circle;
                return (
                  <div key={step.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <Icon
                        size={20}
                        className={cn(
                          step.status === 'completed' ? 'text-gov-green-600' :
                          step.status === 'current' ? 'text-blue-500' : 'text-gray-300'
                        )}
                      />
                      {idx < app.steps.length - 1 && (
                        <div className={cn('w-0.5 flex-1 mt-1', step.status === 'completed' ? 'bg-gov-green-300' : 'bg-gray-200')} style={{ minHeight: 16 }} />
                      )}
                    </div>
                    <div className="pb-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={cn('text-sm font-semibold', step.status === 'pending' ? 'text-gray-400' : 'text-gray-900')}>
                          {step.title}
                        </p>
                        {step.status === 'current' && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium animate-pulse">In Progress</span>
                        )}
                      </div>
                      <p className={cn('text-xs mt-0.5', step.status === 'pending' ? 'text-gray-300' : 'text-gray-500')}>
                        {step.description}
                      </p>
                      {step.completedAt && (
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(step.completedAt)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50">
              <button
                onClick={() => navigate(`/schemes/${app.schemeId}`)}
                className="text-xs text-[#1e3a5f] font-semibold hover:underline flex items-center gap-1"
              >
                View Scheme Details <ChevronRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {SAMPLE_APPLICATIONS.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Activity size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No applications yet.</p>
          <button onClick={() => navigate('/schemes')} className="btn-primary mt-4 text-sm">Browse Schemes</button>
        </div>
      )}
    </div>
  );
}
