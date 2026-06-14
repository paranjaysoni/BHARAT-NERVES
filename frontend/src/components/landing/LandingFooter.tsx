import Link from "next/link";
import { AppLogo } from "@/components/shared";

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          {/* Logo */}
          <Link href="/" className="transition-opacity hover:opacity-85">
            <AppLogo variant="full" size={34} className="text-foreground" />
          </Link>

          {/* Center: platform description */}
          <p className="hidden text-xs text-muted-foreground/60 max-w-xs text-center md:block">
            AI-powered national security &amp; economic intelligence platform for a resilient Bharat.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Support
            </Link>
          </div>
        </div>

        <div className="border-t border-border/40 py-5 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground/50">
            &copy; 2024 Project Aegis. All rights reserved. Built for national resilience.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground/50">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
