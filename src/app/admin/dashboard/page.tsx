'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const initialRequests = [
  {
    id: 1,
    date: '2024-04-10',
    user: 'user123',
    merchant: 'Nike',
    amount: '0.0008 BTC',
    status: 'Pending',
    receipt: '/receipts/receipt1.png',
    partner: false,
  },
  {
    id: 2,
    date: '2024-03-28',
    user: 'user456',
    merchant: 'Amazon',
    amount: '0.0012 BTC',
    status: 'Approved',
    receipt: '/receipts/receipt2.png',
    partner: true,
  },
  {
    id: 3,
    date: '2024-03-15',
    user: 'user789',
    merchant: 'Walmart',
    amount: '0.0005 BTC',
    status: 'Rejected',
    receipt: '/receipts/receipt3.png',
    partner: false,
  },
];

export default function AdminDashboardPage() {
  const [cashbackRequests, setCashbackRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (id: number, newStatus: string) => {
    setCashbackRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)),
    );
  };

  const filteredRequests = cashbackRequests.filter((r) => {
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesSearch =
      r.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className="flex min-h-screen flex-col bg-[#121212] text-white md:flex-row">
      {/* Sidebar / Topbar */}
      <aside className="flex w-full items-center justify-between gap-6 border-b border-[#33383E] bg-[#1B1E22] p-6 md:w-64 md:flex-col md:justify-start md:border-r md:border-b-0">
        <div className="flex items-center gap-2">
          <Image src="/bitcoin.png" alt="StackBack" width={28} height={28} />
          <span className="text-xl font-bold">StackBack</span>
        </div>
        <nav className="flex gap-4 text-sm text-white/80 md:flex-col">
          <Link href="/admin/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link href="/admin/merchants" className="hover:text-white">
            Merchants
          </Link>
          <Link href="/" className="text-orange-400 transition hover:text-white">
            ← Back to App
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-4 md:p-8">
        <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">Admin Dashboard</h1>
        <p className="mb-6 text-white/50">Overview & Manage cashback submissions</p>

        {/* Overview cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
          <div className="rounded-lg border border-[#33383E] bg-[#1B1E22] p-4">
            <p className="mb-1 text-sm text-white/70">Total Requests</p>
            <p className="text-xl font-bold">{cashbackRequests.length}</p>
          </div>
          <div className="rounded-lg border border-[#33383E] bg-[#1B1E22] p-4">
            <p className="mb-1 text-sm text-white/70">Approved</p>
            <p className="text-xl font-bold text-green-400">
              {cashbackRequests.filter((r) => r.status === 'Approved').length}
            </p>
          </div>
          <div className="rounded-lg border border-[#33383E] bg-[#1B1E22] p-4">
            <p className="mb-1 text-sm text-white/70">Rejected</p>
            <p className="text-xl font-bold text-red-400">
              {cashbackRequests.filter((r) => r.status === 'Rejected').length}
            </p>
          </div>
          <div className="rounded-lg border border-[#33383E] bg-[#1B1E22] p-4">
            <p className="mb-1 text-sm text-white/70">Pending</p>
            <p className="text-xl font-bold text-orange-400">
              {cashbackRequests.filter((r) => r.status === 'Pending').length}
            </p>
          </div>
          <div className="rounded-lg border border-[#33383E] bg-[#1B1E22] p-4">
            <p className="mb-1 text-sm text-white/70">Total BTC Paid</p>
            <p className="text-xl font-bold text-orange-400">
              {cashbackRequests
                .filter((r) => r.status === 'Approved')
                .reduce((sum, r) => sum + parseFloat(r.amount), 0)
                .toFixed(4)}{' '}
              BTC
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[#33383E] bg-[#1B1E22] px-3 py-2 text-white/80 transition hover:border-orange-500 focus:outline-none"
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
            className="w-full rounded-lg border border-[#33383E] bg-[#1B1E22] px-3 py-2 text-white/80 transition hover:border-orange-500 focus:outline-none md:w-64"
          />
        </div>

        {/* Cashback Requests Table */}
        <h2 className="mb-4 text-2xl font-semibold">Latest Submissions</h2>
        <div className="overflow-auto rounded-lg border border-[#33383E]">
          <table className="w-full min-w-[600px] text-sm">
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
                <tr
                  key={r.id}
                  className="border-t border-[#33383E] transition hover:bg-[#1B1E22]/50"
                >
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">{r.user}</td>
                  <td className="flex items-center gap-1 px-4 py-3">
                    {r.merchant}
                    {r.partner && (
                      <span className="ml-1 rounded-full bg-orange-500 px-2 py-0.5 text-xs text-black">
                        Partner
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{r.amount}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      className={`rounded-lg border border-[#33383E] bg-[#1B1E22] px-2 py-1 text-sm ${
                        r.status === 'Approved'
                          ? 'bg-green-900/20 text-green-400'
                          : r.status === 'Rejected'
                            ? 'bg-red-900/20 text-red-400'
                            : 'bg-orange-900/20 text-orange-400'
                      } `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <a href={r.receipt} className="text-orange-400 underline" target="_blank">
                      View
                    </a>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-white/60">
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
