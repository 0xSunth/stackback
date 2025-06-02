import HeaderLayout from '../components/layouts/HeaderLayout';

const articles = [
  {
    title: 'What Is Bitcoin?',
    description:
      "Understand the basics of Bitcoin, how it works, and why it matters in today's digital economy.",
    image: '/articles/what-is-bitcoin.png',
  },
  {
    title: 'How to Store Bitcoin Safely',
    description:
      'Learn how to use wallets securely, avoid risks, and store your Bitcoin like a pro.',
    image: '/articles/store-bitcoin.png',
  },
  {
    title: 'What is Blockchain? A 2-Minute Guide',
    description:
      'Explore how blockchain technology powers Bitcoin and builds trust through decentralization.',
    image: '/articles/what-is-blockchain.png',
  },
  {
    title: 'How to Earn Bitcoin Without Buying It',
    description:
      'Discover legit ways to earn Bitcoin online with tips and affiliate opportunities.',
    image: '/articles/earn-bitcoin.png',
  },
  {
    title: 'Best VPNs That Pay You Back in BTC',
    description:
      'Discover privacy-first VPN services that offer cashback or rewards in Bitcoin for using their service.',
    image: '/articles/btc-vpns.png',
  },
  {
    title: 'Starknet User Onboarding',
    description:
      'A beginner-friendly guide to getting started on Starknet — from installing a wallet to linked it to StackBack',
    image: '/articles/starknet-onboarding.png',
  },
];

export default function BlogPage() {
  return (
    <HeaderLayout>
      <div className="mx-auto mt-8 mb-6 max-w-6xl text-left">
        <h1 className="mb-8 text-4xl font-bold">Articles</h1>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold text-black">{article.title}</h2>
                <p className="text-sm text-gray-600">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HeaderLayout>
  );
}
