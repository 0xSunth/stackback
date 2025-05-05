'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
  const { login, errors, loading } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#121212] px-4 text-white"
      style={{
        background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      }}
    >
      <div className="w-full max-w-md rounded-xl border border-[#33383E] bg-[#1B1E22] p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Image src="/bitcoin.png" alt="logo" width={32} height={32} />
          <span className="text-2xl font-semibold">StackBack</span>
        </div>

        <h1 className="mb-2 text-center text-3xl font-bold">Welcome back</h1>
        <p className="mb-6 text-center text-sm text-white/70">Login to your account.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errors.length > 0 && (
            <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
              {errors.map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          )}
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90 focus:outline-none"
          />

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-orange-400 underline">
            Sign up
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-white/50">
          <Link href="/" className="text-white transition hover:text-orange-500">
            ← Back to Site
          </Link>
        </p>
      </div>
    </main>
  );
}
