import OfferClient from '@/app/components/OfferClient';
import { use } from 'react';

export default function OfferPage({ params }: { params: Promise<{ merchantSlug: string }> }) {
  const { merchantSlug } = use(params);

  return <OfferClient merchantSlug={merchantSlug} />;
}
