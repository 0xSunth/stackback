"use client";

import MerchantListCard from "@/app/components/MerchantListCard";
import MainLayout from "@/app/components/layouts/MainLayout";
import { useState } from "react";

const merchants = [
  { name: "Adidas", cashback: 8, logo: "/merchants/adidas.png", partner: false },
  { name: "Amazon", cashback: 8, logo: "/merchants/amazon.png", partner: false },
  { name: "Airbnb", cashback: 3, logo: "/merchants/airbnb.png", partner: true },
  { name: "Best Buy", cashback: 11, logo: "/merchants/bestbuy.png", partner: false },
  { name: "Walmart", cashback: 8, logo: "/merchants/walmart.png", partner: true },
  { name: "Nike", cashback: 6, logo: "/merchants/nike.png", partner: false },
  { name: "Macy’s", cashback: 5, logo: "/merchants/macys.png", partner: false },
  { name: "Home Depot", cashback: 11, logo: "/merchants/homedepot.png", partner: true },
];

export default function MerchantsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMerchants = merchants.filter((merchant) => {
    const matchSearch = merchant.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" ||
      (filter === "Partner" && merchant.partner === true) ||
      (filter === "5" && merchant.cashback >= 5) ||
      (filter === "8" && merchant.cashback >= 8);
    return matchSearch && matchFilter;
  });

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto text-left mt-8 mb-6">
        <h1 className="text-4xl font-bold">Merchants</h1>
      </div>

      {/* Search bar */}
      {/* Search + Filter bar */}
<div className="max-w-6xl mx-auto mb-4 flex flex-col md:flex-row gap-4 md:items-center">
  
  <div className="flex-1">
    <input
      type="text"
      placeholder="Search merchants"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-[#1B1E22] border border-[#33383E] text-white/90 rounded-lg px-4 py-3 focus:outline-none"
    />
  </div>

  <div>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="bg-[#1B1E22] border border-[#33383E] text-white/90 rounded-lg px-4 py-3 focus:outline-none min-w-[150px]"
    >
      <option value="All">All Cashback</option>
      <option value="Partner">Only Partners</option>
      <option value="5">5% or more</option>
      <option value="8">8% or more</option>
    </select>
  </div>

</div>


      {/* Grid Merchants */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMerchants.length > 0 ? (
          filteredMerchants.map((merchant, index) => (
            <MerchantListCard
              key={index}
              name={merchant.name}
              cashback={merchant.cashback}
              logo={merchant.logo}
              partner={merchant.partner}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-white/70 mt-10">No merchants found.</p>
        )}
      </section>
    </MainLayout>
  );
}
