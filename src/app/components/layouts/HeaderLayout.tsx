import Image from 'next/image';
import Link from 'next/link';
import AuthButton from '@/app/components/AuthButton';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export default function HeaderLayout({ children }: HeaderLayoutProps) {
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
          <Link
            href="/merchants"
            className="relative text-white/80 transition hover:text-white hover:underline hover:decoration-orange-500 hover:decoration-2 hover:underline-offset-8"
          >
            Merchants
          </Link>
          <Link
            href="/dashboard"
            className="relative text-white/80 transition hover:text-white hover:underline hover:decoration-orange-500 hover:decoration-2 hover:underline-offset-8"
          >
            Dashboard
          </Link>
        </nav>

        {/* Login button */}
        <AuthButton />
      </header>

      {/* Page content */}
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
