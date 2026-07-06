"use client";

import Image from "next/image";
import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginForm() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-100 via-white to-red-100 px-4">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-300/20 blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative h-24 w-24 rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200 p-2">
              <Image
                src="/Logo.PNG"
                alt="Disha Arts Classes"
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <h1 className="mt-5 text-3xl font-extrabold">
              <span className="text-blue-700">Disha</span>{" "}
              <span className="text-red-600">Arts</span>
            </h1>

            <p className="text-slate-500 text-sm mt-1 font-medium">
              Administration Panel
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 animate-pulse">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                <input
                  type="email"
                  placeholder="admin@dishaarts.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                py-3.5
                rounded-xl
                text-white
                font-semibold
                bg-linear-to-r
                from-blue-600
                via-blue-700
                to-red-500
                shadow-lg
                hover:shadow-xl
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-300
                disabled:opacity-70
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              © 2026 Disha Arts Classes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
