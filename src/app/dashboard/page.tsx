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

  return (
    <MainLayout>
      {/* Dashboard content */}
      <section className="max-w-6xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        {/* Total Bitcoin Earned */}
        <div className="rounded-lg bg-[#1B1E22] border border-[#33383E] p-6 mb-10">
          <p className="text-gray-400 text-sm mb-2">Total Bitcoin Earned</p>
          <p className="text-3xl md:text-4xl font-bold text-orange-400">0,0125 BTC</p>
          <div className="h-2 bg-[#33383E] rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-orange-500 w-[60%] rounded-full"></div>
          </div>
        </div>

        {/* Cashback History */}
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
