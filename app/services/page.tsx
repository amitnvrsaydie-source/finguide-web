import PackagesSection from "@/components/PackagesSection";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Financial Packages | Unbiased Financial Advice",
  description: "Choose a financial package tailored to your needs. Our unbiased, fee-only advisors provide honest advice. No payment asked.",
  openGraph: {
    title: "ZeroBias Financial Packages | Unbiased Advice",
    description: "Investment Kickstart, Portfolio Review, Tax Planning, NRI Services, Retirement & more - matched to an unbiased advisor, no sales pitch.",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <PackagesSection />
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">
          ZeroBias connects you with unbiased, fee-only advisors. Advisors earn only from client fees - never from product commissions.
        </p>
      </footer>
    </main>
  );
}