import Image from 'next/image';
import Link from 'next/link';

interface MerchantListCardProps {
  name: string;
  cashback: number;
  logo: string;
  partner: boolean;
}

export default function MerchantListCard({ name, cashback, logo, partner }: MerchantListCardProps) {
  const merchantSlug = name.toLowerCase().replace(/\s+/g, '');

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border border-[#33383E] bg-[#1B1E22] p-6 text-center transition-transform hover:scale-[1.02]">
      {partner && (
        <span className="absolute top-2 right-2 rounded-full bg-orange-500 px-2 py-1 text-xs font-semibold text-white">
          Partner
        </span>
      )}

      <Image
        src={logo}
        alt={name}
        width={80}
        height={80}
        loading="lazy"
        className="mx-auto h-20 w-20 object-contain"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="rounded-full bg-[#33383E] px-3 py-1 text-xs whitespace-nowrap text-orange-400 sm:text-sm">
        Up to {cashback}% Bitcoin back
      </div>
      <Link
        href={`/offer/${merchantSlug}`}
        className="mt-2 cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
      >
        View Offer
      </Link>
    </div>
  );
}
