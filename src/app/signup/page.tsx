"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("Please accept the privacy policy.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Account created successfully!");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#121212] text-white px-4"
      style={{
        background: "radial-gradient(circle, #1E1E1E 0%, #121212 100%)",
      }}
    >
      <div className="bg-[#1B1E22] border border-[#33383E] rounded-xl p-8 max-w-md w-full shadow-lg">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Image src="/bitcoin.png" alt="logo" width={32} height={32} />
          <span className="font-semibold text-2xl">StackBack</span>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-white/70 text-center mb-6 text-sm">
          Sign up to start earning Bitcoin cashback. No unnecessary data collection.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#121212] border border-[#33383E] rounded-lg px-4 py-3 text-white/90 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#121212] border border-[#33383E] rounded-lg px-4 py-3 text-white/90 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-[#121212] border border-[#33383E] rounded-lg px-4 py-3 text-white/90 focus:outline-none"
          />

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={() => setConsent(!consent)}
              className="accent-orange-500"
            />
            I agree to the{" "}
            <Link href="/privacy" className="text-orange-400 underline">
              privacy policy
            </Link>
          </label>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-400 underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}