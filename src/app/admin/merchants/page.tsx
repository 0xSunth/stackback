import Link from 'next/link';
import Image from 'next/image';
import { MerchantForm } from './MerchantForm';

export default function AdminMerchantsPage() {
  type Merchant = {
    id: number;
    logoUrl: string;
    name: string;
    cashback: number;
    partner: boolean;
  };

  const initialMerchants: Merchant[] = [
    { id: 1, name: 'Nike', cashback: 5, partner: false, logoUrl: '' },
    { id: 2, name: 'Amazon', cashback: 3, partner: true, logoUrl: '' },
    { id: 3, name: 'Walmart', cashback: 4, partner: false, logoUrl: '' },
  ];
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] text-white md:flex-row">
      {/* Sidebar */}
      <aside className="flex w-full items-center justify-between gap-6 border-b border-[#33383E] bg-[#1B1E22] p-6 md:w-64 md:flex-col md:justify-start md:border-r md:border-b-0">
        <div className="flex items-center gap-2">
          <Image src="/bitcoin.png" alt="StackBack" width={28} height={28} />
          <span className="text-xl font-bold">StackBack</span>
        </div>
        <nav className="flex gap-4 text-sm text-white/80 md:flex-col">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/merchants" className="text-orange-400">
            Merchants
          </Link>
          <Link href="/" className="text-orange-400 transition hover:text-white">
            ← Back to App
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-4 md:p-8">
        <h1 className="mb-4 text-3xl font-extrabold md:text-4xl">Manage Merchants</h1>

        {/* Form Add Merchant */}
        <MerchantForm />

        {/* Merchant List */}
        <h2 className="mb-4 text-2xl font-semibold">Merchant List</h2>
        <div className="overflow-auto rounded-lg border border-[#33383E]">
          <table className="w-full min-w-[500px] text-sm">
            <thead className="bg-[#1B1E22] text-white/80">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Cashback %</th>
                <th className="px-4 py-3 text-left">Partner</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialMerchants.map((m) => (
                <tr
                  key={m.id}
                  className="border-t border-[#33383E] transition hover:bg-[#1B1E22]/50"
                >
                  <td className="px-4 py-3">{m.name}</td>
                  <td className="px-4 py-3">{m.cashback}%</td>
                  <td className="px-4 py-3">
                    {m.partner ? (
                      <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-black">
                        Partner
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="flex gap-2 px-4 py-3">
                    <button className="cursor-pointer rounded-lg border border-blue-500 px-3 py-1 text-sm text-blue-400 transition hover:bg-blue-500/20">
                      Modify
                    </button>
                    <button className="cursor-pointer rounded-lg border border-red-500 px-3 py-1 text-sm text-red-400 transition hover:bg-red-500/20">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {initialMerchants.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-white/60">
                    No merchants added yet.
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
