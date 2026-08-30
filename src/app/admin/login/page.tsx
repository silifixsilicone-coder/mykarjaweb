"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#071827] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C58A24]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C58A24] to-[#E2B24A] text-[#071827] shadow-lg shadow-[#C58A24]/20 mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#FFF8E8] font-serif-deva">
            Admin Panel
          </h2>
          <p className="mt-2 text-sm text-[#E2B24A]/80 font-sans">
            कर्ज संपण्याआधीच जगायला शिका — Content Management
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#0E2A3F]/80 backdrop-blur-md border border-[#C58A24]/30 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 shrink-0 text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#FFF8E8]"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full px-4 py-3 bg-[#071827] border border-[#C58A24]/40 rounded-xl text-[#FFF8E8] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C58A24] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#FFF8E8]"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#071827] border border-[#C58A24]/40 rounded-xl text-[#FFF8E8] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C58A24] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-[#071827] bg-gradient-to-r from-[#C58A24] to-[#E2B24A] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C58A24] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.99]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-[#071827]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      लॉगिन होत आहे...
                    </span>
                  ) : (
                    "लॉगिन करा (Log In)"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center border-t border-[#C58A24]/20 pt-4">
              <Link
                href="/"
                className="text-xs text-[#E2B24A]/70 hover:text-[#E2B24A] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>← मुख्य संकेतस्थळावर परत जा (Back to Website)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
