import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

interface MonthlyTarget {
  month: string;
  target: number;
}

export default function TargetRevenue() {
  const [annualTarget, setAnnualTarget] = useState<string>('');
  const [monthlyTargets, setMonthlyTargets] = useState<MonthlyTarget[]>([
    { month: 'Jan', target: 0 },
    { month: 'Feb', target: 0 },
    { month: 'Mar', target: 0 },
    { month: 'Apr', target: 0 },
    { month: 'Mei', target: 0 },
    { month: 'Jun', target: 0 },
    { month: 'Jul', target: 0 },
    { month: 'Agu', target: 0 },
    { month: 'Sep', target: 0 },
    { month: 'Okt', target: 0 },
    { month: 'Nov', target: 0 },
    { month: 'Des', target: 0 },
  ]);
  const [savedMessage, setSavedMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load saved targets from localStorage
    const savedAnnualTarget = localStorage.getItem('annualRevenueTarget');
    const savedMonthlyTargets = localStorage.getItem('monthlyRevenueTargets');

    if (savedAnnualTarget) {
      setAnnualTarget(savedAnnualTarget);
      setIsSaved(true);
    }

    if (savedMonthlyTargets) {
      setMonthlyTargets(JSON.parse(savedMonthlyTargets));
    }
  }, []);

  const handleAnnualTargetChange = (value: string) => {
    setAnnualTarget(value);
    setIsDirty(true);
    setIsSaved(false);

    // Auto-distribute to monthly targets evenly
    if (value) {
      const annual = parseFloat(value.replace(/\./g, ''));
      if (!isNaN(annual)) {
        const monthlyAmount = Math.round(annual / 12);
        const newMonthlyTargets = monthlyTargets.map(mt => ({
          ...mt,
          target: monthlyAmount
        }));
        setMonthlyTargets(newMonthlyTargets);
      }
    }
  };

  const handleMonthlyTargetChange = (index: number, value: string) => {
    const numValue = parseFloat(value.replace(/\./g, '')) || 0;
    const newMonthlyTargets = [...monthlyTargets];
    newMonthlyTargets[index].target = numValue;
    setMonthlyTargets(newMonthlyTargets);
    setIsDirty(true);
    setIsSaved(false);

    // Update annual total
    const total = newMonthlyTargets.reduce((sum, mt) => sum + mt.target, 0);
    setAnnualTarget(total.toString());
  };

  const handleSave = () => {
    localStorage.setItem('annualRevenueTarget', annualTarget);
    localStorage.setItem('monthlyRevenueTargets', JSON.stringify(monthlyTargets));
    localStorage.setItem('lastSavedTime', new Date().toISOString());
    setIsDirty(false);
    setIsSaved(true);
    setSavedMessage('Target revenue berhasil disimpan!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  const totalMonthly = monthlyTargets.reduce((sum, mt) => sum + mt.target, 0);

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard/growth"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-semibold text-foreground">
              Target Revenue Tahunan
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Tetapkan target revenue untuk tahun 2026
          </p>
        </div>

        {/* Status Messages */}
        {savedMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <Save className="w-5 h-5" />
            <span className="font-medium">{savedMessage}</span>
          </div>
        )}

        {isDirty && !savedMessage && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Ada perubahan yang belum disimpan</span>
          </div>
        )}

        {isSaved && !isDirty && !savedMessage && (
          <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Target tersimpan • Terakhir diubah: {localStorage.getItem('lastSavedTime') ? new Date(localStorage.getItem('lastSavedTime')!).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'baru saja'}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Annual Target Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Target Tahunan 2026
              </h2>

              <div className="mb-6">
                <label htmlFor="annualTarget" className="block text-sm font-medium text-foreground mb-2">
                  Total Target (Rupiah)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    Rp
                  </span>
                  <input
                    type="text"
                    id="annualTarget"
                    value={annualTarget ? formatNumber(parseFloat(annualTarget.replace(/\./g, ''))) : ''}
                    onChange={(e) => handleAnnualTargetChange(e.target.value.replace(/\./g, ''))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Target akan terbagi rata ke 12 bulan
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total dari Bulanan:</span>
                  <span className="text-sm font-semibold text-foreground">
                    Rp {formatNumber(totalMonthly)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Per Bulan (rata-rata):</span>
                  <span className="text-sm font-semibold text-foreground">
                    Rp {formatNumber(Math.round(totalMonthly / 12))}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!isDirty}
                className={`w-full py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
                  isDirty
                    ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-5 h-5" />
                {isDirty ? 'Simpan Target' : 'Tersimpan'}
              </button>

              {!isDirty && isSaved && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Ubah target untuk mengaktifkan tombol simpan
                </p>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Tips:</p>
                    <p className="text-xs text-blue-700">
                      Anda dapat menyesuaikan target per bulan secara manual di tabel sebelah kanan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Targets Table */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">
                  Breakdown Target Bulanan
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Sesuaikan target untuk setiap bulan
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-medium text-foreground">Bulan</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-foreground">Target (Rp)</th>
                      <th className="text-right py-3 px-6 text-sm font-medium text-foreground">% dari Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {monthlyTargets.map((mt, index) => (
                      <tr key={index} className="hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{mt.month}</td>
                        <td className="py-4 px-6">
                          <input
                            type="text"
                            value={mt.target ? formatNumber(mt.target) : ''}
                            onChange={(e) => handleMonthlyTargetChange(index, e.target.value.replace(/\./g, ''))}
                            className="w-full text-right px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            placeholder="0"
                          />
                        </td>
                        <td className="py-4 px-6 text-right text-muted-foreground">
                          {totalMonthly > 0 ? ((mt.target / totalMonthly) * 100).toFixed(1) : '0.0'}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50 border-t-2 border-border">
                    <tr>
                      <td className="py-3 px-6 font-semibold text-foreground">Total</td>
                      <td className="py-3 px-6 text-right font-semibold text-green-600">
                        Rp {formatNumber(totalMonthly)}
                      </td>
                      <td className="py-3 px-6 text-right font-semibold text-foreground">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
