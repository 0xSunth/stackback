'use client';

import HeaderLayout from '@/app/components/layouts/HeaderLayout';
import CashbackHistoryRow from '@/app/components/CashbackHistoryRow';
import { useState } from 'react';
import SubmitCashbackModal from '@/app/components/modals/SubmitCashbackModal';

// Exemple de données fictives
const cashbackHistory = [
  {
    date: 'Apr 10, 2024',
    merchant: 'Nike',
    status: 'Pending',
    amount: '0.0008 BTC',
    logo: '/merchants/nike.png',
  },
  {
    date: 'Mar 28, 2024',
    merchant: 'Amazon',
    status: 'Confirmed',
    amount: '0.0012 BTC',
    logo: '/merchants/amazon.png',
  },
  {
    date: 'Mar 15, 2024',
    merchant: 'Walmart',
    status: 'Rejected',
    amount: '0.0005 BTC',
    logo: '/merchants/walmart.png',
  },
  {
    date: 'Feb 2, 2024',
    merchant: 'Nike',
    status: 'Confirmed',
    amount: '0.0009 BTC',
    logo: '/merchants/nike.png',
  },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState('');

  const connectWallet = () => {
    // 💡 EXEMPLE SIMPLE pour demo — remplacer par une vraie connexion wallet.
    // Avec Xverse ou Hiro, il faudra intégrer un provider.
    const fakeAddress = 'bc1qexampleaddressxverse1234567890';
    setConnectedAddress(fakeAddress);
  };

  return (
    <HeaderLayout>
      <section className="mx-auto mt-10 max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>

        <div className="mb-10 flex flex-col gap-6 md:flex-row">
          {/* Total Bitcoin Earned */}
          <div className="flex-1 rounded-lg border border-[#33383E] bg-[#1B1E22] p-6">
            <p className="mb-2 text-sm text-gray-400">Total Bitcoin Earned</p>
            <p className="text-3xl font-bold text-orange-400 md:text-4xl">0,0125 BTC</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#33383E]">
              <div className="h-full w-[60%] rounded-full bg-orange-500"></div>
            </div>
          </div>

          {/* Bitcoin Wallet Address */}
          <div className="flex w-full flex-col items-center gap-4 rounded-lg border border-[#33383E] bg-[#1B1E22] p-6 text-center md:w-[350px]">
            <p className="text-sm font-medium text-gray-400">Your Bitcoin Wallet</p>
            {connectedAddress ? (
              <div className="text-center font-semibold text-green-400">
                <p>Connected</p>
                <p className="text-sm break-all">{connectedAddress}</p>
              </div>
            ) : (
              <button
                onClick={connectWallet}
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

        <h2 className="mb-4 text-2xl font-semibold">Cashback History</h2>
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
              {cashbackHistory.map((item, idx) => (
                <CashbackHistoryRow
                  key={idx}
                  date={item.date}
                  logo={item.logo}
                  merchant={item.merchant}
                  status={item.status}
                  amount={item.amount}
                  onClick={() => setIsModalOpen(true)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <SubmitCashbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </HeaderLayout>
  );
}
