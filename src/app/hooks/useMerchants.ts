import { useEffect, useState } from 'react';
import { Merchant } from '../utils/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useMerchants = ({ page = 1, limit = 12 }: { page?: number; limit?: number }) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!API_URL) {
      setErrors(['API_URL is not defined.']);
      return;
    }

    const fetchMerchants = async () => {
      try {
        const query = new URLSearchParams();
        query.append('page', page.toString());
        query.append('limit', limit.toString());

        const response = await fetch(`${API_URL}/api/merchants?${query.toString()}`);
        const result = await response.json();
        if (result.length != 0) {
          setMerchants(result.merchants);
        } else {
          const errorMessage = result.errors || result.error || 'Unknown error';
          if (Array.isArray(errorMessage)) {
            setErrors(errorMessage);
          } else {
            setErrors([errorMessage]);
          }
        }
      } catch (error) {
        setErrors(['Network or server error.']);
        console.error('Failed to fetch merchants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, [page, limit]);

  return { merchants, errors, loading };
};
