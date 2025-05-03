"use client";

import MainLayout from "@/app/components/layouts/MainLayout";
import CashbackHistoryRow from "@/app/components/CashbackHistoryRow";
import { useState } from "react";
import SubmitCashbackModal from "@/app/components/modals/SubmitCashbackModal";

// Exemple de données fictives
const cashbackHistory = [
  { date: "Apr 10, 2024", merchant: "Nike", status: "Pending", amount: "0.0008 BTC", logo: "/merchants/nike.png" },
  { date: "Mar 28, 2024", merchant: "Amazon", status: "Confirmed", amount: "0.0012 BTC", logo: "/merchants/amazon.png" },
  { date: "Mar 15, 2024", merchant: "Walmart", status: "Confirmed", amount: "0.0005 BTC", logo: "/merchants/walmart.png" },
  { date: "Feb 2, 2024", merchant: "Nike", status: "Confirmed", amount: "0.0009 BTC", logo: "/merchants/nike.png" },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");

  const connectWallet = () => {
    // 💡 EXEMPLE SIMPLE pour demo — remplacer par une vraie connexion wallet.
    // Avec Xverse ou Hiro, il faudra intégrer un provider.
    const fakeAddress = "bc1qexampleaddressxverse1234567890";
    setConnectedAddress(fakeAddress);
  };

  return (
    <MainLayout>
      <section className="max-w-6xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Total Bitcoin Earned */}
          <div className="flex-1 rounded-lg bg-[#1B1E22] border border-[#33383E] p-6">
            <p className="text-gray-400 text-sm mb-2">Total Bitcoin Earned</p>
            <p className="text-3xl md:text-4xl font-bold text-orange-400">0,0125 BTC</p>
            <div className="h-2 bg-[#33383E] rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-orange-500 w-[60%] rounded-full"></div>
            </div>
          </div>

          {/* Bitcoin Wallet Address */}
          <div className="w-full md:w-[350px] rounded-lg bg-[#1B1E22] border border-[#33383E] p-6 flex flex-col items-center gap-4 text-center">
            <p className="text-gray-400 text-sm font-medium">Your Bitcoin Wallet</p>
            {connectedAddress ? (
              <div className="text-green-400 font-semibold text-center">
              <p>Connected</p>
              <p className="break-all text-sm">{connectedAddress}</p>
            </div>
            
            ) : (
              <button
                onClick={connectWallet}
                className="border border-orange-500 text-orange-400 px-6 py-2 rounded-lg hover:bg-orange-500/20 transition text-base"
              >
                Connect Wallet
              </button>
            )}
             <p className="text-white/60 text-xs max-w-[280px]">
              Link your wallet to be able to receive your Bitcoin cashback.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Cashback History</h2>
        <div className="rounded-lg overflow-hidden border border-[#33383E]">
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

        <SubmitCashbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    </MainLayout>
  );
}
