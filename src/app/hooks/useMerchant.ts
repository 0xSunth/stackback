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
        const response = await fetch(`/api/merchants?name=${encodeURIComponent(name)}`);
        const result = await response.json();
        if (result.length != 0) {
          setMerchant(result.merchants);
        } else {
          const errorMessage = result.errors || result.error || 'Unknown error';
          if (Array.isArray(errorMessage)) {
            setErrors(errorMessage);
          } else {
            setErrors([errorMessage]);
          }
        }
      } catch (err: any) {
        setErrors(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchant();
  }, [name]);

  return { merchant, loading, errors };
}
