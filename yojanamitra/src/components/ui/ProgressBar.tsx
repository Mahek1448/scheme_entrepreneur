import { cn } from '../../utils';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  color?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ value, label, color = 'bg-[#1e3a5f]', showPercent = false, size = 'md', className }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-gray-600">{label}</span>}
          {showPercent && <span className="text-xs font-semibold text-gray-700">{value}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
