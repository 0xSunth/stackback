"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu connecteras l’utilisateur avec ton système d'auth.
    alert("Logged in!");
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

        <h1 className="text-3xl font-bold mb-2 text-center">Welcome back</h1>
        <p className="text-white/70 text-center mb-6 text-sm">
          Login to your account.
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
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#121212] border border-[#33383E] rounded-lg px-4 py-3 text-white/90 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-orange-400 underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}