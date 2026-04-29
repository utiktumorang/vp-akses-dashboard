import { Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';

const npsData = [
  { month: 'Jan', nps: 68 },
  { month: 'Feb', nps: 70 },
  { month: 'Mar', nps: 72 },
  { month: 'Apr', nps: 71 },
  { month: 'Mei', nps: 74 },
  { month: 'Jun', nps: 76 },
  { month: 'Jul', nps: 75 },
  { month: 'Agu', nps: 77 },
  { month: 'Sep', nps: 78 },
  { month: 'Okt', nps: 79 },
  { month: 'Nov', nps: 80 },
  { month: 'Des', nps: 82 },
];

const ticketData = [
  { month: 'Jan', total: 245, resolved: 228, avgTime: 4.2 },
  { month: 'Feb', total: 232, resolved: 221, avgTime: 3.8 },
  { month: 'Mar', total: 258, resolved: 240, avgTime: 4.1 },
  { month: 'Apr', total: 221, resolved: 215, avgTime: 3.5 },
  { month: 'Mei', total: 198, resolved: 192, avgTime: 3.2 },
  { month: 'Jun', total: 205, resolved: 199, avgTime: 3.0 },
  { month: 'Jul', total: 189, resolved: 185, avgTime: 2.8 },
  { month: 'Agu', total: 215, resolved: 209, avgTime: 3.1 },
  { month: 'Sep', total: 192, resolved: 188, avgTime: 2.9 },
  { month: 'Okt', total: 178, resolved: 175, avgTime: 2.7 },
  { month: 'Nov', total: 165, resolved: 163, avgTime: 2.5 },
  { month: 'Des', total: 152, resolved: 150, avgTime: 2.3 },
];

const qualityMetrics = [
  { subject: 'Network Quality', value: 85, fullMark: 100 },
  { subject: 'Response Time', value: 78, fullMark: 100 },
  { subject: 'Resolution Rate', value: 92, fullMark: 100 },
  { subject: 'Customer Satisfaction', value: 88, fullMark: 100 },
  { subject: 'Installation Quality', value: 82, fullMark: 100 },
];

const slaMetrics = [
  { metric: 'Network Uptime', target: 99.9, actual: 99.92, status: 'Met' },
  { metric: 'First Response Time', target: 2, actual: 1.8, status: 'Met' },
  { metric: 'Resolution Time', target: 24, actual: 18.5, status: 'Met' },
  { metric: 'Installation Timeline', target: 7, actual: 5.2, status: 'Met' },
];

export default function ServiceQualityDashboard() {
  const currentNPS = npsData[npsData.length - 1].nps;
  const currentTicket = ticketData[ticketData.length - 1];
  const resolutionRate = ((currentTicket.resolved / currentTicket.total) * 100).toFixed(1);

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Dashboard VP Access Business
          </h1>
          <p className="text-sm text-muted-foreground">
            Service Quality Metrics • {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Net Promoter Score"
            value={currentNPS.toString()}
            subtitle="bulan ini"
            change="+2 poin"
            trend="up"
            icon={Star}
            color="purple"
          />
          <MetricCard
            title="Ticket Resolution Rate"
            value={`${resolutionRate}%`}
            subtitle={`${currentTicket.resolved}/${currentTicket.total} tickets`}
            change="+1.2%"
            trend="up"
            icon={CheckCircle}
            color="green"
          />
          <MetricCard
            title="Avg Resolution Time"
            value={`${currentTicket.avgTime}h`}
            subtitle="waktu rata-rata penyelesaian"
            change="-0.2h"
            trend="down"
            icon={TrendingUp}
            color="cyan"
          />
          <MetricCard
            title="Open Tickets"
            value={(currentTicket.total - currentTicket.resolved).toString()}
            subtitle="sedang ditangani"
            change="-12.5%"
            trend="down"
            icon={AlertCircle}
            color="yellow"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Net Promoter Score Trend" subtitle="skor kepuasan pelanggan">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={npsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [value, 'NPS']}
                />
                <Line key="line-nps" type="monotone" dataKey="nps" stroke="#9333ea" strokeWidth={2} dot={{ fill: '#9333ea', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Support Tickets" subtitle="total dan resolved per bulan">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                />
                <Bar key="bar-total" dataKey="total" fill="#94a3b8" name="Total" radius={[4, 4, 0, 0]} />
                <Bar key="bar-resolved" dataKey="resolved" fill="#16a34a" name="Resolved" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Quality Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Quality Metrics Overview" subtitle="performa multi-dimensi">
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={qualityMetrics}>
                <PolarGrid stroke="#e4e4e7" />
                <PolarAngleAxis dataKey="subject" style={{ fontSize: '11px' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: '10px' }} />
                <Radar key="radar-score" name="Score" dataKey="value" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              SLA Performance
            </h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-foreground">Metric</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Target</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Actual</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {slaMetrics.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="py-4 px-6 font-medium text-foreground">{item.metric}</td>
                      <td className="py-4 px-6 text-right text-muted-foreground">
                        {item.metric.includes('Time') || item.metric.includes('Timeline') ? `${item.target}h` : `${item.target}%`}
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-foreground">
                        {item.metric.includes('Time') || item.metric.includes('Timeline') ? `${item.actual}h` : `${item.actual}%`}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded text-sm font-semibold">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
