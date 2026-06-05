import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Landmark, FileText, Globe, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Landmark,
    title: "BTL Property Investment",
    description:
      "Portfolio building, buy-to-let, HMOs, serviced accommodation and commercial conversions — UK, Dubai & India.",
    href: "/btl",
    testId: "button-btl-enquiry",
  },
  {
    icon: Building2,
    title: "Mortgage Advice",
    description:
      "First-time buyer, buy-to-let, remortgage, product transfer, limited company BTL and bridging finance.",
    href: "/mortgage",
    testId: "button-mortgage-enquiry",
  },
  {
    icon: FileText,
    title: "Tax & Accounting",
    description:
      "Limited company setup, SPV formation, property tax planning, self-assessment, corporation tax and bookkeeping.",
    href: "/tax",
    testId: "button-tax-enquiry",
  },
];

export default function HomePage() {
  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[88vh] flex flex-col items-center justify-center overflow-hidden hero-section">

        {/* Ambient glow orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-[0.04]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center flex flex-col items-center gap-8">

          {/* Badge */}
          <div className="badge-pill">
            <ShieldCheck className="w-3.5 h-3.5" />
            Strategic Investment · Global Reach
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-serif font-bold text-white leading-[1.15] tracking-tight">
            Property Investment,{" "}
            <span className="gold-text">Mortgage</span>
            {" "}&amp;{" "}
            <span className="gold-text">Tax</span>{" "}
            Enquiry Hub
          </h1>

          {/* Sub-copy */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
            We combine property investment insight, mortgage expertise and tax awareness to help
            clients create clear, sustainable investment strategies. Whether you're purchasing your
            first Buy-to-Let or scaling a portfolio, our goal is to simplify the process and help
            you move forward with confidence.
          </p>

          {/* Markets */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mt-2">
            {["United Kingdom", "Dubai", "India"].map((market) => (
              <span key={market} className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 gold-icon" />
                {market}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Link href="/btl">
              <Button className="cta-primary px-7 py-3 text-base font-semibold rounded-full shadow-lg">
                Start an Enquiry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,55 L1440,100 L0,100 Z"
              fill="var(--wave-fill)"
            />
          </svg>
        </div>
      </section>

      {/* ── Service cards ─────────────────────────────────────────────────────── */}
      <section className="relative w-full cards-section">
        <div className="container mx-auto px-4 py-20 md:py-28 max-w-6xl">

          {/* Section label */}
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] mb-12" style={{ color: "#C9981F" }}>
            Our Services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map(({ icon: Icon, title, description, href, testId }) => (
              <div key={href} className="service-card group">
                {/* Gold glow spot on hover */}
                <div className="card-glow" />

                <div className="relative z-10 flex flex-col h-full gap-6 p-8">
                  {/* Icon */}
                  <div className="icon-wrap">
                    <Icon className="w-6 h-6" style={{ color: "#C9981F" }} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
                  </div>

                  {/* CTA */}
                  <Link href={href}>
                    <Button
                      data-testid={testId}
                      className="w-full group/btn text-white font-semibold rounded-full"
                      style={{ backgroundColor: "#C9981F" }}
                    >
                      Start Enquiry
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="disclaimer-bar mt-16 max-w-4xl mx-auto">
            <p className="text-sm text-gray-500 leading-relaxed text-center">
              <strong className="text-gray-300">Important Disclaimer:</strong> This portal collects
              enquiries only. No regulated mortgage, investment, tax or legal advice is given here.
              All recommendations are provided only after a full review by a qualified professional.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
