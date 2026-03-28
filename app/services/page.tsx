import ServicesSection from "@/components/ServicesSection";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Financial Services — EPF, NRI, Mutual Funds & More",
  description: "Find SEBI-registered advisors for EPF guidance, NRI services, mutual funds, insurance, bonds, NPS, and more. First session free.",
  openGraph: {
    title: "ZeroBias Financial Services — Find the Right SEBI Advisor",
    description: "Expert guidance on EPF, NRI planning, mutual funds, insurance, bonds, NPS, and inheritance — from verified SEBI advisors.",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <ServicesSection />
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">
          ZeroBias is a discovery platform only. We do not provide investment advice. All advisors are independently SEBI registered.
        </p>
      </footer>
    </main>
  );
}