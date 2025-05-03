"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const initialRequests = [
  {
    id: 1,
    date: "2024-04-10",
    user: "user123",
    merchant: "Nike",
    amount: "0.0008 BTC",
    status: "Pending",
    receipt: "/receipts/receipt1.png",
    partner: false
  },
  {
    id: 2,
    date: "2024-03-28",
    user: "user456",
    merchant: "Amazon",
    amount: "0.0012 BTC",
    status: "Approved",
    receipt: "/receipts/receipt2.png",
    partner: true
  },
  {
    id: 3,
    date: "2024-03-15",
    user: "user789",
    merchant: "Walmart",
    amount: "0.0005 BTC",
    status: "Rejected",
    receipt: "/receipts/receipt3.png",
    partner: false
  }
];

export default function AdminDashboardPage() {
  const [cashbackRequests, setCashbackRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusChange = (id: number, newStatus: string) => {
    setCashbackRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const filteredRequests = cashbackRequests.filter(r => {
    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter;
    const matchesSearch =
      r.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="min-h-screen flex bg-[#121212] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B1E22] border-r border-[#33383E] p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2 mb-10">
          <Image src="/bitcoin.png" alt="StackBack" width={28} height={28} />
          <span className="font-bold text-xl">StackBack</span>
        </div>
        <nav className="flex flex-col gap-4 text-white/80 text-sm">
          <Link href="#" className="hover:text-white">Dashboard</Link>
          <Link href="/" className="text-orange-400 hover:text-white transition">← Back to App</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold mb-2">Admin Dashboard</h1>
        <p className="text-white/50 mb-6">Overview & Manage cashback submissions</p>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-10">
          <div className="bg-[#1B1E22] border border-[#33383E] rounded-lg p-6">
            <p className="text-white/70 text-sm mb-2">Total Requests</p>
            <p className="text-2xl font-bold">{cashbackRequests.length}</p>
          </div>
          <div className="bg-[#1B1E22] border border-[#33383E] rounded-lg p-6">
            <p className="text-white/70 text-sm mb-2">Approved</p>
            <p className="text-2xl font-bold text-green-400">
              {cashbackRequests.filter(r => r.status === "Approved").length}
            </p>
          </div>
          <div className="bg-[#1B1E22] border border-[#33383E] rounded-lg p-6">
            <p className="text-white/70 text-sm mb-2">Rejected</p>
            <p className="text-2xl font-bold text-red-400">
              {cashbackRequests.filter(r => r.status === "Rejected").length}
            </p>
          </div>
          <div className="bg-[#1B1E22] border border-[#33383E] rounded-lg p-6">
            <p className="text-white/70 text-sm mb-2">Pending</p>
            <p className="text-2xl font-bold text-orange-400">
              {cashbackRequests.filter(r => r.status === "Pending").length}
            </p>
          </div>
          <div className="bg-[#1B1E22] border border-[#33383E] rounded-lg p-6">
            <p className="text-white/70 text-sm mb-2">Total BTC Paid</p>
            <p className="text-2xl font-bold text-orange-400">
              {cashbackRequests
                .filter(r => r.status === "Approved")
                .reduce((sum, r) => sum + parseFloat(r.amount), 0)
                .toFixed(4)} BTC
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1B1E22] border border-[#33383E] rounded-lg px-3 py-2 focus:outline-none text-white/80 hover:border-orange-500 transition"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Search user or merchant"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1B1E22] border border-[#33383E] rounded-lg px-3 py-2 focus:outline-none w-full md:w-64 text-white/80 hover:border-orange-500 transition"
          />
        </div>

        {/* Cashback Requests Table */}
        <h2 className="text-2xl font-semibold mb-4">Latest Submissions</h2>
        <div className="border border-[#33383E] rounded-lg overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1B1E22] text-white/80">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Merchant</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((r) => (
                <tr key={r.id} className="border-t border-[#33383E] hover:bg-[#1B1E22]/50 transition">
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">{r.user}</td>
                  <td className="px-4 py-3 flex gap-1 items-center">
                    {r.merchant} 
                    {r.partner && (
                      <span className="ml-1 text-xs bg-orange-500 text-black px-2 py-0.5 rounded-full">Partner</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{r.amount}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`rounded-lg px-2 py-1 text-sm bg-[#1B1E22] border border-[#33383E] 
                        ${r.status === "Approved" ? "text-green-400 bg-green-900/20" :
                          r.status === "Rejected" ? "text-red-400 bg-red-900/20" : "text-orange-400 bg-orange-900/20"}
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <a href={r.receipt} className="underline text-orange-400" target="_blank">View</a>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-white/60">
                    No matching requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
