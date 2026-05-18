import { useState } from 'react';

import {
  Activity,
  ArrowUp,
  DollarSign,
  TrendingUp,
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

const revenueData = [
  {
    month: 'Jan',
    current: 122000000,
    previous: 73000000,
  },
  {
    month: 'Feb',
    current: 90000000,
    previous: 56000000,
  },
  {
    month: 'Mar',
    current: 96000000,
    previous: 35000000,
  },
  {
    month: 'Apr',
    current: 142000000,
    previous: 80000000,
  },
];

export default function GrowthDashboard() {
  const [activeTab, setActiveTab] = useState<
    'lagging' | 'leading'
  >('lagging');

  // DEFAULT COMPARE ON
  const [showCompare, setShowCompare] =
    useState(true);

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">

          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Dashboard - Growth Metric
            </h1>

            <p className="text-sm text-muted-foreground">
              Rekap dari pertumbuhan penjualan •{' '}
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* FILTER */}
          <div className="flex gap-3">

            <select className="h-11 px-4 rounded-lg border border-border bg-background text-sm min-w-[160px]">
              <option>All Branch</option>
            </select>

            <select className="h-11 px-4 rounded-lg border border-border bg-background text-sm min-w-[160px]">
              <option>This Month</option>
            </select>

          </div>
        </div>

        {/* ================================================= */}
        {/* TABS */}
        {/* ================================================= */}

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
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
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
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
            )}
          </button>

        </div>

        {/* ================================================= */}
        {/* LAGGING */}
        {/* ================================================= */}

        {activeTab === 'lagging' && (
          <div className="space-y-6">

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

              {/* LEFT SIDE */}
              <div className="xl:col-span-4 space-y-6">

                {/* REVENUE ACHIEVEMENT */}
                <div className="bg-card border border-border rounded-xl p-6 relative min-h-[190px]">

                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      2.3%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-sky-500" />

                    <span className="text-lg text-muted-foreground font-medium">
                      Revenue Achievement
                    </span>
                  </div>

                  <h2 className="text-5xl font-semibold mb-5">
                    93.5%
                  </h2>

                  <p className="text-muted-foreground text-xl">
                    target: Rp 600M
                  </p>
                </div>

                {/* NEW CUSTOMER */}
                <div className="bg-card border border-border rounded-xl p-6 relative min-h-[190px]">

                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      12.5%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <DollarSign className="w-5 h-5 text-orange-500" />

                    <span className="text-lg text-muted-foreground font-medium">
                      New Customer
                    </span>
                  </div>

                  <h2 className="text-4xl font-semibold mb-5">
                    Rp 42 Jt
                  </h2>

                  <p className="text-muted-foreground text-lg">
                    Deal baru bulan ini
                  </p>
                </div>

                {/* FORECAST */}
                <div className="bg-card border border-border rounded-xl p-6 relative min-h-[190px]">

                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      8.2%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-violet-500" />

                    <span className="text-lg text-muted-foreground font-medium">
                      Forecast Revenue Next Month
                    </span>
                  </div>

                  <h2 className="text-4xl font-semibold mb-5">
                    Rp 185 Jt
                  </h2>

                  <p className="text-muted-foreground text-lg">
                    Mei 2026 (Negotiation 90%)
                  </p>
                </div>

              </div>

              {/* CHART */}
              <div className="xl:col-span-8 bg-card border border-border rounded-xl p-6">

                {/* HEADER */}
                <div className="flex items-start justify-between mb-8">

                  <div>
                    <h3 className="text-3xl font-semibold mb-2">
                      Revenue (YTD)
                    </h3>

                    <p className="text-muted-foreground text-lg">
                      Year to Date sampai 24 April 2026
                    </p>
                  </div>

                  {/* TOGGLE */}
                  <div className="flex items-center gap-4">

                    <span className="font-medium text-lg">
                      Compare
                    </span>

                    <button
                      onClick={() =>
                        setShowCompare(!showCompare)
                      }
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        showCompare
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          showCompare
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>

                  </div>
                </div>

                {/* CHART */}
                <ResponsiveContainer width="100%" height={420}>
                  <LineChart data={revenueData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 14,
                      }}
                    />

                    <YAxis
                      tick={{
                        fontSize: 14,
                      }}
                      tickFormatter={(value) =>
                        `${value / 1000000}M`
                      }
                    />

                    <RechartsTooltip
                      formatter={(value: number) => [
                        `Rp ${(value / 1000000).toFixed(
                          0
                        )}M`,
                      ]}
                    />

                    {/* CURRENT */}
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                      }}
                    />

                    {/* COMPARE */}
                    {showCompare && (
                      <Line
                        type="monotone"
                        dataKey="previous"
                        stroke="#a1a1aa"
                        strokeWidth={2}
                        strokeDasharray="6 6"
                        dot={{
                          r: 4,
                        }}
                      />
                    )}

                  </LineChart>
                </ResponsiveContainer>

                {/* LEGEND */}
                {showCompare && (
                  <div className="flex justify-center gap-8 mt-5">

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-[3px] rounded-full bg-zinc-400" />

                      <span className="text-sm text-muted-foreground">
                        2025 YTD
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-[3px] rounded-full bg-green-500" />

                      <span className="text-sm text-muted-foreground">
                        2026 YTD
                      </span>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* ================================================= */}
            {/* BOTTOM */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* NEW MRC */}
              <div className="bg-card border border-border rounded-xl p-6 relative min-h-[240px]">

                <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    15.2%
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-5 h-5 text-green-500" />

                  <span className="text-lg text-muted-foreground font-medium">
                    New MRC
                  </span>
                </div>

                <h2 className="text-4xl font-semibold mb-6">
                  Rp 99.8 Jt
                </h2>

                <p className="text-muted-foreground text-lg mb-6">
                  April 2026
                </p>

                <div className="space-y-4">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-green-500" />

                      <span className="text-muted-foreground text-lg">
                        Paid
                      </span>
                    </div>

                    <span className="font-medium text-lg">
                      Rp. 87.5 Jt
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-yellow-500" />

                      <span className="text-muted-foreground text-lg">
                        Unpaid
                      </span>
                    </div>

                    <span className="font-medium text-lg">
                      Rp. 12.3 Jt
                    </span>
                  </div>

                </div>
              </div>

              {/* TOTAL MRC */}
              <div className="bg-card border border-border rounded-xl p-6 relative min-h-[240px]">

                <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    15.2%
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="w-5 h-5 text-green-500" />

                  <span className="text-lg text-muted-foreground font-medium">
                    Total MRC (YTD)
                  </span>
                </div>

                <h2 className="text-4xl font-semibold mb-8">
                  Rp 99.8 Jt
                </h2>

                <p className="text-muted-foreground text-lg mt-16">
                  Year to Date sampai 24 April 2026
                </p>
              </div>

              {/* ARPU */}
              <div className="bg-card border border-border rounded-xl p-6 relative min-h-[240px]">

                <div className="absolute top-6 right-6">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                    <ArrowUp className="w-3 h-3" />
                    2.8%
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-violet-500" />

                  <span className="text-lg text-muted-foreground font-medium">
                    ARPU
                  </span>
                </div>

                <h2 className="text-4xl font-semibold mb-6">
                  Rp 3.9 Jt
                </h2>

                <p className="text-muted-foreground text-lg mb-6">
                  per pelanggan/ bulan
                </p>

                <div className="space-y-4">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-blue-600" />

                      <span className="text-muted-foreground text-lg">
                        Dedicated
                      </span>
                    </div>

                    <span className="font-medium text-lg">
                      Rp. 8.4 Jt
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-green-700" />

                      <span className="text-muted-foreground text-lg">
                        Broadband
                      </span>
                    </div>

                    <span className="font-medium text-lg">
                      Rp. 2.7 Jt
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* LEADING */}
        {/* ================================================= */}

        {activeTab === 'leading' && (
  <div className="space-y-6">

    {/* TOP */}
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

      {/* PIPELINE */}
      <div className="xl:col-span-8 bg-card border border-border rounded-xl p-6 relative">

        <div className="absolute top-6 right-6">
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            ↑ 0%
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-foreground mb-10">
          Pipeline by Stage (Rp)
        </h3>

        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* FUNNEL */}
          <div className="flex-1 w-full flex flex-col items-center">

            <div className="w-full flex flex-col items-center gap-3">

              <div
                className="h-16 bg-blue-500 text-white flex items-center justify-center font-semibold text-lg"
                style={{
                  width: '100%',
                  clipPath:
                    'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
                }}
              >
                Rp 850M
              </div>

              <div
                className="h-16 bg-cyan-500 text-white flex items-center justify-center font-semibold text-lg"
                style={{
                  width: '82%',
                  clipPath:
                    'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
                }}
              >
                Rp 920M
              </div>

              <div
                className="h-16 bg-emerald-500 text-white flex items-center justify-center font-semibold text-lg"
                style={{
                  width: '64%',
                  clipPath:
                    'polygon(0 0, 100% 0, 92% 100%, 8% 100%)',
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
        <div className="bg-card border border-border rounded-xl p-6 relative">

          <div className="absolute top-6 right-6">
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              ↑ 2.3%
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-5 h-5 text-blue-500" />

            <span className="text-lg text-muted-foreground font-medium">
              Pipeline Value
            </span>
          </div>

          <h2 className="text-5xl font-semibold mb-3">
            Rp. 2.4 M
          </h2>

          <p className="text-muted-foreground text-lg">
            target: Rp 600 Jt
          </p>
        </div>

        {/* WIN RATE */}
        <div className="bg-card border border-border rounded-xl p-6 relative">

          <div className="absolute top-6 right-6">
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              ↑ 12.5%
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-green-500" />

            <span className="text-lg text-muted-foreground font-medium">
              Win Rate
            </span>
          </div>

          <h2 className="text-4xl font-semibold mb-6">
            68.5%
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between">
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

            <div className="flex items-center justify-between">
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
          className="bg-card border border-border rounded-xl p-6 relative min-h-[220px]"
        >

          <div className="absolute top-6 right-6">
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              ↑ 12.5%
            </div>
          </div>

          <h4 className="text-lg text-muted-foreground font-medium mb-5">
            {item.title}
          </h4>

          <h3 className="text-4xl font-semibold text-foreground mb-4">
            {item.value}
          </h3>

          <p className="text-lg text-muted-foreground">
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