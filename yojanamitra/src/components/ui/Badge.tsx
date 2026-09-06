import { cn } from '../../utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green' | 'orange' | 'red' | 'blue' | 'gray';
  className?: string;
}

const variantMap: Record<string, string> = {
  default: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  gray: 'bg-gray-100 text-gray-600',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('badge', variantMap[variant], className)}>
      {children}
    </span>
  );
}
