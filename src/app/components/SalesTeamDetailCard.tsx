import { Target, Users, TrendingUp, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface SalesTeamMember {
  name: string;
  role: string;
  achievement: number;
  leads: number;
  opportunities: number;
  won: number;
}

interface SalesTeam {
  name: string;
  achievement: number;
  paid: number;
  unpaid: number;
  leads: number;
  opportunities: number;
  conversion: number;
  members: SalesTeamMember[];
}

interface SalesTeamDetailCardProps {
  team: SalesTeam;
}

export function SalesTeamDetailCard({ team }: SalesTeamDetailCardProps) {
  const achievementColor = team.achievement >= 100 ? 'text-green-600' : team.achievement >= 90 ? 'text-green-600' : 'text-yellow-600';
  const achievementBg = team.achievement >= 100 ? 'bg-green-50' : team.achievement >= 90 ? 'bg-green-50' : 'bg-yellow-50';
  const achievementStatus = team.achievement >= 100 ? 'Tercapai' : team.achievement >= 90 ? 'On Track' : 'Perlu Perhatian';

  // Data untuk donut chart
  const chartData = [
    { name: 'Paid', value: team.paid, color: '#16a34a' },
    { name: 'Unpaid', value: team.unpaid, color: '#eab308' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <div className="p-6">
        {/* Team Name */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {team.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-green-50">
              <Target className="w-4 h-4 text-green-600" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="p-2 rounded-lg hover:bg-green-50 transition-colors group"
                  aria-label="Lihat detail anggota tim"
                >
                  <Eye className="w-4 h-4 text-muted-foreground group-hover:text-green-600" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">{team.name} - Detail Anggota Tim</DialogTitle>
                  <DialogDescription>
                    Pencapaian: {team.achievement}% • Leads: {team.leads} • Opportunities: {team.opportunities}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Nama</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Role</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Achievement</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Leads</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Opportunities</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Won</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Win Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {team.members.map((member, idx) => {
                          const memberColor = member.achievement >= 100 ? 'text-green-600' : member.achievement >= 90 ? 'text-green-600' : 'text-yellow-600';
                          const winRate = member.opportunities > 0 ? ((member.won / member.opportunities) * 100).toFixed(1) : '0';
                          return (
                            <tr key={idx} className="hover:bg-muted/50 transition-colors">
                              <td className="py-3 px-4 font-medium text-foreground">{member.name}</td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{member.role}</td>
                              <td className={`py-3 px-4 text-right font-semibold ${memberColor}`}>
                                {member.achievement}%
                              </td>
                              <td className="py-3 px-4 text-right text-foreground">{member.leads}</td>
                              <td className="py-3 px-4 text-right text-foreground">{member.opportunities}</td>
                              <td className="py-3 px-4 text-right font-medium text-green-600">{member.won}</td>
                              <td className="py-3 px-4 text-right font-medium text-blue-600">{winRate}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="border-t-2 border-border bg-muted/30">
                        <tr>
                          <td className="py-3 px-4 font-semibold text-foreground" colSpan={3}>Total Tim</td>
                          <td className="py-3 px-4 text-right font-semibold text-foreground">
                            {team.members.reduce((sum, m) => sum + m.leads, 0)}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-foreground">
                            {team.members.reduce((sum, m) => sum + m.opportunities, 0)}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {team.members.reduce((sum, m) => sum + m.won, 0)}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-blue-600">
                            {team.conversion}%
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="text-sm text-green-700 mb-1">Paid Invoice</div>
                      <div className="text-2xl font-semibold text-green-600">{team.paid}%</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="text-sm text-yellow-700 mb-1">Unpaid Invoice</div>
                      <div className="text-2xl font-semibold text-yellow-600">{team.unpaid}%</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Achievement Donut Chart */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1">Pencapaian</div>
              <div className={`text-2xl font-semibold ${achievementColor}`}>
                {team.achievement}%
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${achievementColor} ${achievementBg} inline-block mt-1`}>
                {achievementStatus}
              </span>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={44}
                      outerRadius={68}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`${team.name}-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e4e4e7',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="text-sm font-semibold text-foreground">{team.achievement}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
