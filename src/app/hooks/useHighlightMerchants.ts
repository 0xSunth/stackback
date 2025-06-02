import { useEffect, useState } from 'react';
import { Merchant } from '../utils/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useHighlightMerchants = ({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!API_URL) {
      setErrors(['API_URL is not defined.']);
      return;
    }

    const fetchHighlightMerchants = async () => {
      try {
        const query = new URLSearchParams();
        query.append('page', page.toString());
        query.append('limit', limit.toString());

        const response = await fetch(`${API_URL}/api/merchants/highlight?${query.toString()}`);
        if (response.ok) {
          const result = await response.json();
          setMerchants(result.merchants || []);

          if ((result.merchants || []).length === 0) {
            setErrors(['No merchants found.']);
          } else {
            setErrors([]);
          }
        } else {
          const errorMessage = (await response.json()).error || 'Failed to fetch merchants.';
          setErrors([errorMessage]);
        }
      } catch (error) {
        setErrors(['Network or server error.']);
        console.error('Failed to fetch merchants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlightMerchants();
  }, [page, limit]);

  return { merchants, errors, loading };
};
