import { TrendingUp, TrendingDown, Users, Activity, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';
import { useState } from 'react';
import { MetricCard } from '../components/MetricCard';
import { SalesTeamDetailCard } from '../components/SalesTeamDetailCard';
import { ChartCard } from '../components/ChartCard';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 125000000 },
  { month: 'Feb', revenue: 138000000 },
  { month: 'Mar', revenue: 142000000 },
  { month: 'Apr', revenue: 156000000 },
  { month: 'Mei', revenue: 168000000 },
  { month: 'Jun', revenue: 175000000 },
  { month: 'Jul', revenue: 189000000 },
  { month: 'Agu', revenue: 195000000 },
  { month: 'Sep', revenue: 205000000 },
  { month: 'Okt', revenue: 198000000 },
  { month: 'Nov', revenue: 212000000 },
  { month: 'Des', revenue: 225000000 },
];

const churnData = [
  { month: 'Jan', rate: 2.8 },
  { month: 'Feb', rate: 2.5 },
  { month: 'Mar', rate: 3.1 },
  { month: 'Apr', rate: 2.2 },
  { month: 'Mei', rate: 1.9 },
  { month: 'Jun', rate: 2.0 },
  { month: 'Jul', rate: 1.8 },
  { month: 'Agu', rate: 2.3 },
  { month: 'Sep', rate: 2.1 },
  { month: 'Okt', rate: 1.7 },
  { month: 'Nov', rate: 1.5 },
  { month: 'Des', rate: 1.6 },
];

const salesTeams = [
  {
    name: 'Tim SM 1',
    achievement: 94.5,
    paid: 87,
    unpaid: 7.5,
    leads: 342,
    opportunities: 225,
    conversion: 28.5,
    members: [
      { name: 'Budi Santoso', role: 'Sales Manager', achievement: 98.5, leads: 85, opportunities: 58, won: 24 },
      { name: 'Siti Aminah', role: 'Sales', achievement: 92.3, leads: 68, opportunities: 44, won: 18 },
      { name: 'Ahmad Hidayat', role: 'Sales', achievement: 96.1, leads: 72, opportunities: 48, won: 21 },
      { name: 'Dewi Lestari', role: 'Sales', achievement: 91.8, leads: 65, opportunities: 42, won: 17 },
      { name: 'Eko Prasetyo', role: 'Sales', achievement: 93.7, leads: 52, opportunities: 33, won: 16 },
    ]
  },
  {
    name: 'Tim SM 2',
    achievement: 102.3,
    paid: 95,
    unpaid: 7.3,
    leads: 298,
    opportunities: 198,
    conversion: 31.2,
    members: [
      { name: 'Rina Wijaya', role: 'Sales Manager', achievement: 105.2, leads: 75, opportunities: 52, won: 26 },
      { name: 'Joko Widodo', role: 'Sales', achievement: 101.5, leads: 62, opportunities: 41, won: 20 },
      { name: 'Maya Sari', role: 'Sales', achievement: 103.8, leads: 58, opportunities: 38, won: 19 },
      { name: 'Rudi Hartono', role: 'Sales', achievement: 99.2, leads: 55, opportunities: 36, won: 17 },
      { name: 'Fitri Handayani', role: 'Sales', achievement: 102.1, leads: 48, opportunities: 31, won: 15 },
    ]
  },
  {
    name: 'Tim SM 3',
    achievement: 88.7,
    paid: 81,
    unpaid: 7.7,
    leads: 256,
    opportunities: 165,
    conversion: 26.8,
    members: [
      { name: 'Bambang Susilo', role: 'Sales Manager', achievement: 91.5, leads: 68, opportunities: 45, won: 19 },
      { name: 'Linda Kusuma', role: 'Sales', achievement: 87.3, leads: 52, opportunities: 33, won: 14 },
      { name: 'Agus Salim', role: 'Sales', achievement: 89.1, leads: 48, opportunities: 31, won: 13 },
      { name: 'Nina Puspita', role: 'Sales', achievement: 86.8, leads: 45, opportunities: 29, won: 12 },
      { name: 'Hendra Gunawan', role: 'Sales', achievement: 88.5, leads: 43, opportunities: 27, won: 11 },
    ]
  },
  {
    name: 'Tim SM 4',
    achievement: 97.8,
    paid: 89,
    unpaid: 8.8,
    leads: 189,
    opportunities: 125,
    conversion: 29.4,
    members: [
      { name: 'Yuni Astuti', role: 'Sales Manager', achievement: 99.8, leads: 52, opportunities: 36, won: 17 },
      { name: 'Dedi Kurniawan', role: 'Sales', achievement: 96.5, leads: 42, opportunities: 28, won: 13 },
      { name: 'Indah Permata', role: 'Sales', achievement: 98.2, leads: 38, opportunities: 25, won: 12 },
      { name: 'Farhan Maulana', role: 'Sales', achievement: 95.7, leads: 35, opportunities: 22, won: 10 },
      { name: 'Sri Wahyuni', role: 'Sales', achievement: 97.1, leads: 22, opportunities: 14, won: 7 },
    ]
  },
  {
    name: 'Tim SM 5',
    achievement: 91.2,
    paid: 84,
    unpaid: 7.2,
    leads: 278,
    opportunities: 182,
    conversion: 27.5,
    members: [
      { name: 'Arief Rahman', role: 'Sales Manager', achievement: 94.3, leads: 71, opportunities: 48, won: 21 },
      { name: 'Sari Nurjanah', role: 'Sales', achievement: 89.8, leads: 58, opportunities: 38, won: 16 },
      { name: 'Teguh Santoso', role: 'Sales', achievement: 92.5, leads: 54, opportunities: 35, won: 14 },
      { name: 'Lina Marlina', role: 'Sales', achievement: 88.7, leads: 50, opportunities: 32, won: 13 },
      { name: 'Fahmi Hakim', role: 'Sales', achievement: 90.6, leads: 45, opportunities: 29, won: 12 },
    ]
  },
  {
    name: 'Tim SM 6',
    achievement: 105.5,
    paid: 96,
    unpaid: 9.5,
    leads: 315,
    opportunities: 215,
    conversion: 32.8,
    members: [
      { name: 'Ratna Dewi', role: 'Sales Manager', achievement: 108.2, leads: 82, opportunities: 58, won: 28 },
      { name: 'Andri Wijaya', role: 'Sales', achievement: 104.5, leads: 68, opportunities: 46, won: 22 },
      { name: 'Putri Ayu', role: 'Sales', achievement: 106.1, leads: 62, opportunities: 42, won: 20 },
      { name: 'Rizki Pratama', role: 'Sales', achievement: 103.8, leads: 58, opportunities: 39, won: 19 },
      { name: 'Wulan Sari', role: 'Sales', achievement: 105.0, leads: 45, opportunities: 30, won: 14 },
    ]
  },
];

// Activity data with different time ranges
const activityDataLast7Days = [
  { day: '10 Apr', plan: 45, done: 38 },
  { day: '11 Apr', plan: 52, done: 45 },
  { day: '12 Apr', plan: 48, done: 42 },
  { day: '13 Apr', plan: 55, done: 48 },
  { day: '14 Apr', plan: 50, done: 44 },
  { day: '15 Apr', plan: 58, done: 52 },
  { day: '16 Apr', plan: 53, done: 46 },
];

const activityDataLast30Days = [
  { day: 'Minggu 1', plan: 235, done: 198 },
  { day: 'Minggu 2', plan: 248, done: 215 },
  { day: 'Minggu 3', plan: 252, done: 228 },
  { day: 'Minggu 4', plan: 261, done: 236 },
];

const activityDataThisWeek = [
  { day: 'Sen', plan: 55, done: 48 },
  { day: 'Sel', plan: 50, done: 44 },
  { day: 'Rab', plan: 58, done: 52 },
  { day: 'Kam', plan: 53, done: 46 },
  { day: 'Jum', plan: 52, done: 45 },
  { day: 'Sab', plan: 35, done: 28 },
  { day: 'Min', plan: 30, done: 22 },
];

const activityDataThisMonth = [
  { day: '1-7 Apr', plan: 325, done: 278 },
  { day: '8-14 Apr', plan: 342, done: 298 },
  { day: '15-16 Apr', plan: 111, done: 98 },
];

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days' | 'thisWeek' | 'thisMonth'>('thisWeek');

  const getActivityData = () => {
    switch (timeFilter) {
      case '7days':
        return activityDataLast7Days;
      case '30days':
        return activityDataLast30Days;
      case 'thisWeek':
        return activityDataThisWeek;
      case 'thisMonth':
        return activityDataThisMonth;
      default:
        return activityDataThisWeek;
    }
  };

  const activityData = getActivityData();

  // Calculate total activities
  const totalPlan = activityData.reduce((sum, item) => sum + item.plan, 0);
  const totalDone = activityData.reduce((sum, item) => sum + item.done, 0);
  const completionRate = totalPlan > 0 ? ((totalDone / totalPlan) * 100).toFixed(1) : '0';

  // Calculate total opportunities and leads
  const totalOpportunities = salesTeams.reduce((sum, team) => sum + team.opportunities, 0);
  const totalLeads = salesTeams.reduce((sum, team) => sum + team.leads, 0);
  const leadToOppRate = totalLeads > 0 ? ((totalOpportunities / totalLeads) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Dashboard VP Access Business
          </h1>
          <p className="text-sm text-muted-foreground">
            Dashboard VP Sales • {new Date().toLocaleDateString('id-ID', {
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
            title="Aktivitas Terlaksana"
            value={totalDone.toString()}
            subtitle={`dari ${totalPlan} plan (${completionRate}%)`}
            change="+8.3%"
            trend="up"
            icon={Activity}
            color="green"
          />
          <MetricCard
            title="Migrasi Wireless → Fiber"
            value="487"
            subtitle="bulan ini"
            change="+23.7%"
            trend="up"
            icon={Zap}
            color="yellow"
          />
          <MetricCard
            title="Revenue Bulanan"
            value="Rp 225M"
            subtitle="Desember 2025"
            change="+6.1%"
            trend="up"
            icon={DollarSign}
            color="purple"
          />
          <MetricCard
            title="Total Opportunity"
            value={totalOpportunities.toString()}
            subtitle={`dari ${totalLeads} leads (${leadToOppRate}%)`}
            change="+12.5%"
            trend="up"
            icon={Users}
            color="cyan"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="relative">
            <ChartCard title="Revenue per Bulan" subtitle="dalam jutaan Rupiah">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradientDashboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis
                    dataKey="month"
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e4e4e7',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`Rp ${(value / 1000000).toFixed(0)}M`, 'Revenue']}
                  />
                  <Area
                    key="area-revenue-main"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fill="url(#revenueGradientDashboard)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            <Link
              to="/revenue"
              className="absolute top-4 right-4 flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <ChartCard title="Churn Rate per Bulan" subtitle="persentase pelanggan keluar">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={churnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis
                    dataKey="month"
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#71717a"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e4e4e7',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Churn Rate']}
                  />
                  <Line
                    key="line-churn-main"
                    type="monotone"
                    dataKey="rate"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
            <Link
              to="/churn-rate"
              className="absolute top-4 right-4 flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Aktivitas Sales
                </h3>
                <p className="text-sm text-muted-foreground">
                  Perbandingan plan vs realisasi
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeFilter('7days')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    timeFilter === '7days'
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  7 Hari
                </button>
                <button
                  onClick={() => setTimeFilter('30days')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    timeFilter === '30days'
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  30 Hari
                </button>
                <button
                  onClick={() => setTimeFilter('thisWeek')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    timeFilter === 'thisWeek'
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Minggu Ini
                </button>
                <button
                  onClick={() => setTimeFilter('thisMonth')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    timeFilter === 'thisMonth'
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Bulan Ini
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis
                  dataKey="day"
                  stroke="#71717a"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#71717a"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e4e4e7',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => {
                    const label = name === 'plan' ? 'Aktivitas Direncanakan' : 'Aktivitas Terlaksana';
                    return [value, label];
                  }}
                />
                <Bar key="bar-plan-main" dataKey="plan" fill="#94a3b8" name="plan" radius={[4, 4, 0, 0]} />
                <Bar key="bar-done-main" dataKey="done" fill="#16a34a" name="done" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#94a3b8]"></div>
                <span className="text-sm font-medium text-foreground">Aktivitas Direncanakan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#16a34a]"></div>
                <span className="text-sm font-medium text-foreground">Aktivitas Terlaksana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity & Conversion */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Sales Funnel: Lead → Opportunity → Won
          </h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium text-foreground">Tim</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Total Leads</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Opportunities</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Lead → Opp</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Deals Won</th>
                    <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Win Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {salesTeams.map((team, index) => {
                    const dealsWon = Math.round(team.opportunities * (team.conversion / 100));
                    const leadToOpp = ((team.opportunities / team.leads) * 100).toFixed(1);
                    return (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{team.name}</td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-muted-foreground">{team.leads}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold text-foreground">{team.opportunities}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="text-sm text-blue-600 font-medium">{leadToOpp}%</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="font-semibold text-green-600">{dealsWon}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded font-semibold text-sm">
                            <TrendingUp className="w-3 h-3" />
                            {team.conversion}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-muted/50 border-t-2 border-border">
                  <tr>
                    <td className="py-3 px-6 font-semibold text-foreground">Total</td>
                    <td className="py-3 px-6 text-right font-semibold text-foreground">
                      {salesTeams.reduce((sum, team) => sum + team.leads, 0)}
                    </td>
                    <td className="py-3 px-6 text-right font-semibold text-foreground">
                      {salesTeams.reduce((sum, team) => sum + team.opportunities, 0)}
                    </td>
                    <td className="py-3 px-6 text-right font-semibold text-foreground">
                      {((salesTeams.reduce((sum, team) => sum + team.opportunities, 0) / salesTeams.reduce((sum, team) => sum + team.leads, 0)) * 100).toFixed(1)}%
                    </td>
                    <td className="py-3 px-6 text-right font-semibold text-green-600">
                      {salesTeams.reduce((sum, team) => sum + Math.round(team.opportunities * (team.conversion / 100)), 0)}
                    </td>
                    <td className="py-3 px-6 text-right font-semibold text-foreground">
                      {(salesTeams.reduce((sum, team) => sum + team.conversion, 0) / salesTeams.length).toFixed(1)}%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Sales Team Performance */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Pencapaian Tim Sales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesTeams.map((team) => (
              <SalesTeamDetailCard key={team.name} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}