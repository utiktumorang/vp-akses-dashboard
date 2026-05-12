import { useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  DollarSign,
  TrendingUp,
  Users,
  Wifi,
  RefreshCw,
  Percent,
  FileWarning,
  Ticket,
} from 'lucide-react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const churnData = [
  {
    month: 'Jan',
    current: 1.5,
    previous: 0.9,
  },
  {
    month: 'Feb',
    current: 1.1,
    previous: 0.7,
  },
  {
    month: 'Mar',
    current: 1.2,
    previous: 0.4,
  },
  {
    month: 'Apr',
    current: 1.8,
    previous: 1.0,
  },
];

const paymentData = [
  { name: 'Monthly', value: 35, color: '#f97316' },
  { name: 'Annual', value: 65, color: '#6b21a8' },
];

export default function RetentionDashboard() {
  const [activeTab, setActiveTab] = useState<
    'lagging' | 'leading'
  >('lagging');

  const [showComparison, setShowComparison] =
    useState(true);

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Dashboard - Retention Metric
            </h1>

            <p className="text-sm text-muted-foreground">
              Rekap performa retensi pelanggan •{' '}
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="flex gap-3">
            <select className="h-11 px-4 rounded-lg border border-border bg-background text-sm">
              <option>All Branch</option>
            </select>

            <select className="h-11 px-4 rounded-lg border border-border bg-background text-sm">
              <option>This Month</option>
            </select>
          </div>
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

              {/* LEFT */}
              <div className="xl:col-span-4 space-y-6">

                {/* NET MRC */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      ↑ 18.5%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-5 h-5 text-green-600" />

                    <span className="text-muted-foreground font-medium">
                      Net MRC Growth
                    </span>
                  </div>

                  <h2 className="text-6xl font-semibold mb-6">
                    Rp 65 Jt
                  </h2>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Net MRC
                      </span>

                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          Rp 190 Jt
                        </span>

                        <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          ↑ 10%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Churn MRC
                      </span>

                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          Rp 125 Jt
                        </span>

                        <div className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                          ↑ 8.3%
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* CHURN REVENUE */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      ↑ 8.3%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <DollarSign className="w-5 h-5 text-orange-500" />

                    <span className="text-muted-foreground font-medium">
                      Churn Revenue
                    </span>
                  </div>

                  <h2 className="text-5xl font-semibold mb-5">
                    Rp 125 Jt
                  </h2>

                  <p className="text-muted-foreground">
                    Bulan ini
                  </p>
                </div>

                {/* CUSTOMER LOSE */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      ↑ 11.1%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <Users className="w-5 h-5 text-violet-600" />

                    <span className="text-muted-foreground font-medium">
                      Customer Lose
                    </span>
                  </div>

                  <h2 className="text-5xl font-semibold mb-6">
                    20
                  </h2>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-600" />

                        <span className="text-muted-foreground">
                          Dedicated
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          8
                        </span>

                        <div className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                          ↑ 14.3%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-700" />

                        <span className="text-muted-foreground">
                          Broadband
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          12
                        </span>

                        <div className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                          ↓ 7.7%
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* CHART */}
              <div className="xl:col-span-8 bg-card border border-border rounded-lg p-6">

                <div className="flex items-start justify-between mb-8">

                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      Churn Rate (YTD)
                    </h3>

                    <p className="text-muted-foreground">
                      Year to Date sampai 24 April 2026
                    </p>
                  </div>

                  <div className="flex items-center gap-4">

                    <span className="font-medium">
                      Compare
                    </span>

                    <button
                      onClick={() =>
                        setShowComparison(!showComparison)
                      }
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        showComparison
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          showComparison
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={420}>
                  <LineChart data={churnData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e4e4e7"
                    />

                    <XAxis dataKey="month" />

                    <YAxis
                      tickFormatter={(value) =>
                        `${value}%`
                      }
                    />

                    <RechartsTooltip
                      formatter={(value: number) => [
                        `${value}%`,
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#fda4af"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                      }}
                    />

                    {showComparison && (
                      <Line
                        type="monotone"
                        dataKey="previous"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{
                          r: 4,
                        }}
                      />
                    )}

                  </LineChart>
                </ResponsiveContainer>

                <div className="flex justify-center gap-8 mt-4">

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 rounded bg-gray-400" />

                    <span className="text-sm text-muted-foreground">
                      2025 YTD
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 rounded bg-pink-300" />

                    <span className="text-sm text-muted-foreground">
                      2026 YTD
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* TOTAL CUSTOMER */}
              <div className="bg-card border border-border rounded-lg p-6 relative">

                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    ↑ 3.2%
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <Wifi className="w-5 h-5 text-blue-500" />

                  <span className="text-muted-foreground font-medium">
                    Total Customer Wireless
                  </span>
                </div>

                <h2 className="text-5xl font-semibold mb-5">
                  245
                </h2>

                <p className="text-muted-foreground">
                  Layanan Aktif
                </p>
              </div>

              {/* TERMINASI */}
              <div className="bg-card border border-border rounded-lg p-6 relative">

                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    ↑ 25.5%
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <RefreshCw className="w-5 h-5 text-indigo-500" />

                  <span className="text-muted-foreground font-medium">
                    Customer Wireless Termigrasi
                  </span>
                </div>

                <h2 className="text-5xl font-semibold mb-5">
                  28
                </h2>

                <p className="text-muted-foreground">
                  Bulan ini
                </p>
              </div>

              {/* MIGRASI */}
              <div className="bg-card border border-border rounded-lg p-6 relative">

                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    ↑ 5.6%
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <Percent className="w-5 h-5 text-green-500" />

                  <span className="text-muted-foreground font-medium">
                    Migrasi
                  </span>
                </div>

                <h2 className="text-5xl font-semibold mb-5">
                  11.4%
                </h2>

                <p className="text-muted-foreground">
                  28 dari 245 customer wireless
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* LEADING */}
        {/* ================================================= */}

        {activeTab === 'leading' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* LEFT */}
            <div className="xl:col-span-8 space-y-6">

              {/* CONTRACT */}
              <div className="bg-card border border-border rounded-lg p-6">

                <div className="flex items-center gap-3 mb-6">
                  <FileWarning className="w-6 h-6 text-blue-600" />

                  <h3 className="text-3xl font-semibold">
                    Contract Expiring
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  {[
                    {
                      title: '30 Hari',
                      value: '15',
                      badge: '↑ 25%',
                      badgeColor:
                        'bg-red-100 text-red-600',
                    },
                    {
                      title: '60 Hari',
                      value: '28',
                      badge: '↑ 12%',
                      badgeColor:
                        'bg-red-100 text-red-600',
                    },
                    {
                      title: '90 Hari',
                      value: '42',
                      badge: '↓ 4.5%',
                      badgeColor:
                        'bg-green-100 text-green-700',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg p-6 relative"
                    >

                      <div className="absolute top-4 right-4">
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${item.badgeColor}`}
                        >
                          {item.badge}
                        </div>
                      </div>

                      <p className="text-2xl text-muted-foreground mb-5">
                        {item.title}
                      </p>

                      <h2 className="text-5xl font-semibold">
                        {item.value}
                      </h2>
                    </div>
                  ))}

                </div>
              </div>

              {/* BOTTOM CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* TICKET */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      ↑ 12.5%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <Ticket className="w-5 h-5 text-indigo-500" />

                    <span className="text-muted-foreground font-medium">
                      Customer ≥2 Ticket dalam 1 Bulan
                    </span>
                  </div>

                  <h2 className="text-6xl font-semibold mb-5">
                    156
                  </h2>

                  <p className="text-muted-foreground">
                    Indikasi ketidakpuasan layanan
                  </p>
                </div>

                {/* USAGE */}
                <div className="bg-card border border-border rounded-lg p-6 relative">

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                      ↑ 18.3%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-5 h-5 text-red-500" />

                    <span className="text-muted-foreground font-medium">
                      Penurunan Usage Customer
                    </span>
                  </div>

                  <h2 className="text-6xl font-semibold mb-5">
                    237
                  </h2>

                  <p className="text-muted-foreground">
                    Usage &lt;500MB per bulan
                  </p>
                </div>

              </div>
            </div>

            {/* PIE CHART */}
            <div className="xl:col-span-4 bg-card border border-border rounded-lg p-6">

              <div className="flex items-center gap-2 mb-6">
                <Percent className="w-5 h-5 text-violet-600" />

                <span className="text-muted-foreground font-medium">
                  Customer Monthly Payment
                </span>
              </div>

              <div className="h-[420px]">

                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>

                    <Pie
                      data={paymentData}
                      dataKey="value"
                      innerRadius={0}
                      outerRadius={120}
                    >
                      {paymentData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>

                  </PieChart>
                </ResponsiveContainer>

              </div>

              <div className="flex justify-center gap-8 -mt-12">

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />

                  <span className="text-muted-foreground">
                    Monthly
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-700" />

                  <span className="text-muted-foreground">
                    Annual
                  </span>
                </div>

              </div>

              <div className="flex justify-center gap-10 mt-8">

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Monthly
                  </p>

                  <h3 className="text-5xl font-semibold text-orange-500">
                    35%
                  </h3>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Annual
                  </p>

                  <h3 className="text-5xl font-semibold text-violet-700">
                    65%
                  </h3>
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}