import { useEffect, useState } from 'react';
import { CashbackRequestWithRelations } from '../utils/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useCashbackRequests = ({
  page = 1,
  limit = 12,
}: {
  page?: number;
  limit?: number;
}) => {
  const [cashbackRequests, setCashbackRequests] = useState<CashbackRequestWithRelations[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!API_URL) {
      setErrors(['API_URL is not defined.']);
      return;
    }

    const fetchCashbackRequests = async () => {
      try {
        const query = new URLSearchParams();
        query.append('page', page.toString());
        query.append('limit', limit.toString());

        const response = await fetch(`${API_URL}/api/cashback/requests?${query.toString()}`);
        const result = await response.json();
        if (result.length != 0) {
          setCashbackRequests(result.cashbackRequests);
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
        console.error('Failed to fetch cashback request:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCashbackRequests();
  }, [page, limit]);

  return { cashbackRequests, setCashbackRequests, errors, loading };
};
