"use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Mail, Sparkles } from "lucide-react";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI states for demonstration (No Firebase/Backend connection)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Simulate temporary UI response
    setTimeout(() => {
      setIsLoading(false);
      if (!email || !password) {
        setErrorMessage("Please enter both email address and password.");
      } else if (!email.includes("@")) {
        setErrorMessage("Please enter a valid email address.");
      } else {
        // Demonstrate error state visually as requested by final check requirements
        setErrorMessage("Invalid email or password");
      }
    }, 1500);
  };

  // Demo toggle functions for visual inspection
  const triggerDemoError = () => {
    setErrorMessage((prev) =>
      prev ? null : "Invalid email or password"
    );
  };

  const triggerDemoLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-[440px] mx-auto px-4 sm:px-0">
      {/* Centered Login Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-shadow duration-300 p-6 sm:p-8 space-y-6">
        
        {/* Top Branding & Header */}
        <div className="text-center space-y-4">
          <Logo />
          
          <div className="space-y-1 pt-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
              Sign in to manage your landing pages and digital products.
            </p>
          </div>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <Alert
            message={errorMessage}
            variant="error"
            onClose={() => setErrorMessage(null)}
          />
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <Input
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
            autoComplete="email"
          />

          {/* Password Field */}
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between pt-0.5">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            
            <a
              href="#forgot-password"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              loadingText="Signing in..."
            >
              Sign In
            </Button>
          </div>
        </form>

        {/* Interactive UI State Playground (For testing Chapter 1 visual states) */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-slate-400" />
              UI Demo Controls
            </span>
            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold">
              Frontend Only
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={triggerDemoError}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-center font-medium"
            >
              {errorMessage ? "Clear Error" : "Demo Error State"}
            </button>
            <button
              type="button"
              onClick={triggerDemoLoading}
              disabled={isLoading}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-center font-medium disabled:opacity-50"
            >
              Demo Loading State
            </button>
          </div>
        </div>

      </div>

      {/* Subtle Footer Note */}
      <div className="text-center mt-6 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Digital Bundle Admin Panel. All rights reserved.
      </div>
    </div>
  );
};
