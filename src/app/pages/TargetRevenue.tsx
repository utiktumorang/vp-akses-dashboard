import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  RefreshCcw,
  RotateCcw,
  Lock,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";

export default function TargetRevenue() {
  const [pageState, setPageState] = useState<
    "draft-unready" | "draft-ready" | "confirm-lock" | "locked"
  >("draft-unready");

  const [distributionMode, setDistributionMode] = useState<
    "equal" | "manual"
  >("manual");

  const [openQuarter, setOpenQuarter] = useState({
    Q1: true,
    Q2: true,
    Q3: false,
    Q4: false,
  });

  const [totalTarget, setTotalTarget] = useState(1000000000);

  const [monthlyData, setMonthlyData] = useState([
    {
      quarter: "Q1",
      items: [
        { month: "Januari", revenue: 120000000, compare: "+3%" },
        { month: "Februari", revenue: 55000000, compare: "-1%" },
        { month: "Maret", revenue: 75000000, compare: "-2%" },
      ],
    },
    {
      quarter: "Q2",
      items: [
        { month: "April", revenue: 65000000, compare: "-2%" },
        { month: "Mei", revenue: 85000000, compare: "-2%" },
        { month: "Juni", revenue: 150000000, compare: "+4%" },
      ],
    },
    {
      quarter: "Q3",
      items: [
        { month: "Juli", revenue: 80000000, compare: "+2%" },
        { month: "Agustus", revenue: 90000000, compare: "+1%" },
        { month: "September", revenue: 70000000, compare: "-1%" },
      ],
    },
    {
      quarter: "Q4",
      items: [
        { month: "Oktober", revenue: 95000000, compare: "+4%" },
        { month: "November", revenue: 110000000, compare: "+6%" },
        { month: "Desember", revenue: 140000000, compare: "+8%" },
      ],
    },
  ]);

  const isLocked = pageState === "locked";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const parseCurrency = (value: string) => {
    return Number(value.replace(/\D/g, ""));
  };

  const monthlyAllocated = monthlyData.reduce((acc, quarter) => {
    return (
      acc +
      quarter.items.reduce((sum, item) => {
        return sum + item.revenue;
      }, 0)
    );
  }, 0);

  const allocationPercent = Math.min(
    100,
    Math.round((monthlyAllocated / totalTarget) * 100)
  );

  const currentState =
    allocationPercent >= 100 ? "ready" : "unready";

  const handleTotalTargetChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseCurrency(e.target.value);

    setTotalTarget(value);

    if (distributionMode === "equal") {
      const equalAmount = Math.round(value / 12);

      setMonthlyData((prev) =>
        prev.map((quarter) => ({
          ...quarter,
          items: quarter.items.map((item) => ({
            ...item,
            revenue: equalAmount,
          })),
        }))
      );
    }
  };

  const handleDistributionMode = (
    mode: "equal" | "manual"
  ) => {
    setDistributionMode(mode);

    if (mode === "equal") {
      const equalAmount = Math.round(totalTarget / 12);

      setMonthlyData((prev) =>
        prev.map((quarter) => ({
          ...quarter,
          items: quarter.items.map((item) => ({
            ...item,
            revenue: equalAmount,
          })),
        }))
      );
    }
  };

  const handleMonthlyRevenueChange = (
    quarterIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const parsed = parseCurrency(value);

    setMonthlyData((prev) => {
      const updated = [...prev];

      updated[quarterIndex].items[itemIndex].revenue =
        parsed;

      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">

        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[44px] leading-[48px] font-semibold tracking-[-1px] text-[#111827]">
              Target Revenue Tahunan
            </h1>

            <div className="flex items-center gap-3 mt-3 text-[15px] text-gray-500">
              <span>Baseline untuk performa dashboard</span>
              <span>•</span>
              <span>Senin, 4 Mei 2026</span>
            </div>
          </div>

          <div className="flex items-end gap-4">

            {/* YEAR */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Tahun
              </label>

              <button className="h-12 px-5 rounded-lg border border-gray-200 bg-white flex items-center gap-8 shadow-sm">
                <span className="text-[16px] font-medium">
                  2026
                </span>

                <ChevronDown size={18} />
              </button>
            </div>

            {/* STATUS */}
            <div className="bg-white border border-gray-200 rounded-lg px-5 h-12 flex items-center shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Status:
                </span>

                {isLocked ? (
                  <div className="h-7 px-3 rounded-full bg-green-100 text-green-700 flex items-center gap-2 text-sm font-medium">
                    <Lock size={12} />
                    Terkunci
                  </div>
                ) : (
                  <div className="h-7 px-3 rounded-full bg-gray-100 text-gray-600 flex items-center text-sm font-medium">
                    Draft
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-12 gap-6 mb-6">

          {/* LEFT CARD */}
          <div className="col-span-7 bg-white rounded-lg border border-gray-200 p-7 shadow-sm">

            <h2 className="text-[28px] font-semibold mb-7">
              Target Revenue Tahunan
            </h2>

            {/* TARGET INPUT */}
            <div className="mb-7">
              <label className="block text-[14px] font-medium mb-3 text-gray-700">
                Total Target Revenue (Rupiah)
              </label>

              <input
                type="text"
                disabled={isLocked}
                value={formatCurrency(totalTarget)}
                onChange={handleTotalTargetChange}
                className={`
                  w-full
                  h-[72px]
                  rounded-lg
                  border
                  px-6
                  text-[32px]
                  tracking-[-1px]
                  font-semibold
                  ${
                    isLocked
                      ? "bg-gray-50 border-gray-200 text-gray-500"
                      : "bg-white border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none"
                  }
                `}
              />

              <p className="text-sm text-gray-400 mt-2">
                Isi target tahunan untuk revenue tahun ini
              </p>
            </div>

            {/* DISTRIBUTION */}
            <div className="mb-7">
              <h3 className="text-[16px] font-semibold mb-4">
                Metode Distribusi Bulanan
              </h3>

              <div className="flex items-center gap-8">

                <label className="flex items-center gap-3 text-[14px]">
                  <input
                    type="radio"
                    checked={distributionMode === "equal"}
                    onChange={() =>
                      handleDistributionMode("equal")
                    }
                    disabled={isLocked}
                  />

                  Sama Rata per bulan
                </label>

                <label className="flex items-center gap-3 text-[14px]">
                  <input
                    type="radio"
                    checked={distributionMode === "manual"}
                    onChange={() =>
                      handleDistributionMode("manual")
                    }
                    disabled={isLocked}
                  />

                  Perencanaan Manual
                </label>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">

              <div className="h-[64px] px-5 flex items-center justify-between border-b">
                <span className="text-[14px] text-gray-600">
                  Rata-rata per bulan
                </span>

                <span className="text-[15px] font-semibold">
                  Rp.{" "}
                  {formatCurrency(
                    Math.round(totalTarget / 12)
                  )}
                </span>
              </div>

              <div className="h-[64px] px-5 flex items-center justify-between border-b">
                <span className="text-[14px] text-gray-600">
                  Kenaikan dari tahun lalu
                </span>

                <span className="text-[15px] font-semibold">
                  +9%
                </span>
              </div>

              <div className="h-[64px] px-5 flex items-center justify-between">
                <span className="text-[14px] text-gray-600">
                  Kebutuhan Pencapaian per bulan
                </span>

                <span className="text-[15px] font-semibold">
                  {(100 / 12).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="col-span-5 bg-white rounded-lg border border-gray-200 p-7 shadow-sm">

            <h2 className="text-[28px] font-semibold mb-7">
              Informasi Target
            </h2>

            {/* ALERT */}
            <div
              className={`
                rounded-lg
                border
                px-4
                py-3
                flex
                items-center
                gap-3
                mb-7
                ${
                  currentState === "unready"
                    ? "bg-orange-50 border-orange-200 text-orange-600"
                    : "bg-green-50 border-green-200 text-green-700"
                }
              `}
            >
              {currentState === "unready" ? (
                <AlertTriangle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}

              <span className="text-[14px] font-medium">
                {currentState === "unready"
                  ? "Target Revenue belum teralokasi seluruhnya."
                  : "Target Revenue sudah teralokasi seluruhnya."}
              </span>
            </div>

            {/* DONUT + INFO */}
            <div className="flex items-center gap-8 mb-7">

              {/* DONUT */}
              <div className="relative w-[170px] h-[170px]">

                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    d="M18 2.5
                    a 15.5 15.5 0 0 1 0 31
                    a 15.5 15.5 0 0 1 0 -31"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />

                  <path
                    d="M18 2.5
                    a 15.5 15.5 0 0 1 0 31
                    a 15.5 15.5 0 0 1 0 -31"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="3"
                    strokeDasharray={`${allocationPercent}, 100`}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-[38px] font-bold">
                    {allocationPercent}%
                  </h3>

                  <p className="text-gray-500 text-[13px]">
                    Teralokasikan
                  </p>
                </div>
              </div>

              {/* INFO */}
              <div className="space-y-6">

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Total Teralokasikan
                  </p>

                  <h3 className="text-[22px] font-semibold">
                    Rp.{" "}
                    {formatCurrency(monthlyAllocated)}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Sisa yang belum teralokasi
                  </p>

                  <h3 className="text-[22px] font-semibold text-red-500">
                    Rp.{" "}
                    {formatCurrency(
                      totalTarget - monthlyAllocated
                    )}
                  </h3>
                </div>
              </div>
            </div>

            {/* LAST UPDATE */}
            <div className="rounded-lg border border-gray-200 px-5 py-4 flex items-center justify-between">

              <div className="space-y-3 text-sm text-gray-500">
                <p>Terakhir diperbarui</p>
                <p>Diperbarui oleh</p>
              </div>

              <div className="space-y-3 text-right text-[14px]">
                <p>
                  Kamis, 7 Mei 2026 - 19:54
                </p>

                <p>
                  Ali Putera (VP Akses Bisnis)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-lg border border-gray-200 p-7 shadow-sm">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">

            <h2 className="text-[28px] font-semibold">
              Target Per Bulan
            </h2>

            {!isLocked && (
              <div className="flex items-center gap-3">

                <button
                  onClick={() =>
                    handleDistributionMode("equal")
                  }
                  className="h-11 px-5 rounded-lg border border-gray-200 bg-white flex items-center gap-2 text-[14px] font-medium"
                >
                  <RefreshCcw size={16} />
                  Isi Sama Rata
                </button>

                <button className="h-11 px-5 rounded-lg border border-gray-200 bg-white flex items-center gap-2 text-[14px] font-medium">
                  <RotateCcw size={16} />
                  Atur Ulang
                </button>
              </div>
            )}
          </div>

          {/* TABLE */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr className="h-[56px] text-left text-sm text-gray-500">
                  <th className="px-5">
                    Quarter
                  </th>

                  <th className="px-5">
                    Target Revenue (Rp)
                  </th>

                  <th className="px-5">
                    Alokasi (%)
                  </th>

                  <th className="px-5">
                    Dengan 2025
                  </th>
                </tr>
              </thead>

              <tbody>
                {monthlyData.map(
                  (quarter, quarterIndex) => (
                    <React.Fragment
                      key={quarter.quarter}
                    >

                      {/* QUARTER */}
                      <tr className="border-t border-gray-100 bg-gray-50/50">
                        <td className="px-5 h-[58px]">

                          <button
                            onClick={() =>
                              setOpenQuarter((prev) => ({
                                ...prev,
                                [quarter.quarter]:
                                  !prev[
                                    quarter.quarter as keyof typeof prev
                                  ],
                              }))
                            }
                            className="flex items-center gap-3 font-semibold text-[14px]"
                          >
                            <div
                              className={`
                                transition-transform duration-300
                                ${
                                  openQuarter[
                                    quarter.quarter as keyof typeof openQuarter
                                  ]
                                    ? "rotate-90"
                                    : ""
                                }
                              `}
                            >
                              <ChevronRight size={15} />
                            </div>

                            {quarter.quarter}
                          </button>
                        </td>

                        <td colSpan={3} />
                      </tr>

                      {/* ITEMS */}
                      {openQuarter[
                        quarter.quarter as keyof typeof openQuarter
                      ] &&
                        quarter.items.map(
                          (item, itemIndex) => (
                            <tr
                              key={item.month}
                              className="border-t border-gray-100"
                            >

                              <td className="px-5 h-[64px] text-[14px] text-gray-700">
                                {item.month}
                              </td>

                              <td className="px-5">
                                <input
                                  disabled={
                                    isLocked ||
                                    distributionMode === "equal"
                                  }
                                  value={formatCurrency(
                                    item.revenue
                                  )}
                                  onChange={(e) =>
                                    handleMonthlyRevenueChange(
                                      quarterIndex,
                                      itemIndex,
                                      e.target.value
                                    )
                                  }
                                  className={`
                                    w-[220px]
                                    h-10
                                    rounded-lg
                                    border
                                    px-4
                                    text-[14px]
                                    ${
                                      isLocked ||
                                      distributionMode === "equal"
                                        ? "bg-gray-50 border-gray-200 text-gray-500"
                                        : "bg-white border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none"
                                    }
                                  `}
                                />
                              </td>

                              <td className="px-5 text-[14px]">
                                {(
                                  (item.revenue /
                                    totalTarget) *
                                  100
                                ).toFixed(1)}
                                %
                              </td>

                              <td
                                className={`
                                  px-5
                                  text-[14px]
                                  font-semibold
                                  ${
                                    item.compare.includes("+")
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                `}
                              >
                                {item.compare}
                              </td>
                            </tr>
                          )
                        )}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ACTION */}
          <div className="flex items-center justify-end gap-3 mt-6">

            <button className="h-11 px-5 rounded-lg border border-gray-200 bg-white text-[14px] font-medium">
              Simpan Draft
            </button>

            {!isLocked ? (
              <button
                onClick={() =>
                  setPageState("confirm-lock")
                }
                className="h-11 px-5 rounded-lg bg-green-600 text-white text-[14px] font-medium flex items-center gap-2"
              >
                <Lock size={16} />
                Kunci Target
              </button>
            ) : (
              <button className="h-11 px-5 rounded-lg border border-gray-200 bg-white text-[14px] font-medium flex items-center gap-2">
                <Lock size={16} />
                Ubah Target
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {pageState === "confirm-lock" && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="w-[520px] bg-white rounded-lg shadow-xl p-6">

            <div className="flex items-start justify-between mb-5">

              <h2 className="text-2xl font-semibold">
                Kunci Target
              </h2>

              <button
                onClick={() =>
                  setPageState("draft-ready")
                }
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-8">
              Apakah anda yakin untuk
              mengunci Target Revenue tahunan ini?
            </p>

            <div className="flex items-center justify-end gap-3">

              <button
                onClick={() =>
                  setPageState("draft-ready")
                }
                className="h-11 px-5 border rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={() =>
                  setPageState("locked")
                }
                className="h-11 px-5 bg-green-600 text-white rounded-lg"
              >
                Ya, Kunci
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}