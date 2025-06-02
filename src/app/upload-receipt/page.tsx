'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { useMerchants } from '../hooks/useMerchants';
import { useCreateCashbackRequest } from '../hooks/useCreateCashbackRequest';

export default function UploadReceiptPage() {
  const [merchantId, setMerchantId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [limit] = useState<number>(100);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  const { createRequest, errors, loading, submitted } = useCreateCashbackRequest();
  const { merchants } = useMerchants({ limit });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    await createRequest({
      file,
      merchantId,
      amount: parseFloat(amount),
      currency,
      purchasedAt: date,
    });
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

        <h1 className="mb-2 text-center text-3xl font-bold">Upload Receipt</h1>
        <p className="mb-6 text-center text-sm text-white/70">
          Submit your receipt to earn Bitcoin cashback.
        </p>

        {submitted ? (
          <div className="rounded-lg bg-green-900/30 p-4 text-center text-green-400">
            Receipt submitted! We’ll review and notify you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errors.length > 0 && (
              <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
                {errors.map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </div>
            )}

            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-600"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90"
            />

            <select
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              required
              className="rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90"
            >
              <option value="">Select merchant</option>
              {merchants.map((merchant) => (
                <option key={merchant.id} value={merchant.id}>
                  {merchant.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full rounded-lg border border-[#33383E] bg-[#121212] px-4 py-3 text-white/90"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                className="w-24 rounded-lg border border-[#33383E] bg-[#121212] px-2 py-3 text-white/90"
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={clsx(
                'cursor-pointer rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600',
                { 'opacity-50': loading },
              )}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Receipt'}
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-white/60">
          <Link href="/dashboard" className="text-white transition hover:text-orange-500">
            ← Back to Dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}
