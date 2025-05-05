import Image from 'next/image';

interface PartnerLogoProps {
  logoSrc: string;
  logoAlt: string;
}

export default function PartnerLogo({ logoSrc, logoAlt }: PartnerLogoProps) {
  return (
    <Image
      src={logoSrc}
      alt={logoAlt}
      width={96} // ou une taille adaptée
      height={32}
      className="object-contain opacity-80"
    />
  );
}
