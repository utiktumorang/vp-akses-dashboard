import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username && password) {
      login(username);
      navigate('/dashboard/growth');
    } else {
      setError('ID Karyawan dan Password harus diisi');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#EEF7F0] flex items-center justify-center px-6">
      {/* ===== BACKGROUND ===== */}

      {/* Gradient Glow */}
      <div className="absolute top-[-120px] left-[-100px] w-[500px] h-[500px] bg-green-300/30 blur-3xl rounded-full" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-300/30 blur-3xl rounded-full" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px',
        }}
      />

      {/* Connection Network */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="networkLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>

        {/* Curved lines */}
        <path
          d="M0 180 Q 320 120 650 260 T 1500 220"
          stroke="url(#networkLine)"
          strokeWidth="2"
          opacity="0.15"
          fill="none"
        />

        <path
          d="M-100 480 Q 300 340 760 440 T 1600 400"
          stroke="url(#networkLine)"
          strokeWidth="2"
          opacity="0.15"
          fill="none"
        />

        <path
          d="M250 0 Q 600 250 980 180 T 1500 260"
          stroke="url(#networkLine)"
          strokeWidth="2"
          opacity="0.15"
          fill="none"
        />

        {/* Nodes */}
        {[
          [180, 160],
          [450, 220],
          [780, 180],
          [1100, 240],
          [320, 400],
          [700, 450],
          [980, 390],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="6"
              fill="#16A34A"
              opacity="0.8"
            />
            <circle
              cx={cx}
              cy={cy}
              r="18"
              fill="#16A34A"
              opacity="0.08"
            />
          </g>
        ))}
      </svg>

      {/* Decorative Circles */}
      <div className="absolute top-24 left-24 w-44 h-44 border border-green-400/10 rounded-full" />
      <div className="absolute bottom-32 left-44 w-72 h-72 border border-blue-400/10 rounded-full" />
      <div className="absolute top-20 right-28 w-60 h-60 border border-cyan-400/10 rounded-full" />

      {/* ===== LOGIN CARD ===== */}

      <div className="relative z-10 w-full max-w-[400px]">
        <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] px-8 py-9">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="w-[88px] h-[88px] rounded-full bg-black border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
              <img
                src="/logo-nusanet.png"
                alt="Nusanet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[30px] font-semibold text-gray-900 leading-tight">
              VP Access Business Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Masukkan ID Karyawan dan Password anda untuk login.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ID */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                ID Karyawan
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-800">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                  Lupa password?
                </button>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-lg shadow-green-500/20 hover:scale-[1.01] hover:from-green-700 hover:to-green-600 active:scale-[0.99] transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}