'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useMerchant } from '@/app/hooks/useMerchant';

export default function OfferClient({ merchantSlug }: { merchantSlug: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { merchant, loading, errors } = useMerchant(decodeURIComponent(merchantSlug as string));

  // Redirection auto après 3 secondes
  useEffect(() => {
    if (merchant) {
      const timer = setTimeout(() => {
        window.location.href = merchant.affiliateUrl;
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [merchant]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center text-white"
      style={{
        background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      }}
    >
      {!merchant ? (
        <h1 className="mb-2 text-3xl font-bold">Merchant not found.</h1>
      ) : (
        <>
          <Image
            src={merchant.logoUrl}
            alt={merchant.name}
            width={180}
            height={180}
            className="mb-4 max-h-[48px]"
          />
          <h1 className="mb-2 text-3xl font-bold">
            You&apos;re earning {merchant.cashbackPercent}% Bitcoin back!
          </h1>
          <p className="mb-6 text-white/80">You are being redirected to {merchant.name}...</p>
          <a
            href={merchant.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-orange-500 px-8 py-3 text-base font-semibold text-white hover:bg-orange-600"
          >
            Go to {merchant.name} now
          </a>
          <p className="mt-4 text-sm text-white/50">
            If you are not redirected automatically, click the button.
          </p>
        </>
      )}
    </main>
  );
}
