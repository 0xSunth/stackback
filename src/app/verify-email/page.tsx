import Link from 'next/link';
import Image from 'next/image';

export default function VerifyEmailPage() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#121212] px-4 text-white"
      style={{
        background: 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      }}
    >
      <div className="w-full max-w-md rounded-xl border border-[#33383E] bg-[#1B1E22] p-8 text-center shadow-lg">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Image src="/bitcoin.png" alt="logo" width={32} height={32} />
          <span className="text-2xl font-semibold">StackBack</span>
        </div>

        <h1 className="mb-2 text-3xl font-bold">Check Your Email</h1>
        <p className="mb-6 text-sm text-white/70">
          We've sent a verification link to your email address.
          <br />
          Please click the link to confirm your account.
        </p>

        <p className="mt-4 text-center text-sm text-white/50">
          <Link href="/" className="text-white transition hover:text-orange-500">
            ← Back to Site
          </Link>
        </p>
      </div>
    </main>
  );
}
