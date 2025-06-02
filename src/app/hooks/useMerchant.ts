import { useEffect, useState } from 'react';
import { Merchant } from '../utils/types';

export function useMerchant(name: string) {
  const [merchant, setMerchant] = useState<Merchant>();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!name) return;

    const fetchMerchant = async () => {
      try {
        setLoading(true);
        setErrors([]);
        const response = await fetch(`/api/merchants/${encodeURIComponent(name)}`);
        const result = await response.json();

        if (response.ok && result.merchant) {
          setMerchant(result.merchant);
        } else {
          const errorMessage = result.errors || result.error || 'Unknown error';
          setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setErrors([err.message || 'Failed to fetch merchant.']);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchant();
  }, [name]);

  return { merchant, loading, errors };
}