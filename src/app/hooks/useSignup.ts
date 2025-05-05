import { useState } from 'react';

export function useSignup() {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function signup(email: string, password: string, confirmPassword: string) {
    setErrors([]);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, confirmPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        window.location.href = result.redirect;
      } else {
        const errorMessage = result.errors || result.error || 'Unknown error';
        if (Array.isArray(errorMessage)) {
          setErrors(errorMessage);
        } else {
          setErrors([errorMessage]);
        }
      }
    } catch (err) {
      setErrors(['Network or server error.']);
      console.error('Signup failed:', err);
    } finally {
      setLoading(false);
    }
  }

  return { signup, errors, loading };
}
