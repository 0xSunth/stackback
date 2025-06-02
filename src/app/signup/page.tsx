'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useSignup } from '@/app/hooks/useSignup';

export default function SignupPage() {
  const { signup, errors, loading } = useSignup();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signup(email, password, confirmPassword, consent);
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

        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>
        <p className="mb-6 text-center text-sm text-white/70">
          Sign up to start earning Bitcoin cashback. No unnecessary data collection.
        </p>

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
            name="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90 focus:outline-none"
          />

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90 focus:outline-none"
            />
            <div className="group absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-xs text-white/50">
              ⓘ
              <div className="absolute right-0 z-10 mt-6 hidden w-64 rounded-lg border border-[#33383E] bg-[#1B1E22] p-2 text-xs text-white/70 group-hover:block">
                Password must contain:
                <ul className="ml-4 list-disc">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One number</li>
                </ul>
              </div>
            </div>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90 focus:outline-none"
          />

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={() => setConsent(!consent)}
              className="cursor-pointer accent-orange-500"
            />
            I agree to the{' '}
            <Link href="/privacy" className="text-orange-400 underline">
              privacy policy
            </Link>
          </label>

          <button
            type="submit"
            className={clsx(
              'cursor-pointer rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600',
            )}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-400 underline">
            Login
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
