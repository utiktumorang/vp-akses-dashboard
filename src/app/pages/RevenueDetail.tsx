import { ArrowLeft, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Link } from 'react-router';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';
import { ChartCard } from '../components/ChartCard';

// Extended revenue data with more details
const revenueData = [
  { month: 'Jan', revenue: 125000000, target: 120000000, newCustomers: 45, existingCustomers: 80000000 },
  { month: 'Feb', revenue: 138000000, target: 130000000, newCustomers: 52, existingCustomers: 88000000 },
  { month: 'Mar', revenue: 142000000, target: 135000000, newCustomers: 48, existingCustomers: 92000000 },
  { month: 'Apr', revenue: 156000000, target: 145000000, newCustomers: 61, existingCustomers: 95000000 },
  { month: 'Mei', revenue: 168000000, target: 155000000, newCustomers: 68, existingCustomers: 100000000 },
  { month: 'Jun', revenue: 175000000, target: 165000000, newCustomers: 71, existingCustomers: 104000000 },
  { month: 'Jul', revenue: 189000000, target: 175000000, newCustomers: 79, existingCustomers: 110000000 },
  { month: 'Agu', revenue: 195000000, target: 180000000, newCustomers: 82, existingCustomers: 113000000 },
  { month: 'Sep', revenue: 205000000, target: 190000000, newCustomers: 88, existingCustomers: 117000000 },
  { month: 'Okt', revenue: 198000000, target: 195000000, newCustomers: 76, existingCustomers: 122000000 },
  { month: 'Nov', revenue: 212000000, target: 200000000, newCustomers: 91, existingCustomers: 121000000 },
  { month: 'Des', revenue: 225000000, target: 210000000, newCustomers: 97, existingCustomers: 128000000 },
];

const revenueByProduct = [
  { product: 'Fiber 100 Mbps', revenue: 78000000, percentage: 34.7 },
  { product: 'Fiber 50 Mbps', revenue: 56000000, percentage: 24.9 },
  { product: 'Fiber 200 Mbps', revenue: 45000000, percentage: 20.0 },
  { product: 'Fiber 30 Mbps', revenue: 32000000, percentage: 14.2 },
  { product: 'Enterprise', revenue: 14000000, percentage: 6.2 },
];

const growthData = revenueData.map((item, index) => {
  if (index === 0) return { month: item.month, growth: 0 };
  const prevRevenue = revenueData[index - 1].revenue;
  const growth = ((item.revenue - prevRevenue) / prevRevenue) * 100;
  return { month: item.month, growth: parseFloat(growth.toFixed(1)) };
});

export default function RevenueDetail() {
  const currentRevenue = revenueData[revenueData.length - 1].revenue;
  const previousRevenue = revenueData[revenueData.length - 2].revenue;
  const growth = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
  const totalYearRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgMonthlyRevenue = totalYearRevenue / revenueData.length;

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
            Detail Revenue Bulanan
          </h1>
          <p className="text-sm text-muted-foreground">
            Analisis mendalam tentang performa revenue dan pertumbuhan
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Revenue Desember</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              Rp {(currentRevenue / 1000000).toFixed(0)}M
            </p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+{growth.toFixed(1)}%</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Total Tahun Ini</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              Rp {(totalYearRevenue / 1000000000).toFixed(2)}B
            </p>
            <p className="text-xs text-muted-foreground">12 bulan</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Rata-rata Bulanan</span>
            </div>
            <p className="text-2xl font-semibold text-foreground mb-1">
              Rp {(avgMonthlyRevenue / 1000000).toFixed(0)}M
            </p>
            <p className="text-xs text-muted-foreground">per bulan</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Target Achievement</span>
            </div>
            <p className="text-2xl font-semibold text-green-600 mb-1">
              107.1%
            </p>
            <p className="text-xs text-muted-foreground">melebihi target</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Revenue vs Target" subtitle="perbandingan realisasi dengan target">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop key="revenue-stop1" offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop key="revenue-stop2" offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop key="target-stop1" offset="5%" stopColor="#71717a" stopOpacity={0.2}/>
                    <stop key="target-stop2" offset="95%" stopColor="#71717a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `Rp ${(value / 1000000).toFixed(0)}M`}
                />
                <Area key="target" type="monotone" dataKey="target" stroke="#71717a" strokeWidth={2} fill="url(#targetGrad)" name="Target" />
                <Area key="revenue" type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revenueGrad)" name="Realisasi" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Pertumbuhan MoM" subtitle="month over month growth rate">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                <YAxis stroke="#71717a" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Pertumbuhan']}
                />
                <Bar key="growth-bar" dataKey="growth" radius={[4, 4, 0, 0]}>
                  {growthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? '#16a34a' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Revenue by Product */}
        <div className="mb-8">
          <ChartCard title="Revenue per Produk" subtitle="breakdown revenue berdasarkan paket layanan">
            <div className="space-y-4">
              {revenueByProduct.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.product}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-green-600">
                        Rp {(item.revenue / 1000000).toFixed(0)}M
                      </span>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Detail Table */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Tabel Detail Revenue Bulanan
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-foreground">Bulan</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Target</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Realisasi</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Achievement</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">New Customers</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {revenueData.map((item, index) => {
                    const achievement = (item.revenue / item.target) * 100;
                    const growth = index === 0 ? 0 : ((item.revenue - revenueData[index - 1].revenue) / revenueData[index - 1].revenue) * 100;
                    return (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{item.month}</td>
                        <td className="py-4 px-6 text-right text-muted-foreground">
                          Rp {(item.target / 1000000).toFixed(0)}M
                        </td>
                        <td className="py-4 px-6 text-right font-semibold text-foreground">
                          Rp {(item.revenue / 1000000).toFixed(0)}M
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                            achievement >= 100 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                          }`}>
                            {achievement.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-foreground">
                          {item.newCustomers}
                        </td>
                        <td className="py-4 px-6 text-right">
                          {index === 0 ? (
                            <span className="text-muted-foreground">-</span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {growth.toFixed(1)}%
                            </span>
                          )}
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
