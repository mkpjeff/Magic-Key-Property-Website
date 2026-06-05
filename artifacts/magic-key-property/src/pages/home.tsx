import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Landmark, FileText, Globe, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <Layout>
      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <section
        className="w-full"
        style={{ backgroundColor: "#0f1117" }}
      >
        <div className="container mx-auto px-4 py-20 md:py-28 max-w-6xl text-center">
          {/* BRANDING: Badge above headline */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 border"
            style={{ color: "#C9981F", borderColor: "#C9981F44", backgroundColor: "#C9981F0f" }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Strategic Investment · Global Reach
          </div>

          {/* BRANDING: Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Property Investment,<br />Mortgage &amp; Tax Enquiry Hub
          </h1>

          {/* BRANDING: Subheading */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            We combine property investment insight, mortgage expertise and tax awareness to help clients create clear, sustainable investment strategies. Whether you're purchasing your first Buy-to-Let or scaling a portfolio, our goal is to simplify the process and help you move forward with confidence.
          </p>

          {/* Markets served — from business card */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" style={{ color: "#C9981F" }} />
              United Kingdom
            </span>
            <span className="text-gray-700">·</span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" style={{ color: "#C9981F" }} />
              Dubai
            </span>
            <span className="text-gray-700">·</span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" style={{ color: "#C9981F" }} />
              India
            </span>
          </div>
        </div>
      </section>

      {/* ── Service cards ────────────────────────────────────────────────────── */}
      <section className="w-full bg-background">
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* BTL Investment */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/60 bg-card group">
              <CardHeader>
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-4 transition-colors"
                  style={{ backgroundColor: "#C9981F18" }}
                >
                  <Landmark className="w-6 h-6" style={{ color: "#C9981F" }} />
                </div>
                <CardTitle className="text-xl">BTL Property Investment</CardTitle>
                <CardDescription className="text-base mt-2">
                  Portfolio building, buy-to-let, HMOs, serviced accommodation and commercial conversions — UK, Dubai &amp; India.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-6">
                <Link href="/btl">
                  <Button
                    className="w-full group/btn text-white font-semibold"
                    style={{ backgroundColor: "#C9981F", borderColor: "#C9981F" }}
                    data-testid="button-btl-enquiry"
                  >
                    Start Enquiry
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mortgage */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/60 bg-card group">
              <CardHeader>
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#C9981F18" }}
                >
                  <Building2 className="w-6 h-6" style={{ color: "#C9981F" }} />
                </div>
                <CardTitle className="text-xl">Mortgage Advice</CardTitle>
                <CardDescription className="text-base mt-2">
                  First-time buyer, buy-to-let, remortgage, product transfer, limited company BTL and bridging finance.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-6">
                <Link href="/mortgage">
                  <Button
                    className="w-full group/btn text-white font-semibold"
                    style={{ backgroundColor: "#C9981F", borderColor: "#C9981F" }}
                    data-testid="button-mortgage-enquiry"
                  >
                    Start Enquiry
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tax & Accounting */}
            <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/60 bg-card group">
              <CardHeader>
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#C9981F18" }}
                >
                  <FileText className="w-6 h-6" style={{ color: "#C9981F" }} />
                </div>
                <CardTitle className="text-xl">Tax &amp; Accounting</CardTitle>
                <CardDescription className="text-base mt-2">
                  Limited company setup, SPV formation, property tax planning, self-assessment, corporation tax and bookkeeping.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-6">
                <Link href="/tax">
                  <Button
                    className="w-full group/btn text-white font-semibold"
                    style={{ backgroundColor: "#C9981F", borderColor: "#C9981F" }}
                    data-testid="button-tax-enquiry"
                  >
                    Start Enquiry
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="mt-14 p-5 rounded border border-border/60 bg-muted/40 text-center max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important Disclaimer:</strong> This portal collects enquiries only. No regulated mortgage, investment, tax or legal advice is given here. All recommendations are provided only after a full review by a qualified professional.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
