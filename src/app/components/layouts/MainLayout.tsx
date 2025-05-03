import Image from "next/image";
import Link from "next/link";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main
      className="min-h-screen w-full text-white pb-20 px-4"
      style={{
        background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      }}
    >
      {/* Header global */}
      <header className="flex items-center justify-between py-6 max-w-6xl mx-auto gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/bitcoin.png" alt="logo" width={32} height={32} />
          <span className="font-semibold text-2xl">StackBack</span>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-lg font-medium items-center">
          <Link 
            href="/merchants" 
            className="relative text-white/80 hover:text-white transition hover:underline hover:decoration-2 hover:underline-offset-8 hover:decoration-orange-500"
          >
            Merchants
          </Link>
          <Link 
            href="/dashboard" 
            className="relative text-white/80 hover:text-white transition hover:underline hover:decoration-2 hover:underline-offset-8 hover:decoration-orange-500"
          >
            Dashboard
          </Link>
        </nav>

        {/* Login button */}
        <Link 
            href="/login" 
            className="text-sm text-white border border-orange-500 px-4 py-2 rounded-lg whitespace-nowrap 
            transition duration-300 ease-in-out hover:bg-orange-500/20 hover:text-white hover:border-orange-400"
            >
            Login
        </Link>
      </header>

      {/* Page content */}
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
}
