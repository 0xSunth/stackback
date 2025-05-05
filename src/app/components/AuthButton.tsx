'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AuthButton() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((data) => setUserId(data.userId ?? null))
      .catch(() => setUserId(null));
  }, []);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  if (userId) {
    return (
      <button
        onClick={logout}
        className="cursor-pointer rounded-lg border border-orange-500 px-4 py-2 text-sm whitespace-nowrap text-white transition duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-500/20 hover:text-white"
      >
        Disconnect
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-lg border border-orange-500 px-4 py-2 text-sm whitespace-nowrap text-white transition duration-300 ease-in-out hover:border-orange-400 hover:bg-orange-500/20 hover:text-white"
    >
      Login
    </Link>
  );
}
