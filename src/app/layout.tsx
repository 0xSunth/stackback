import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'StackBack - Earn Bitcoin cashback at your favorite stores.',
  description: 'Earn Bitcoin cashback at your favorite stores.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 🔶 Top banner
      <div className="w-full bg-orange-500 text-center text-sm font-medium text-white py-2">
        Join the waitlist and earn a +5% bonus in Bitcoin on your first payout
      </div> */}
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
