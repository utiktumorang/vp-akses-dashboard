import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle, Users } from 'lucide-react';
import { Link } from 'react-router';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartCard } from '../components/ChartCard';

// Extended churn data with more details
const churnData = [
  { month: 'Jan', rate: 2.8, totalCustomers: 4200, churned: 118, reasons: { price: 45, service: 32, competition: 28, relocation: 13 } },
  { month: 'Feb', rate: 2.5, totalCustomers: 4350, churned: 109, reasons: { price: 41, service: 29, competition: 26, relocation: 13 } },
  { month: 'Mar', rate: 3.1, totalCustomers: 4420, churned: 137, reasons: { price: 52, service: 38, competition: 32, relocation: 15 } },
  { month: 'Apr', rate: 2.2, totalCustomers: 4580, churned: 101, reasons: { price: 38, service: 27, competition: 24, relocation: 12 } },
  { month: 'Mei', rate: 1.9, totalCustomers: 4720, churned: 90, reasons: { price: 34, service: 24, competition: 21, relocation: 11 } },
  { month: 'Jun', rate: 2.0, totalCustomers: 4850, churned: 97, reasons: { price: 37, service: 26, competition: 22, relocation: 12 } },
  { month: 'Jul', rate: 1.8, totalCustomers: 5010, churned: 90, reasons: { price: 33, service: 24, competition: 21, relocation: 12 } },
  { month: 'Agu', rate: 2.3, totalCustomers: 5140, churned: 118, reasons: { price: 45, service: 32, competition: 27, relocation: 14 } },
  { month: 'Sep', rate: 2.1, totalCustomers: 5280, churned: 111, reasons: { price: 42, service: 30, competition: 26, relocation: 13 } },
  { month: 'Okt', rate: 1.7, totalCustomers: 5450, churned: 93, reasons: { price: 35, service: 25, competition: 22, relocation: 11 } },
  { month: 'Nov', rate: 1.5, totalCustomers: 5620, churned: 84, reasons: { price: 31, service: 23, competition: 20, relocation: 10 } },
  { month: 'Des', rate: 1.6, totalCustomers: 5780, churned: 92, reasons: { price: 35, service: 25, competition: 21, relocation: 11 } },
];

const churnReasons = [
  { reason: 'Harga terlalu mahal', count: 468, percentage: 38.4 },
  { reason: 'Kualitas service', count: 335, percentage: 27.5 },
  { reason: 'Competitor lebih baik', count: 310, percentage: 25.4 },
  { reason: 'Pindah lokasi', count: 147, percentage: 8.7 },
];

const preventionActions = [
  { action: 'Early warning system', impact: 'High', status: 'Active', reduction: '0.3%' },
  { action: 'Customer satisfaction survey', impact: 'Medium', status: 'Active', reduction: '0.2%' },
  { action: 'Retention offer program', impact: 'High', status: 'Active', reduction: '0.4%' },
  { action: 'Service quality improvement', impact: 'High', status: 'In Progress', reduction: '0.5%' },
];

export default function ChurnRateDetail() {
  const currentChurn = churnData[churnData.length - 1];
  const previousChurn = churnData[churnData.length - 2];
  const avgChurn = churnData.reduce((sum, item) => sum + item.rate, 0) / churnData.length;
  const totalChurned = churnData.reduce((sum, item) => sum + item.churned, 0);
  const trend = currentChurn.rate - previousChurn.rate;

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Detail Churn Rate Bulanan
          </h1>
          <p className="text-sm text-muted-foreground">
            Analisis mendalam tentang customer churn dan strategi retensi
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-muted-foreground">Churn Rate Desember</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              {currentChurn.rate}%
            </p>
            <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{Math.abs(trend).toFixed(1)}% vs bulan lalu</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-red-600" />
              <span className="text-sm text-muted-foreground">Total Churned YTD</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              {totalChurned}
            </p>
            <p className="text-xs text-muted-foreground">pelanggan keluar</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-muted-foreground">Rata-rata Churn</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              {avgChurn.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">per bulan</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Total Customers</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              {currentChurn.totalCustomers.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">per Desember</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Trend Churn Rate" subtitle="persentase pelanggan keluar per bulan">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={churnData}>
                <defs>
                  <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area key="area-churn-rate" type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} fill="url(#churnGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Jumlah Pelanggan Keluar" subtitle="absolut number per bulan">
            <ResponsiveContainer width="100%" height={350}>
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
                <Bar key="bar-churned-detail" dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Churn Reasons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <ChartCard title="Alasan Churn" subtitle="breakdown berdasarkan kategori">
              <div className="space-y-4">
                {churnReasons.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item.reason}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-red-600">
                          {item.count} pelanggan
                        </span>
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {item.percentage}%
                        </span>
                      </div>
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

          <div>
            <ChartCard title="Aksi Pencegahan" subtitle="program retensi yang sedang berjalan">
              <div className="space-y-3">
                {preventionActions.map((item, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm mb-1">{item.action}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                            item.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {item.status}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                            item.impact === 'High' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {item.impact} Impact
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{item.reduction}</div>
                        <div className="text-xs text-muted-foreground">reduction</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Detail Table */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Tabel Detail Churn Bulanan
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-foreground">Bulan</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Total Customers</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Churned</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Churn Rate</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Price Issue</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Service Issue</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Competition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {churnData.map((item, index) => {
                    return (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{item.month}</td>
                        <td className="py-4 px-6 text-right text-foreground">
                          {item.totalCustomers.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right font-semibold text-red-600">
                          {item.churned}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                            item.rate <= 2.0 ? 'bg-green-50 text-green-700' : item.rate <= 2.5 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {item.rate}%
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-muted-foreground">
                          {item.reasons.price}
                        </td>
                        <td className="py-4 px-6 text-right text-muted-foreground">
                          {item.reasons.service}
                        </td>
                        <td className="py-4 px-6 text-right text-muted-foreground">
                          {item.reasons.competition}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
