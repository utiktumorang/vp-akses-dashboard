import { useState } from 'react';

import {
  MessageCircle,
  MessageSquareWarning,
  CheckCheck,
  BadgeCheck,
  Repeat,
  ShieldAlert,
  ArrowUp,
} from 'lucide-react';

export default function ServiceQualityDashboard() {
  const [activeTab, setActiveTab] = useState<
    'lagging' | 'leading'
  >('lagging');

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Dashboard - Service Quality Metric
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[980px]">

            {/* TOTAL TIKET */}
            <div className="bg-card border border-border rounded-xl p-6 relative min-h-[170px]">

              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  8.3%
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-red-500" />

                <span className="text-lg text-muted-foreground font-medium">
                  Total Tiket
                </span>
              </div>

              <h2 className="text-6xl font-semibold mb-5">
                54
              </h2>

              <p className="text-muted-foreground text-lg">
                Bulan ini
              </p>
            </div>

            {/* TOTAL KOMPLAIN */}
            <div className="bg-card border border-border rounded-xl p-6 relative min-h-[170px]">

              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  3.2%
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <MessageSquareWarning className="w-5 h-5 text-blue-500" />

                <span className="text-lg text-muted-foreground font-medium">
                  Total Komplain Customer
                </span>
              </div>

              <h2 className="text-6xl font-semibold mb-5">
                48
              </h2>

              <p className="text-muted-foreground text-lg">
                Bulan ini
              </p>
            </div>

            {/* SOLVED CUSTOMER */}
            <div className="bg-card border border-border rounded-xl p-6 relative min-h-[170px]">

              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  8.4%
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <CheckCheck className="w-5 h-5 text-blue-500" />

                <span className="text-lg text-muted-foreground font-medium">
                  Solved Customers
                </span>
              </div>

              <h2 className="text-6xl font-semibold mb-5">
                69%
              </h2>

              <p className="text-muted-foreground text-lg">
                Bulan ini
              </p>
            </div>

            {/* TOTAL SOLVED */}
            <div className="bg-card border border-border rounded-xl p-6 relative min-h-[170px]">

              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  3.2%
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck className="w-5 h-5 text-blue-500" />

                <span className="text-lg text-muted-foreground font-medium">
                  Total Solved
                </span>
              </div>

              <h2 className="text-6xl font-semibold mb-5">
                33
              </h2>

              <p className="text-muted-foreground text-lg">
                Bulan ini
              </p>
            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* LEADING */}
        {/* ================================================= */}

        {activeTab === 'leading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[980px]">

            {/* REPEAT ISSUE */}
            <div className="bg-card border border-border rounded-xl p-6 relative min-h-[190px]">

              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  12.5%
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Repeat className="w-5 h-5 text-violet-500" />

                <span className="text-lg text-muted-foreground font-medium">
                  Repeat Issue Rate
                </span>
              </div>

              <h2 className="text-6xl font-semibold mb-5">
                18%
              </h2>

              <p className="text-muted-foreground text-lg">
                Compare bulan lalu
              </p>
            </div>

            {/* NETWORK INCIDENT */}
            <div className="bg-card border border-border rounded-xl p-6 relative min-h-[190px]">

              <div className="absolute top-6 right-6">
                <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  8.1%
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <ShieldAlert className="w-5 h-5 text-orange-500" />

                <span className="text-lg text-muted-foreground font-medium">
                  Network Incident
                </span>
              </div>

              <h2 className="text-6xl font-semibold mb-5">
                12
              </h2>

              <p className="text-muted-foreground text-lg">
                Bulan ini
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}