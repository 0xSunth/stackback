import Image from 'next/image';
import CardMerchant from '@/app/components/CardMerchant';
import PartnerLogo from '@/app/components/PartnerLogo';

export default function Home() {
  const merchants = [
    {
      logoSrc: "/merchants/amazon.png",
      logoAlt: "Amazon",
      cashbackPercent: 8,
    },
    {
      logoSrc: "/merchants/walmart.png",
      logoAlt: "Walmart",
      cashbackPercent: 3,
    },
    {
      logoSrc: "/merchants/nike.png",
      logoAlt: "Nike",
      cashbackPercent: 6,
    },
    {
      logoSrc: "/merchants/airbnb.png",
      logoAlt: "Airbnb",
      cashbackPercent: 5,
    },
  ];

  const partners = [
    {
      logoSrc: "/partners/alby.png",
      logoAlt: "Alby",
    },
    {
      logoSrc: "/partners/bitrefill.png",
      logoAlt: "Bitrefill",
    },
    {
      logoSrc: "/partners/fold.png",
      logoAlt: "Fold",
    },
    {
      logoSrc: "/partners/strike.png",
      logoAlt: "Strike",
    },
  ];
  
  return (
    <main 
      className="min-h-screen flex flex-col justify-start h-full w-full text-white pb-20"
      style={{ background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)' }}
    >
      <div className="max-w-[1280px] mx-auto px-0">
      
        {/* Header */}
        <header className="w-full flex justify-center py-6">
          <div className="flex items-center gap-2">
            <Image src={'/bitcoin.png'} alt={'logo'} width={32} height={32} />
            <span className="font-semibold text-2xl">StackBack</span>
          </div>
        </header>

        {/* Hero content */}
        <section className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <p className="text-lg font-bold text-orange-400 tracking-wide uppercase">
            GET BITCOIN BACK
          </p>
          <h1 className="text-4xl md:text-[56px] font-extrabold mt-2 whitespace-nowrap">
            Earn Bitcoin on Your Purchases
          </h1>
          <p className="text-lg text-gray-300 mt-4 max-w-xl whitespace-nowrap">
            Get up to 10% Bitcoin back when you shop at your favorite stores.
          </p>
        </section>

        {/* Cards merchants */}
        <section className="flex flex-wrap justify-center gap-[24px] mt-16 w-full max-w-full">
          {merchants.map((merchant, index) => (
            <CardMerchant
              key={index}
              logoSrc={merchant.logoSrc}
              logoAlt={merchant.logoAlt}
              cashbackPercent={merchant.cashbackPercent}
            />
          ))}
        </section>


        {/* Call to action */}
        <div className="flex flex-col items-center mt-16">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg text-base min-w-[240px]">
            Start Earning Bitcoin
          </button>
          <p className="text-gray-400 text-sm italic mt-2">
            Trusted by 1,500+ Bitcoiners
          </p>
        </div>

        {/* Logos partenaires */}
        <div className="flex flex-col items-center mt-10 mb-8">
          <p className="text-white text-sm mb-4">Partnered with</p>
          <div className="flex flex-wrap justify-center items-center gap-[24px]">
            {partners.map((partner, index) => (
              <PartnerLogo
                key={index}
                logoSrc={partner.logoSrc}
                logoAlt={partner.logoAlt}
              />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
