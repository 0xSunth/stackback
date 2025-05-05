'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

// Simulation d'une base de données de marchands :
const merchants = {
  amazon: {
    name: 'Amazon',
    cashback: 8,
    logo: '/merchants/amazon.png',
    url: 'https://www.amazon.com',
  },
  walmart: {
    name: 'Walmart',
    cashback: 3,
    logo: '/merchants/walmart.png',
    url: 'https://www.walmart.com',
  },
  nike: {
    name: 'Nike',
    cashback: 6,
    logo: '/merchants/nike.png',
    url: 'https://www.nike.com',
  },
  airbnb: {
    name: 'Airbnb',
    cashback: 5,
    logo: '/merchants/airbnb.png',
    url: 'https://www.airbnb.com',
  },
};

interface Props {
  params: {
    merchant: string;
  };
}

export default function OfferPage({ params }: Props) {
  const merchantData = merchants[params.merchant as keyof typeof merchants];

  if (!merchantData) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <h1>Merchant not found.</h1>
      </main>
    );
  }

  // Redirection auto après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = merchantData.url;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center text-white"
      style={{
        background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      }}
    >
      <Image
        src={merchantData.logo}
        alt={merchantData.name}
        width={80}
        height={80}
        className="mb-4 max-h-[48px]"
      />
      <h1 className="mb-2 text-3xl font-bold">
        You're earning {merchantData.cashback}% Bitcoin back!
      </h1>
      <p className="mb-6 text-white/80">You are being redirected to {merchantData.name}...</p>
      <a
        href={merchantData.url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-orange-500 px-8 py-3 text-base font-semibold text-white hover:bg-orange-600"
      >
        Go to {merchantData.name} now
      </a>
      <p className="mt-4 text-sm text-white/50">
        If you are not redirected automatically, click the button.
      </p>
    </main>
  );
}
