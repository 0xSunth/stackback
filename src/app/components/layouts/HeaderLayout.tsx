'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import AuthButton from '@/app/components/AuthButton';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/merchants', label: 'Merchants' },
    { href: '/blog', label: 'Learn' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <main
      className="min-h-screen w-full px-4 pb-20 text-white"
      style={{
        background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      }}
    >
      {/* Header global */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-8 py-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/bitcoin.png" alt="logo" width={32} height={32} />
          <span className="text-2xl font-semibold">StackBack</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-lg font-medium">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'relative transition hover:text-white hover:underline hover:decoration-orange-500 hover:decoration-2 hover:underline-offset-8',
                  isActive
                    ? 'text-white underline decoration-orange-500 decoration-2 underline-offset-8'
                    : 'text-white/80',
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Login button */}
        <AuthButton />
      </header>

      {/* Page content */}
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
