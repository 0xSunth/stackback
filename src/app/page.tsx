'use client';

import Image from 'next/image';
import FeaturedMerchantCard from '@/app/components/FeaturedMerchantCard';
import PartnerLogo from '@/app/components/PartnerLogo';
import Link from 'next/link';
import { useHighlightMerchants } from './hooks/useHighlightMerchants';
import { useState } from 'react';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState<number>(20);

  const { merchants, errors } = useHighlightMerchants({
    limit,
  });

  const partners = [
    { logoSrc: '/partners/alby.png', logoAlt: 'Alby' },
    { logoSrc: '/partners/bitrefill.png', logoAlt: 'Bitrefill' },
    { logoSrc: '/partners/fold.png', logoAlt: 'Fold' },
    { logoSrc: '/partners/strike.png', logoAlt: 'Strike' },
  ];

  return (
    <main
      className="flex h-full min-h-screen w-full flex-col justify-start pb-20 text-white"
      style={{ background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)' }}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {' '}
        {/* Ajout px-4 pour mobile padding */}
        {/* Header */}
        <header className="flex w-full justify-center py-6">
          <div className="flex items-center gap-2">
            <Image src={'/bitcoin.png'} alt={'logo'} width={32} height={32} />
            <span className="text-2xl font-semibold">StackBack</span>
          </div>
        </header>
        {/* Hero content */}
        <section className="mx-auto flex max-w-2xl flex-col items-center px-2 text-center">
          <p className="text-sm font-bold tracking-wide text-orange-400 uppercase sm:text-lg">
            GET BITCOIN BACK
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl md:text-[56px] md:whitespace-nowrap">
            Earn Bitcoin on Your Purchases
          </h1>
          <p className="mt-4 max-w-xs text-base text-gray-300 sm:max-w-xl sm:text-lg md:whitespace-nowrap">
            Get up to 10% Bitcoin back when you shop at your favorite stores.
          </p>
        </section>
        {/* Cards merchants */}
        <section className="mt-12 flex w-full flex-wrap justify-center gap-[16px] sm:mt-16 sm:gap-[24px]">
          {errors.length > 0 && (
            <div className="rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
              {errors.map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          )}
          {merchants &&
            merchants.map((merchant, index) => (
              <FeaturedMerchantCard
                key={index}
                logoSrc={merchant.logoUrl}
                logoAlt={merchant.name}
                cashbackPercent={merchant.cashbackPercent}
              />
            ))}
        </section>
        {/* Call to action */}
        <div className="mt-12 flex flex-col items-center px-2 sm:mt-16">
          <Link
            href="/merchants"
            className="inline-block min-w-[200px] rounded-lg bg-orange-500 px-6 py-3 text-center text-base font-semibold text-white hover:bg-orange-600 sm:min-w-[240px] sm:px-8"
          >
            Start Earning Bitcoin
          </Link>
          <p className="mt-2 text-xs text-gray-400 italic sm:text-sm">
            Trusted by 1,500+ Bitcoiners
          </p>
        </div>
        {/* Logos partenaires */}
        <div className="mt-10 mb-8 flex flex-col items-center">
          <p className="mb-4 text-sm text-white">Partnered with</p>
          <div className="flex flex-wrap items-center justify-center gap-[16px] sm:gap-[24px]">
            {partners.map((partner, index) => (
              <PartnerLogo key={index} logoSrc={partner.logoSrc} logoAlt={partner.logoAlt} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
