'use client';

import MerchantListCard from '@/app/components/MerchantListCard';
import HeaderLayout from '@/app/components/layouts/HeaderLayout';
import { useState } from 'react';
import { useMerchants } from '../hooks/useMerchants';

export default function MerchantsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState<number>(20);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const { merchants } = useMerchants({
    limit,
  });

  console.log('merchants', merchants);

  const filteredMerchants =
    merchants &&
    merchants.filter((merchant) => {
      const matchSearch = merchant.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === 'All' ||
        (filter === 'Partner' && merchant.partner === true) ||
        (filter === '5' && merchant.cashbackPercent >= 5) ||
        (filter === '8' && merchant.cashbackPercent >= 8);
      return matchSearch && matchFilter;
    });

  return (
    <HeaderLayout>
      <div className="mx-auto mt-8 mb-6 max-w-6xl text-left">
        <h1 className="text-4xl font-bold">Merchants</h1>
      </div>

      {/* Search bar */}
      {/* Search + Filter bar */}
      <div className="mx-auto mb-4 flex max-w-6xl flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search merchants"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#33383E] bg-[#1B1E22] px-4 py-3 text-white/90 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="min-w-[150px] cursor-pointer rounded-lg border border-[#33383E] bg-[#1B1E22] px-4 py-3 text-white/90 focus:outline-none"
          >
            <option value="All">All Cashback</option>
            <option value="Partner">Only Partners</option>
          </select>
        </div>
      </div>

      {/* Grid Merchants */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMerchants && filteredMerchants.length > 0 ? (
          filteredMerchants.map((merchant, index) => (
            <MerchantListCard
              key={index}
              name={merchant.name}
              cashback={merchant.cashbackPercent}
              logo={merchant.logoUrl}
              partner={merchant.partner}
            />
          ))
        ) : (
          <p className="col-span-full mt-10 text-center text-white/70">No merchants found.</p>
        )}
      </section>
    </HeaderLayout>
  );
}
