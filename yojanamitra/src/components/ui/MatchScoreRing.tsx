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

// Increased sizes to ensure text never clips
const SIZES = {
  sm: { outer: 72,  stroke: 6, textSize: '15px', subSize: '10px', labelSize: 'text-xs' },
  md: { outer: 96,  stroke: 7, textSize: '20px', subSize: '12px', labelSize: 'text-xs' },
  lg: { outer: 128, stroke: 8, textSize: '26px', subSize: '14px', labelSize: 'text-sm' },
};

export function MatchScoreRing({ score, size = 'md', className, showLabel = true }: MatchScoreRingProps) {
  const { outer, stroke, textSize, subSize, labelSize } = SIZES[size];
  const radius = (outer - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (Math.min(score, 100) / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {/* Wrapper with relative positioning so we can overlay the text */}
      <div style={{ position: 'relative', width: outer, height: outer, flexShrink: 0 }}>
        {/* SVG ring — overflow visible so stroke is not clipped */}
        <svg
          width={outer}
          height={outer}
          style={{ transform: 'rotate(-90deg)', display: 'block', overflow: 'visible' }}
          aria-hidden="true"
        >
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
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        </svg>

        {/* Score text — absolutely centered, never clips */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 0,
            lineHeight: 1,
          }}
        >
          <span
            style={{
              color,
              fontWeight: 800,
              fontSize: textSize,
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {score}
          </span>
          <span
            style={{
              color,
              fontWeight: 700,
              fontSize: subSize,
              fontFamily: 'Inter, system-ui, sans-serif',
              alignSelf: 'flex-start',
              marginTop: '3px',
            }}
          >
            %
          </span>
        </div>
      </div>

      {showLabel && (
        <span className={cn(labelSize, 'text-gray-400 font-medium')}>Match %</span>
      )}
    </div>
  );
}
