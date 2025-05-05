import { useState } from 'react';

type LoginData = {
  email: string;
  password: string;
};

export function useLogin() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function login({ email, password }: LoginData) {
    setErrors([]);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        window.location.href = result.redirect;
      } else {
        const fieldErrors = result.errors || {};
        const apiErrors: string[] = [];

        // Si le back renvoie { errors: { email: [...], password: [...] } }
        for (const key in fieldErrors) {
          const errs = fieldErrors[key as keyof typeof fieldErrors];
          if (errs) apiErrors.push(...errs);
        }

        if (apiErrors.length === 0) {
          apiErrors.push(result.message || 'Unknown error.');
        }

        setErrors(apiErrors);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setErrors(['An unexpected error occurred.']);
    } finally {
      setLoading(false);
    }
  }

  return { login, errors, loading };
}
