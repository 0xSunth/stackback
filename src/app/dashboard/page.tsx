'use client';

import HeaderLayout from '@/app/components/layouts/HeaderLayout';
import CashbackHistoryRow from '@/app/components/CashbackHistoryRow';
import { useState } from 'react';
import SubmitCashbackModal from '@/app/components/modals/SubmitCashbackModal';
import { createAppKit, useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin';
import { AppKitNetwork, bitcoin, bitcoinTestnet } from '@reown/appkit/networks';
import { useCashbackRequests } from '../hooks/useCashbackRequests';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694';
const networks = [bitcoin, bitcoinTestnet] as [AppKitNetwork, ...AppKitNetwork[]];
const bitcoinAdapter = new BitcoinAdapter({
  projectId,
});

createAppKit({
  adapters: [bitcoinAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true,
    socials: [],
    email: false,
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  },
});

export default function DashboardPage() {
  const [limit, setLimit] = useState<number>(20);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { cashbackRequests } = useCashbackRequests({ limit });

  return (
    <HeaderLayout>
      <section className="mx-auto mt-10 max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>

        <div className="mb-10 flex flex-col gap-6 md:flex-row">
          {/* Total Bitcoin Earned */}
          <div className="flex-1 rounded-lg border border-[#33383E] bg-[#1B1E22] p-6">
            <p className="mb-2 text-sm text-gray-400">Total Bitcoin Earned</p>
            <p className="text-3xl font-bold text-orange-400 md:text-4xl">0,1 BTC</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#33383E]">
              <div className="h-full w-[30%] rounded-full bg-orange-500"></div>
            </div>
            <button className="mt-4 cursor-pointer rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
              Collect BTC
            </button>
          </div>

          {/* Bitcoin Wallet Address */}
          <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-[#33383E] bg-[#1B1E22] p-6 text-center md:w-[350px]">
            <p className="text-sm font-medium text-gray-400">Your Bitcoin Wallet</p>
            {isConnected ? (
              <div className="text-center font-semibold text-green-400">
                <p>Connected</p>
                <p className="text-sm break-all">{address}</p>
              </div>
            ) : (
              <button
                onClick={() => open()}
                className="cursor-pointer rounded-lg border border-orange-500 px-6 py-2 text-base text-orange-400 transition hover:bg-orange-500/20"
              >
                Connect Wallet
              </button>
            )}
            <p className="max-w-[280px] text-xs text-white/60">
              Link your wallet to be able to receive your Bitcoin cashback.
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Cashback History</h2>
          <a
            href="/upload-receipt"
            className="mt-4 cursor-pointer rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Upload Receipt
          </a>
        </div>
        <div className="overflow-hidden rounded-lg border border-[#33383E]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1B1E22] text-white/80">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Merchant</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cashbackRequests && cashbackRequests.length > 0 ? (
                cashbackRequests.map((request) => (
                  <CashbackHistoryRow
                    key={request.id}
                    request={request}
                    onClick={() => setIsModalOpen(true)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                    No cashback requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <SubmitCashbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </HeaderLayout>
  );
}
