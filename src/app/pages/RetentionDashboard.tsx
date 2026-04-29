import { TrendingDown, Users, AlertCircle, Award } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';

const churnData = [
  { month: 'Jan', rate: 2.8, churned: 118 },
  { month: 'Feb', rate: 2.5, churned: 109 },
  { month: 'Mar', rate: 3.1, churned: 137 },
  { month: 'Apr', rate: 2.2, churned: 101 },
  { month: 'Mei', rate: 1.9, churned: 90 },
  { month: 'Jun', rate: 2.0, churned: 97 },
  { month: 'Jul', rate: 1.8, churned: 90 },
  { month: 'Agu', rate: 2.3, churned: 118 },
  { month: 'Sep', rate: 2.1, churned: 111 },
  { month: 'Okt', rate: 1.7, churned: 93 },
  { month: 'Nov', rate: 1.5, churned: 84 },
  { month: 'Des', rate: 1.6, churned: 92 },
];

const retentionPrograms = [
  { program: 'Loyalty Rewards', active: 2450, retention: 94.5 },
  { program: 'Early Warning System', active: 1820, retention: 88.2 },
  { program: 'VIP Customer Care', active: 980, retention: 97.8 },
  { program: 'Contract Extension', active: 3200, retention: 91.3 },
];

const churnReasons = [
  { reason: 'Harga terlalu mahal', percentage: 38.4 },
  { reason: 'Kualitas service', percentage: 27.5 },
  { reason: 'Competitor lebih baik', percentage: 25.4 },
  { reason: 'Pindah lokasi', percentage: 8.7 },
];

export default function RetentionDashboard() {
  const currentChurn = churnData[churnData.length - 1];
  const avgChurn = churnData.reduce((sum, item) => sum + item.rate, 0) / churnData.length;
  const totalRetained = retentionPrograms.reduce((sum, item) => sum + item.active, 0);

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Dashboard VP Access Business
          </h1>
          <p className="text-sm text-muted-foreground">
            Retention Metrics • {new Date().toLocaleDateString('id-ID', {
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
            title="Churn Rate"
            value={`${currentChurn.rate}%`}
            subtitle="bulan ini"
            change="-0.1%"
            trend="down"
            icon={TrendingDown}
            color="green"
          />
          <MetricCard
            title="Rata-rata Churn"
            value={`${avgChurn.toFixed(1)}%`}
            subtitle="per bulan tahun ini"
            change="-0.3%"
            trend="down"
            icon={AlertCircle}
            color="yellow"
          />
          <MetricCard
            title="Pelanggan di Program Retensi"
            value={totalRetained.toLocaleString()}
            subtitle="aktif saat ini"
            change="+15.2%"
            trend="up"
            icon={Award}
            color="purple"
          />
          <MetricCard
            title="Retention Rate"
            value="98.4%"
            subtitle="bulan ini"
            change="+0.1%"
            trend="up"
            icon={Users}
            color="cyan"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Trend Churn Rate" subtitle="persentase pelanggan keluar per bulan">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Churn Rate']}
                />
                <Line key="line-churn-rate" type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Pelanggan Keluar" subtitle="jumlah absolut per bulan">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value} pelanggan`, 'Churned']}
                />
                <Bar key="bar-churned" dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Retention Programs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Program Retensi Aktif
            </h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-foreground">Program</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Pelanggan Aktif</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Retention Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {retentionPrograms.map((program, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="py-4 px-6 font-medium text-foreground">{program.program}</td>
                      <td className="py-4 px-6 text-right text-muted-foreground">{program.active.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded text-sm font-semibold">
                          {program.retention}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ChartCard title="Alasan Churn" subtitle="distribusi alasan pelanggan keluar">
            <div className="space-y-4">
              {churnReasons.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.reason}</span>
                    <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
