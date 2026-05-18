import React from "react";
import {
  ArrowLeft,
  Lock,
  Unlock,
  Pencil,
  CalendarDays,
} from "lucide-react";

const historyData = [
  {
    date: "7 Mei 2026 • 19:54",
    user: "Ali Putera",
    role: "VP Akses Bisnis",
    action: "Target Revenue dikunci",
    description:
      "Target Revenue tahun 2026 berhasil dikunci dan digunakan sebagai baseline dashboard.",
    type: "lock",
  },
  {
    date: "7 Mei 2026 • 19:21",
    user: "Ali Putera",
    role: "VP Akses Bisnis",
    action: "Perubahan Target Revenue",
    description:
      "Mengubah target bulan Juli karena penyesuaian forecast revenue semester 2.",
    type: "edit",
  },
  {
    date: "7 Mei 2026 • 18:40",
    user: "Ali Putera",
    role: "VP Akses Bisnis",
    action: "Target Revenue dibuka",
    description:
      "Membuka target revenue untuk melakukan penyesuaian distribusi bulanan.",
    type: "unlock",
  },
  {
    date: "6 Mei 2026 • 15:12",
    user: "Ali Putera",
    role: "VP Akses Bisnis",
    action: "Draft dibuat",
    description:
      "Membuat draft awal target revenue tahunan 2026.",
    type: "draft",
  },
];

export default function TargetRevenueHistory() {
const employeeId = localStorage.getItem("employee_id");

const allowedRevenueIds = [
  "0200622",
  "0209901",
  "0202111",
];

const hasRevenueAccess = allowedRevenueIds.includes(employeeId || "");

if (!hasRevenueAccess) {
  return <div>Access Denied</div>;
}

  const renderIcon = (type: string) => {
    switch (type) {
      case "lock":
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
            <Lock size={18} />
          </div>
        );

      case "unlock":
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
            <Unlock size={18} />
          </div>
        );

      case "edit":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Pencil size={18} />
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
            <CalendarDays size={18} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <div className="max-w-[1200px] mx-auto px-8 py-8">

        {/* HEADER */}
        <div className="mb-8">

          <button className="flex items-center gap-2 text-[14px] text-gray-500 hover:text-gray-800 mb-5">
            <ArrowLeft size={16} />
            Kembali ke Target Revenue
          </button>

          <div className="flex items-start justify-between">

            <div>
              <h1 className="text-[36px] leading-[40px] font-semibold tracking-[-0.5px] text-[#111827]">
                Riwayat Perubahan
              </h1>

              <div className="flex items-center gap-3 mt-2 text-[14px] text-gray-500">
                <span>Target Revenue Tahunan 2026</span>
                <span>•</span>
                <span>Audit perubahan dan aktivitas pengguna</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg px-5 h-12 flex items-center shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  Total Aktivitas:
                </span>

                <span className="text-[15px] font-semibold text-gray-800">
                  4 Perubahan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="space-y-5">

          {historyData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-start gap-5">

                {/* ICON */}
                {renderIcon(item.type)}

                {/* CONTENT */}
                <div className="flex-1">

                  <div className="flex items-start justify-between mb-3">

                    <div>
                      <h3 className="text-[18px] font-semibold text-gray-900 mb-1">
                        {item.action}
                      </h3>

                      <div className="flex items-center gap-2 text-[14px] text-gray-500">
                        <span>{item.user}</span>
                        <span>•</span>
                        <span>{item.role}</span>
                      </div>
                    </div>

                    <div className="text-[13px] text-gray-400 text-right whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-[14px] text-gray-700 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}