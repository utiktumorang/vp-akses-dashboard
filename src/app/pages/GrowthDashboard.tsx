import { useState } from 'react';
import { TrendingUp, Users, Activity, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../components/MetricCard';
import { ChartCard } from '../components/ChartCard';
import { Tooltip } from '../components/Tooltip';

// YTD data sampai 24 April 2026
const growthData = [
  { month: 'Jan', newCustomers: 320, revenue: 125000000, revenueLY: 108000000 },
  { month: 'Feb', newCustomers: 385, revenue: 138000000, revenueLY: 115000000 },
  { month: 'Mar', newCustomers: 412, revenue: 142000000, revenueLY: 122000000 },
  { month: 'Apr', newCustomers: 458, revenue: 156000000, revenueLY: 135000000 },
];

// YTD data sampai 24 April 2026
const migrationData = [
  { month: 'Jan', wireless: 28, fiber: 292 },
  { month: 'Feb', wireless: 35, fiber: 350 },
  { month: 'Mar', wireless: 32, fiber: 380 },
  { month: 'Apr', wireless: 38, fiber: 420 },
];

export default function GrowthDashboard() {
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState<'lagging' | 'leading'>('lagging');
  const [mrcView, setMrcView] = useState<'paid' | 'unpaid' | 'total'>('paid');

  const currentMonth = growthData[growthData.length - 1];
  const previousMonth = growthData[growthData.length - 2];
  const customerGrowth = (((currentMonth.newCustomers - previousMonth.newCustomers) / previousMonth.newCustomers) * 100).toFixed(1);
  const revenueGrowth = (((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100).toFixed(1);

  // Lagging Indicator Data
  const revenueYTD = growthData.reduce((sum, item) => sum + item.revenue, 0);
  const forecastRevenueNextMonth = 185000000; // Sum of (Value Opportunity × 90% probability for negotiation stage)
  const targetRevenueYTD = 600000000; // From Target Revenue page (example: 156M for Apr from annual 2B)
  const revenueAchievement = ((revenueYTD / targetRevenueYTD) * 100).toFixed(1);
  const newMRCPaid = 87500000; // Sum of MRC from paid new customers
  const newMRCUnpaid = 12300000; // Sum of MRC from unpaid new customers
  const totalNewMRCYTD = 99800000; // Total MRC all customers YTD
  const newRevenueCurrent = 42000000; // Revenue from new deals current month
  const arpuDedicated = 8500000; // Total Revenue Dedicated / Customers Dedicated
  const arpuBroadband = 2750000; // Total Revenue Broadband / Customers Broadband

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Dashboard VP Access Business
          </h1>
          <p className="text-sm text-muted-foreground">
            Growth Metrics • {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('lagging')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'lagging'
                ? 'text-green-600'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Lagging Indicator
            {activeTab === 'lagging' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('leading')}
            className={`px-6 py-3 font-medium transition-colors relative ${
              activeTab === 'leading'
                ? 'text-green-600'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Leading Indicator
            {activeTab === 'leading' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'lagging' && (
          <>
            {/* Revenue Overview - Chart + 3 Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* 3 Metric Cards Stacked */}
              <div className="flex flex-col gap-6">
                {/* Revenue Achievement - Larger Card */}
                <div className="bg-card border border-border rounded-lg p-6 flex-[2] relative">
                  <div className="absolute top-4 right-4">
                    <Tooltip content="vs Bulan Lalu (Maret 2026)">
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help">
                        <ArrowUp className="w-3 h-3" />
                        <span>2.3%</span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-cyan-600" />
                    <span className="text-sm text-muted-foreground font-medium">Revenue Achievement</span>
                  </div>
                  <p className="text-6xl font-semibold text-foreground mb-3">
                    {revenueAchievement}%
                  </p>
                  <p className="text-sm text-muted-foreground">Target: Rp {(targetRevenueYTD / 1000000).toFixed(0)}M</p>
                </div>

                {/* Smaller Cards */}
                <div className="bg-card border border-border rounded-lg p-6 flex-1 relative">
                  <div className="absolute top-4 right-4">
                    <Tooltip content="vs Bulan Lalu (Maret 2026)">
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help">
                        <ArrowUp className="w-3 h-3" />
                        <span>12.5%</span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-muted-foreground font-medium">New Revenue</span>
                  </div>
                  <p className="text-3xl font-semibold text-foreground mb-1">
                    Rp {(newRevenueCurrent / 1000000).toFixed(0)}M
                  </p>
                  <p className="text-xs text-muted-foreground">Deal baru bulan ini</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 flex-1 relative">
                  <div className="absolute top-4 right-4">
                    <Tooltip content="vs Forecast Bulan Ini (April 2026)">
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help">
                        <ArrowUp className="w-3 h-3" />
                        <span>8.2%</span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-muted-foreground font-medium">Forecast Revenue Next Month</span>
                  </div>
                  <p className="text-3xl font-semibold text-foreground mb-1">
                    Rp {(forecastRevenueNextMonth / 1000000).toFixed(0)}M
                  </p>
                  <p className="text-xs text-muted-foreground">Mei 2026 (Negotiation 90%)</p>
                </div>
              </div>

              {/* Revenue Chart - Spans 2 columns */}
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Revenue (YTD)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Year to Date sampai 24 April 2026
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-foreground font-medium">Compare</span>
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showComparison ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                      aria-checked={showComparison}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          showComparison ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={340}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="month" stroke="#71717a" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#71717a" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value / 1000000}M`} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e4e4e7',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number, name: string) => {
                        const label = name === 'revenue' ? '2026 YTD' : '2025 YTD';
                        return [`Rp ${(value / 1000000).toFixed(0)}M`, label];
                      }}
                    />
                    <Line key="line-revenue" type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ fill: '#16a34a', r: 3 }} name="revenue" />
                    {showComparison && (
                      <Line key="line-revenue-ly" type="monotone" dataKey="revenueLY" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#94a3b8', r: 3 }} name="revenueLY" />
                    )}
                  </LineChart>
                </ResponsiveContainer>
                {showComparison && (
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#16a34a]"></div>
                      <span className="text-sm font-medium text-foreground">2026 YTD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#94a3b8] opacity-75"></div>
                      <span className="text-sm font-medium text-foreground">2025 YTD</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* MRC and ARPU Cards in One Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Interactive New MRC Card */}
              <div className="bg-card border border-border rounded-lg p-6 relative">
                <div className="absolute top-4 right-4">
                  <Tooltip content="vs Bulan Lalu (Maret 2026)">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help">
                      <ArrowUp className="w-3 h-3" />
                      <span>15.2%</span>
                    </div>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground font-medium">New MRC</span>
                </div>

                {/* Simple Tab Buttons */}
                <div className="flex gap-6 mb-6 border-b border-border">
                  <button
                    onClick={() => setMrcView('paid')}
                    className={`pb-2 text-sm font-medium transition-colors relative ${
                      mrcView === 'paid'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Paid
                    {mrcView === 'paid' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setMrcView('unpaid')}
                    className={`pb-2 text-sm font-medium transition-colors relative ${
                      mrcView === 'unpaid'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Unpaid
                    {mrcView === 'unpaid' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setMrcView('total')}
                    className={`pb-2 text-sm font-medium transition-colors relative ${
                      mrcView === 'total'
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Total
                    {mrcView === 'total' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                    )}
                  </button>
                </div>

                {/* Display Content Based on Selected View */}
                {mrcView === 'paid' && (
                  <>
                    <p className="text-4xl font-semibold text-foreground mb-2">
                      Rp {(newMRCPaid / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">Pelanggan sudah bayar</p>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Collection Rate</span>
                        <span className="text-sm font-medium text-green-600">87.7%</span>
                      </div>
                    </div>
                  </>
                )}

                {mrcView === 'unpaid' && (
                  <>
                    <p className="text-4xl font-semibold text-foreground mb-2">
                      Rp {(newMRCUnpaid / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">Pelanggan belum bayar</p>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Outstanding</span>
                        <span className="text-sm font-medium text-yellow-600">12.3%</span>
                      </div>
                    </div>
                  </>
                )}

                {mrcView === 'total' && (
                  <>
                    <p className="text-4xl font-semibold text-foreground mb-2">
                      Rp {((newMRCPaid + newMRCUnpaid) / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">Total MRC bulan ini</p>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Paid</span>
                        <span className="text-sm font-medium text-green-600">Rp {(newMRCPaid / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Unpaid</span>
                        <span className="text-sm font-medium text-yellow-600">Rp {(newMRCUnpaid / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Total MRC YTD Card */}
              <div className="bg-card border border-border rounded-lg p-6 relative">
                <div className="absolute top-4 right-4">
                  <Tooltip content="vs YTD Tahun Lalu (Jan-Apr 2025)">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help">
                      <ArrowUp className="w-3 h-3" />
                      <span>8.5%</span>
                    </div>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-muted-foreground font-medium">Total MRC YTD</span>
                </div>
                <p className="text-4xl font-semibold text-foreground mb-2">
                  Rp {(totalNewMRCYTD / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-muted-foreground mb-4">Jan - Apr 2026</p>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">vs Target YTD</span>
                    <span className="text-sm font-medium text-green-600">+8.5%</span>
                  </div>
                </div>
              </div>

              {/* ARPU Card - Show Both Values */}
              <div className="bg-card border border-border rounded-lg p-6 relative">
                <div className="absolute top-4 right-4">
                  <Tooltip content="vs Bulan Lalu (Maret 2026)">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help">
                      <ArrowUp className="w-3 h-3" />
                      <span>2.8%</span>
                    </div>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground font-medium">ARPU</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Average Revenue Per User</p>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">Dedicated</span>
                      <span className="text-sm font-medium text-green-600">+3.2%</span>
                    </div>
                    <p className="text-3xl font-semibold text-foreground mb-1">
                      Rp {(arpuDedicated / 1000000).toFixed(1)}M
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">Broadband</span>
                      <span className="text-sm font-medium text-green-600">+1.8%</span>
                    </div>
                    <p className="text-3xl font-semibold text-foreground">
                      Rp {(arpuBroadband / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'leading' && (
          <div className="bg-card border border-border rounded-lg p-12 text-center mb-8">
            <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Leading Indicator</h3>
            <p className="text-muted-foreground">Konten leading indicator akan ditambahkan di sini</p>
          </div>
        )}
      </div>
    </div>
  );
}
