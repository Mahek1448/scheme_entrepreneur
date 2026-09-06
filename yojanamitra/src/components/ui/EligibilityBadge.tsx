import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { EligibilityStatus } from '../../types';
import { cn } from '../../utils';

interface EligibilityBadgeProps {
  status: EligibilityStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CONFIG: Record<EligibilityStatus, {
  label: string;
  icon: typeof CheckCircle2;
  bg: string;
  text: string;
  border: string;
}> = {
  ELIGIBLE: {
    label: 'Eligible',
    icon: CheckCircle2,
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  NOT_ELIGIBLE: {
    label: 'Not Eligible',
    icon: XCircle,
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
  NEEDS_MORE_INFORMATION: {
    label: 'Needs Info',
    icon: AlertCircle,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
};

const SIZE_CLASSES = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-3 py-1 gap-1.5',
  lg: 'text-base px-4 py-1.5 gap-2',
};

export function EligibilityBadge({ status, size = 'md', className }: EligibilityBadgeProps) {
  const cfg = CONFIG[status];
  const Icon = cfg.icon;
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-semibold',
        cfg.bg,
        cfg.text,
        cfg.border,
        SIZE_CLASSES[size],
        className
      )}
    >
      <Icon size={iconSize} />
      {cfg.label}
    </span>
  );
}
