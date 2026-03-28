import ServicesSection from "@/components/ServicesSection";

export const metadata = {
  title: "Financial Services | FinGuide",
  description: "Find SEBI-registered advisors for EPF, NRI services, mutual funds, insurance, and more.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <ServicesSection />
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-gray-600 text-xs max-w-2xl mx-auto">
          FinGuide is a discovery platform only. We do not provide investment advice. All advisors are independently SEBI registered.
        </p>
      </footer>
    </main>
  );
}