import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home as HomeIcon, Landmark, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto px-4 py-16 md:py-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-full mb-6 text-primary">
            <ShieldCheck className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium tracking-wide uppercase">Trusted Advisory</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Property Investment, Mortgage & Tax Enquiry Hub
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Helping clients structure property investments, finance, tax and limited company setup with confidence. Select an option below to begin your enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Landmark className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">BTL Property Investment</CardTitle>
              <CardDescription className="text-base mt-2">
                Enquire about portfolio building, buy-to-let investments, HMOs, and commercial conversions.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/btl">
                <Button className="w-full group" variant="default">
                  Start Enquiry
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <HomeIcon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Mortgage Advice</CardTitle>
              <CardDescription className="text-base mt-2">
                Get help with residential, buy-to-let, remortgaging, bridging finance, and product transfers.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/mortgage">
                <Button className="w-full group" variant="default">
                  Start Enquiry
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Tax & Accounting</CardTitle>
              <CardDescription className="text-base mt-2">
                Limited company setup, property tax planning, annual accounts, and bookkeeping services.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6">
              <Link href="/tax">
                <Button className="w-full group" variant="default">
                  Start Enquiry
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 p-6 bg-muted/50 rounded-lg border border-border/50 text-center max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important Disclaimer:</strong> This portal collects enquiries only. No regulated mortgage, investment, tax or legal advice is given here. All recommendations are provided only after a full review by a qualified professional.
          </p>
        </div>
      </div>
    </Layout>
  );
}
