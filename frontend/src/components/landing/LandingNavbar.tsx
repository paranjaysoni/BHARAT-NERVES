"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/components/layout/ThemeToggle";
import { AppLogo } from "@/components/shared";

const THEME_CHANGE_EVENT = "project-aegis-theme-change";

const navLinks = [
  { label: "Platform", href: "#hero" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#scenarios" },
  { label: "Use Cases", href: "#scenarios" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "#institutions" },
  { label: "Contact", href: "#cta" }
];

function getStoredTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme);

  const syncTheme = useCallback(() => {
    setTheme(getStoredTheme());
  }, []);

  useEffect(() => {
    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, [syncTheme]);

  function toggleTheme() {
    const next: "light" | "dark" = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return { theme, toggleTheme };
}

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-md shadow-[0_1px_12px_rgb(0_0_0/0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group transition-opacity hover:opacity-85">
          <AppLogo variant="full" size={38} className="text-foreground" />
        </Link>

        {/* Center nav — hidden on mobile */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <Link
            href="/control-room"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-md hover:bg-secondary"
          >
            Login
          </Link>
          <a
            href="#cta"
            onClick={(e) => handleAnchorClick(e, "#cta")}
            className="btn btn-primary hidden h-9 px-4 text-xs tracking-wide sm:inline-flex"
          >
            Request Access
          </a>

          {/* Mobile hamburger */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 flex gap-3">
              <Link
                href="/control-room"
                className="btn btn-secondary h-9 flex-1 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <a
                href="#cta"
                onClick={(e) => handleAnchorClick(e, "#cta")}
                className="btn btn-primary h-9 flex-1 text-sm"
              >
                Request Access
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
