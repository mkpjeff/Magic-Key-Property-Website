import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Globe } from "lucide-react";
import logoMk from "@/assets/logo-mk.png";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // BRANDING: Change business name here
  const businessName = "Magic Key Property";

  // BRANDING: Change tagline here
  const tagline = "Strategic Investment. Global Reach.";

  // CONTACT: Change phone number here
  const phoneNumber = "+44 7775 359 351";

  // CONTACT: Change email address here
  const emailAddress = "mahudes@magickeyproperty.com";

  // CONTACT: Change website here
  const website = "www.magickeyproperty.com";

  const navigation = [
    { name: "Home", href: "/" },
    { name: "BTL Investment", href: "/btl" },
    { name: "Mortgage", href: "/mortgage" },
    { name: "Tax & Accounting", href: "/tax" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">

      {/* ── Header: deep charcoal matching the business card dark panel ── */}
      <header style={{ backgroundColor: "#0f1117" }} className="sticky top-0 z-50 w-full">
        <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8 max-w-6xl">

          {/* BRANDING: Logo — swap logo-mk.png in src/assets to change */}
          <Link href="/" className="flex items-center group" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={logoMk}
              alt={businessName}
              className="h-20 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded transition-colors"
                style={
                  location === item.href
                    ? { color: "#C9981F", fontWeight: 600 }
                    : { color: "#9ca3af" }
                }
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CONTACT: Phone in header (desktop) */}
          <div className="hidden md:flex items-center gap-1 pl-4 border-l border-white/10">
            <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: "#C9981F" }} />
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
            >
              {phoneNumber}
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div style={{ backgroundColor: "#191c24" }} className="md:hidden border-t border-white/10">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1 max-w-6xl">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 px-2 text-base font-medium border-b border-white/5 last:border-0 transition-colors"
                  style={location === item.href ? { color: "#C9981F" } : { color: "#d1d5db" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 flex flex-col gap-3">
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Phone className="h-4 w-4" style={{ color: "#C9981F" }} />
                  {phoneNumber}
                </a>
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Mail className="h-4 w-4" style={{ color: "#C9981F" }} />
                  {emailAddress}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center">
        {children}
      </main>

      {/* ── Footer: matching charcoal ── */}
      <footer style={{ backgroundColor: "#0f1117" }} className="border-t border-white/10">
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Brand block */}
            <div className="flex flex-col gap-3">
              {/* BRANDING: Footer logo */}
              <img
                src={logoMk}
                alt={businessName}
                className="h-16 w-auto object-contain self-start"
              />
              {/* BRANDING: Tagline in footer */}
              <p className="text-xs tracking-widest uppercase" style={{ color: "#C9981F" }}>{tagline}</p>
              <p className="text-sm text-gray-400 leading-relaxed mt-1">
                Helping clients structure property investments, finance, tax and limited company setup with confidence.
              </p>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-white mb-1 uppercase tracking-wide">Our Services</h4>
              <Link href="/btl" className="text-sm text-gray-400 hover:text-white transition-colors">BTL Property Investment</Link>
              <Link href="/mortgage" className="text-sm text-gray-400 hover:text-white transition-colors">Mortgage Advice</Link>
              <Link href="/tax" className="text-sm text-gray-400 hover:text-white transition-colors">Tax &amp; Accounting</Link>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white mb-1 uppercase tracking-wide">Contact</h4>
              {/* CONTACT: Footer phone */}
              <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0" style={{ color: "#C9981F" }} />
                {phoneNumber}
              </a>
              {/* CONTACT: Footer email */}
              <a href={`mailto:${emailAddress}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 shrink-0" style={{ color: "#C9981F" }} />
                {emailAddress}
              </a>
              {/* CONTACT: Footer website */}
              <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Globe className="h-4 w-4 shrink-0" style={{ color: "#C9981F" }} />
                {website}
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 max-w-md text-left md:text-right leading-relaxed">
              This website collects enquiries only. No regulated mortgage, investment, tax or legal advice is provided. All advice follows a full review by a qualified professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
