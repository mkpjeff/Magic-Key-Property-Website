import React, { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  // BRANDING: Change business name here
  const businessName = "Magic Key Property";
  
  // CONTACT: Change phone number here
  const phoneNumber = "0800 000 0000";

  const navigation = [
    { name: "Home", href: "/" },
    { name: "BTL Investment", href: "/btl" },
    { name: "Mortgage", href: "/mortgage" },
    { name: "Tax & Accounting", href: "/tax" },
  ];

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 max-w-5xl">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-serif font-bold text-lg text-primary hidden sm:inline-block">
              {businessName}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1 text-sm font-medium">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    location === item.href
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="hidden md:flex items-center ml-2 border-l pl-4">
              <span className="text-sm font-medium text-primary">Call us: {phoneNumber}</span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium py-2 ${
                        location === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm text-muted-foreground block mb-1">Contact us directly</span>
                    <span className="font-semibold text-primary">{phoneNumber}</span>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {children}
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <span className="font-serif font-semibold text-muted-foreground">
                {businessName}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
