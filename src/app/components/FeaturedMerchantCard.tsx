import Image from 'next/image';

interface FeaturedMerchantCardProps {
  logoSrc: string;
  logoAlt: string;
  cashbackPercent: number;
}

export default function FeaturedMerchantCard({
  logoSrc,
  logoAlt,
  cashbackPercent,
}: FeaturedMerchantCardProps) {
  return (
    <div
      className="flex h-[250px] w-[250px] flex-col items-center justify-center rounded-lg p-6 text-center"
      style={{
        backgroundColor: '#1B1E22',
        border: '1px solid #33383E',
        boxSizing: 'border-box',
      }}
    >
      <div className="relative mb-4" style={{ width: 120, height: 48 }}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 250px) 120px"
        />
      </div>
      <p className="text-[64px] leading-none font-semibold text-orange-400">{cashbackPercent}%</p>
      <p className="mt-2 text-[24px] font-semibold text-white">Bitcoin back</p>
    </div>
  );
}
