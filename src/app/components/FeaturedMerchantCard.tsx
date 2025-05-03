import Image from "next/image";

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
      className="rounded-lg p-6 flex flex-col items-center justify-center w-[250px] h-[250px] text-center"
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
          style={{ objectFit: "contain" }}
          sizes="(max-width: 250px) 120px"
        />
      </div>
      <p className="text-orange-400 text-[64px] font-semibold leading-none">
        {cashbackPercent}%
      </p>
      <p className="text-white text-[24px] font-semibold mt-2">Bitcoin back</p>
    </div>
  );
}
