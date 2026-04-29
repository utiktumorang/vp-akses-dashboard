import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  timeLabel?: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'cyan' | 'green' | 'yellow' | 'purple';
}

const colorClasses = {
  cyan: {
    icon: 'text-green-600',
    bg: 'bg-green-50',
  },
  green: {
    icon: 'text-green-600',
    bg: 'bg-green-50',
  },
  yellow: {
    icon: 'text-green-600',
    bg: 'bg-green-50',
  },
  purple: {
    icon: 'text-green-600',
    bg: 'bg-green-50',
  }
};

export function MetricCard({ title, value, subtitle, timeLabel, change, trend, icon: Icon, color }: MetricCardProps) {
  const colors = colorClasses[color];
  const isPositive = trend === 'up';

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${colors.bg}`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{change}</span>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">
          {title}
        </p>
        <p className="text-2xl font-semibold text-foreground mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
