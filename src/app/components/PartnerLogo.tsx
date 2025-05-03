interface PartnerLogoProps {
  logoSrc: string;
  logoAlt: string;
}

export default function PartnerLogo({ logoSrc, logoAlt }: PartnerLogoProps) {
  return (
    <img
      src={logoSrc}
      alt={logoAlt}
      className="h-8 object-contain opacity-80"
    />
  );
}
