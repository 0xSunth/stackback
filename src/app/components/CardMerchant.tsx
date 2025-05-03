interface CardMerchantProps {
  logoSrc: string;
  logoAlt: string;
  cashbackPercent: number;
}

export default function CardMerchant({
  logoSrc,
  logoAlt,
  cashbackPercent,
}: CardMerchantProps) {
  return (
    <div
    className="rounded-lg p-6 flex flex-col items-center justify-center w-[250px] h-[250px] text-center"
    style={{
      backgroundColor: '#1B1E22',
      border: '1px solid #33383E',
      boxSizing: 'border-box',
    }}
>
      <img src={logoSrc} alt={logoAlt} className="h-12 mb-4" />
      <p className="text-orange-400 text-[64px] font-semibold leading-none">{cashbackPercent}%</p>
      <p className="text-white text-[24px] font-semibold mt-2">Bitcoin back</p>
    </div>
  );
}