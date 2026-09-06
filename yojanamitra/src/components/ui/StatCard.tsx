import { cn } from '../../utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: { value: string; up: boolean };
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'bg-[#1e3a5f]', trend, className }: StatCardProps) {
  return (
    <div className={cn('card flex items-start gap-4', className)}>
      <div className={cn('p-3 rounded-xl text-white flex-shrink-0', iconColor)}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        {trend && (
          <p className={cn('text-xs font-medium mt-1', trend.up ? 'text-green-600' : 'text-red-500')}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
