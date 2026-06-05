import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Landmark, FileText, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";

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

const reasons = [
  {
    title: "Property Investment Expertise",
    body: "Identify opportunities based on cash flow, yield and long-term growth potential.",
  },
  {
    title: "Specialist Mortgage Advice",
    body: "Access lenders and products designed for investors and portfolio landlords.",
  },
  {
    title: "Tax-Efficient Structures",
    body: "Understand the benefits of personal ownership, SPVs and limited company investing.",
  },
  {
    title: "End-to-End Support",
    body: "From initial enquiry through purchase, finance and portfolio growth.",
  },
  {
    title: "International Investor Support",
    body: "Helping clients from the UK, UAE, India and overseas markets.",
  },
];

const markets = ["United Kingdom", "Dubai", "India"];

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

          {/* Headline — all white */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-serif font-bold text-white leading-[1.15] tracking-tight">
            Property Investment,{" "}
            Mortgage &amp; Tax Enquiry Hub
          </h1>

          {/* Sub-copy */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
            We combine property investment insight, mortgage expertise and tax awareness to help
            clients create clear, sustainable investment strategies. Whether you're purchasing your
            first Buy-to-Let or scaling a portfolio, our goal is to simplify the process and help
            you move forward with confidence.
          </p>

          {/* Markets — high-visibility gold pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {markets.map((market) => (
              <span key={market} className="market-pill">
                <Globe className="w-4 h-4" />
                {market}
              </span>
            ))}
          </div>

          {/* Why section */}
          <div className="why-box mt-6 w-full max-w-2xl text-left">
            <h2 className="text-xl font-semibold text-white mb-5 text-center">
              Why Investors Choose Magic Key Property
            </h2>
            <ul className="flex flex-col gap-4">
              {reasons.map(({ title, body }) => (
                <li key={title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#C9981F" }} />
                  <div>
                    <span className="font-semibold text-white">{title}</span>
                    <span className="text-gray-400"> — {body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Single-line separator ──────────────────────────────────────────────── */}
      <div className="section-divider" />

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
                <div className="card-glow" />
                <div className="relative z-10 flex flex-col h-full gap-6 p-8">
                  <div className="icon-wrap">
                    <Icon className="w-6 h-6" style={{ color: "#C9981F" }} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
                  </div>
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
