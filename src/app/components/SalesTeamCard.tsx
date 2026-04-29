import { Target } from 'lucide-react';

interface SalesTeam {
  name: string;
  achievement: number;
  paid: number;
  unpaid: number;
  leads: number;
  conversion: number;
}

interface SalesTeamCardProps {
  team: SalesTeam;
}

export function SalesTeamCard({ team }: SalesTeamCardProps) {
  const achievementColor = team.achievement >= 100 ? 'text-green-600' : team.achievement >= 90 ? 'text-green-600' : 'text-yellow-600';
  const achievementBg = team.achievement >= 100 ? 'bg-green-50' : team.achievement >= 90 ? 'bg-green-50' : 'bg-yellow-50';
  const achievementStatus = team.achievement >= 100 ? 'Tercapai' : team.achievement >= 90 ? 'On Track' : 'Perlu Perhatian';
  const progressColor = team.achievement >= 100 ? 'bg-green-600' : team.achievement >= 90 ? 'bg-green-600' : 'bg-yellow-500';

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-sm transition-shadow">
      {/* Team Name */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {team.name}
        </h3>
        <div className="p-2 rounded-lg bg-green-50">
          <Target className="w-4 h-4 text-green-600" />
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="mb-5">
        <div className="flex items-end justify-between mb-2">
          <span className="text-xs text-muted-foreground">Pencapaian</span>
          <span className={`text-2xl font-semibold ${achievementColor}`}>
            {team.achievement}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${Math.min(team.achievement, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-end">
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${achievementColor} ${achievementBg}`}>
            {achievementStatus}
          </span>
        </div>
      </div>

      {/* Invoice Breakdown */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="text-xs font-medium text-muted-foreground mb-3">Invoice Breakdown</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Paid</span>
            <span className="text-lg font-semibold text-green-600">
              {team.paid}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Unpaid</span>
            <span className="text-lg font-semibold text-yellow-600">
              {team.unpaid}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
