import Image from "next/image";
import Link from "next/link";

interface MerchantListCardProps {
  name: string;
  cashback: number;
  logo: string;
  partner: boolean;
}

export default function MerchantListCard({
  name,
  cashback,
  logo,
  partner,
}: MerchantListCardProps) {
  const merchantSlug = name.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="relative rounded-lg border border-[#33383E] bg-[#1B1E22] p-6 flex flex-col items-center justify-center text-center gap-4 transition-transform hover:scale-[1.02]">
      
      {partner && (
        <span className="absolute top-2 right-2 bg-orange-500 text-xs font-semibold text-white px-2 py-1 rounded-full">
          Partner
        </span>
      )}

      <Image
        src={logo}
        alt={name}
        width={64}
        height={64}
        loading="lazy"
        className="object-contain max-w-[72px] max-h-[48px]"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="text-xs sm:text-sm text-orange-400 bg-[#33383E] rounded-full px-3 py-1 whitespace-nowrap">
        Up to {cashback}% Bitcoin back
      </div>
      <Link 
        href={`/offer/${merchantSlug}`}
        className="mt-2 text-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
      >
        View Offer
      </Link>
    </div>
  );
}
