import { useState } from 'react';
import {
  Activity,
  ArrowUp,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';

const growthData = [
  { month: 'Jan', revenue: 125000000, revenueLY: 108000000 },
  { month: 'Feb', revenue: 138000000, revenueLY: 115000000 },
  { month: 'Mar', revenue: 142000000, revenueLY: 122000000 },
  { month: 'Apr', revenue: 156000000, revenueLY: 135000000 },
];

export default function GrowthDashboard() {
  const [activeTab, setActiveTab] = useState<'lagging' | 'leading'>(
    'lagging'
  );

  const [showComparison, setShowComparison] = useState(false);

  const revenueYTD = growthData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const targetRevenue = 600000000;
  const revenueAchievement = (
    (revenueYTD / targetRevenue) *
    100
  ).toFixed(1);

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Dashboard - Growth Metric
          </h1>

          <p className="text-sm text-muted-foreground">
            Rekap pertumbuhan penjualan •{' '}
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab('lagging')}
            className={`pb-3 text-sm font-medium relative transition-colors ${
              activeTab === 'lagging'
                ? 'text-green-600'
                : 'text-muted-foreground'
            }`}
          >
            Lagging Indicator

            {activeTab === 'lagging' && (
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-600" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('leading')}
            className={`pb-3 text-sm font-medium relative transition-colors ${
              activeTab === 'leading'
                ? 'text-green-600'
                : 'text-muted-foreground'
            }`}
          >
            Leading Indicator

            {activeTab === 'leading' && (
              <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-green-600" />
            )}
          </button>
        </div>

        {/* ========================================================= */}
        {/* LAGGING */}
        {/* ========================================================= */}

        {activeTab === 'lagging' && (
          <div className="space-y-6">

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT METRICS */}
              <div className="flex flex-col gap-6">

                {/* REVENUE ACHIEVEMENT */}
                <div className="bg-card border border-border rounded-lg p-6 relative flex-[2]">

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <ArrowUp className="w-3 h-3" />
                      2.3%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-cyan-600" />

                    <span className="text-sm text-muted-foreground font-medium">
                      Revenue Achievement
                    </span>
                  </div>

                  <h2 className="text-6xl font-semibold text-foreground mb-3">
                    {revenueAchievement}%
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Target: Rp 600M
                  </p>
                </div>

                {/* NEW REVENUE */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <ArrowUp className="w-3 h-3" />
                      12.5%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-yellow-600" />

                    <span className="text-sm text-muted-foreground font-medium">
                      New Revenue
                    </span>
                  </div>

                  <h3 className="text-3xl font-semibold text-foreground mb-1">
                    Rp 42M
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Deal baru bulan ini
                  </p>
                </div>

                {/* FORECAST */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <ArrowUp className="w-3 h-3" />
                      8.2%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-600" />

                    <span className="text-sm text-muted-foreground font-medium">
                      Forecast Revenue
                    </span>
                  </div>

                  <h3 className="text-3xl font-semibold text-foreground mb-1">
                    Rp 185M
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    Mei 2026
                  </p>
                </div>
              </div>

              {/* CHART */}
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">

                <div className="flex items-center justify-between mb-5">

                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Revenue (YTD)
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Year to Date sampai April 2026
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">
                      Compare
                    </span>

                    <button
                      onClick={() =>
                        setShowComparison(!showComparison)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showComparison
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          showComparison
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={340}>
                  <LineChart data={growthData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e4e4e7"
                    />

                    <XAxis
                      dataKey="month"
                      stroke="#71717a"
                    />

                    <YAxis
                      stroke="#71717a"
                      tickFormatter={(value) =>
                        `${value / 1000000}M`
                      }
                    />

                    <RechartsTooltip
                      formatter={(value: number) => [
                        `Rp ${(value / 1000000).toFixed(0)}M`,
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#16a34a"
                      strokeWidth={3}
                    />

                    {showComparison && (
                      <Line
                        type="monotone"
                        dataKey="revenueLY"
                        stroke="#94a3b8"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* BOTTOM CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* NEW MRC */}
              <div className="bg-card border border-border rounded-lg p-6">

                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />

                  <span className="text-sm text-muted-foreground font-medium">
                    New MRC
                  </span>
                </div>

                <h3 className="text-4xl font-semibold text-foreground mb-2">
                  Rp 87.5M
                </h3>

                <p className="text-sm text-muted-foreground">
                  Pelanggan sudah bayar
                </p>
              </div>

              {/* TOTAL MRC */}
              <div className="bg-card border border-border rounded-lg p-6">

                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />

                  <span className="text-sm text-muted-foreground font-medium">
                    Total MRC YTD
                  </span>
                </div>

                <h3 className="text-4xl font-semibold text-foreground mb-2">
                  Rp 99.8M
                </h3>

                <p className="text-sm text-muted-foreground">
                  Jan - Apr 2026
                </p>
              </div>

              {/* ARPU */}
              <div className="bg-card border border-border rounded-lg p-6">

                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-green-600" />

                  <span className="text-sm text-muted-foreground font-medium">
                    ARPU
                  </span>
                </div>

                <div className="space-y-4">

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Dedicated
                      </span>

                      <span className="text-sm text-green-600">
                        +3.2%
                      </span>
                    </div>

                    <h3 className="text-3xl font-semibold">
                      Rp 8.5M
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Broadband
                      </span>

                      <span className="text-sm text-green-600">
                        +1.8%
                      </span>
                    </div>

                    <h3 className="text-3xl font-semibold">
                      Rp 2.7M
                    </h3>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* LEADING */}
        {/* ========================================================= */}

        {activeTab === 'leading' && (
          <div className="space-y-6">

            {/* TOP */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

              {/* PIPELINE */}
              <div className="xl:col-span-8 bg-card border border-border rounded-lg p-6 relative">

                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    ↑ 0%
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-10">
                  Pipeline by Stage (Rp)
                </h3>

                <div className="flex flex-col lg:flex-row gap-10 items-center">

                 {/* FUNNEL */}
                  <div className="flex-1 w-full flex flex-col items-center">

                    <div className="w-full flex flex-col items-center gap-4">

                      {/* STAGE 1 */}
                      <div
                        className="h-16 bg-blue-500 text-white flex items-center justify-center font-semibold text-lg"
                        style={{
                          width: '100%',
                          clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
                        }}
                      >
                        Rp 850M
                      </div>

                      {/* STAGE 2 */}
                      <div
                        className="h-16 bg-cyan-500 text-white flex items-center justify-center font-semibold text-lg"
                        style={{
                          width: '82%',
                          clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
                        }}
                      >
                        Rp 920M
                      </div>

                      {/* STAGE 3 */}
                      <div
                        className="h-16 bg-emerald-500 text-white flex items-center justify-center font-semibold text-lg"
                        style={{
                          width: '64%',
                          clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
                        }}
                      >
                        Rp 630M
                      </div>

                    </div>
                  </div>

                  {/* STATS */}
                  <div className="w-full lg:w-52 space-y-6">

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Qualified (BANT)
                      </p>

                      <h3 className="text-3xl font-semibold">
                        35.4%
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Quotation
                      </p>

                      <h3 className="text-3xl font-semibold">
                        38.3%
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Negotiation
                      </p>

                      <h3 className="text-3xl font-semibold">
                        26.3%
                      </h3>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="xl:col-span-4 space-y-6">

                {/* PIPELINE VALUE */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ↑ 2.3%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-5 h-5 text-blue-500" />

                    <span className="text-sm text-muted-foreground font-medium">
                      Pipeline Value
                    </span>
                  </div>

                  <h2 className="text-6xl font-semibold mb-3">
                    Rp. 2.4 M
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    target: Rp 600 Jt
                  </p>
                </div>

                {/* WIN RATE */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ↑ 12.5%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <Activity className="w-5 h-5 text-green-500" />

                    <span className="text-sm text-muted-foreground font-medium">
                      Win Rate
                    </span>
                  </div>

                  <h2 className="text-5xl font-semibold mb-6">
                    68.5%
                  </h2>

                  <div className="space-y-4">

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />

                        <span className="text-muted-foreground">
                          Opportunity Win
                        </span>
                      </div>

                      <span className="font-medium">
                        142
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500" />

                        <span className="text-muted-foreground">
                          Opportunity Lose
                        </span>
                      </div>

                      <span className="font-medium">
                        292
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {[
                {
                  title: 'Forecast MRC',
                  value: 'Rp 185 Jt',
                  desc: 'All MRC Pipeline Negotiation',
                },
                {
                  title: 'New Opportunity',
                  value: '42',
                  desc: 'Mei 2026 (Negotiation 90%)',
                },
                {
                  title: 'Discount Exposure',
                  value: 'Rp 185M',
                  desc: 'Dedicated & Broadband',
                },
                {
                  title: 'Total Opportunity',
                  value: '156',
                  desc: 'Semua opportunity bulan ini',
                },
                {
                  title: 'Total Leads',
                  value: '42',
                  desc: 'Semua prospect bulan ini',
                },
                {
                  title: 'Avg. Sales Cycle',
                  value: '42 Days',
                  desc: '-',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 relative"
                >

                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      ↑ 12.5%
                    </div>
                  </div>

                  <h4 className="text-sm text-muted-foreground font-medium mb-5">
                    {item.title}
                  </h4>

                  <h3 className="text-5xl font-semibold text-foreground mb-4">
                    {item.value}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}