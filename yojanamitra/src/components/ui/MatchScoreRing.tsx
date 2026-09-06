import { cn } from '../../utils';

interface MatchScoreRingProps {
  score: number; // 0–100
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#16a34a'; // green-600
  if (score >= 60) return '#d97706'; // amber-600
  if (score >= 40) return '#2563eb'; // blue-600
  return '#dc2626'; // red-600
}

const SIZES = {
  sm: { outer: 52, stroke: 5, fontSize: 'text-sm', labelSize: 'text-xs' },
  md: { outer: 72, stroke: 6, fontSize: 'text-xl', labelSize: 'text-xs' },
  lg: { outer: 96, stroke: 7, fontSize: 'text-2xl', labelSize: 'text-sm' },
};

export function MatchScoreRing({ score, size = 'md', className, showLabel = true }: MatchScoreRingProps) {
  const { outer, stroke, labelSize } = SIZES[size];
  const radius = (outer - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <svg width={outer} height={outer} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        {/* Score arc */}
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
        {/* Center text (counter-rotated) */}
        <text
          x={outer / 2}
          y={outer / 2}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            transform: `rotate(90deg) translate(0, -${outer / 2}px)`,
            transformOrigin: `${outer / 2}px ${outer / 2}px`,
            fill: color,
            fontWeight: 800,
            fontSize: size === 'sm' ? 14 : size === 'md' ? 20 : 28,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {score}
        </text>
      </svg>
      {showLabel && (
        <span className={cn(labelSize, 'text-gray-400 font-medium')}>Match %</span>
      )}
    </div>
  );
}
