import { useState } from 'react';

export function useCreateCashbackRequest() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function createRequest({
    file,
    merchantId,
    amount,
    currency,
    purchasedAt,
  }: {
    file: File;
    merchantId: string;
    amount: number;
    currency: string;
    purchasedAt: string;
  }) {
    setErrors([]);
    setLoading(true);
    setSubmitted(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('merchantId', merchantId);
      formData.append('amount', amount.toString());
      formData.append('currency', currency);
      formData.append('purchasedAt', purchasedAt);

      const response = await fetch('/api/upload-receipt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        window.location.href = result.redirect;
      } else {
        const errorMessage = result.errors || result.error || 'Unknown error';
        setErrors(Array.isArray(errorMessage) ? errorMessage : [errorMessage]);
      }
    } catch (err) {
      console.error('Request failed:', err);
      setErrors(['Network or server error.']);
    } finally {
      setLoading(false);
    }
  }

  return { createRequest, errors, loading, submitted };
}
