"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "HOME", href: "#" },
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "CONTACT", href: "#contact" },
];

// Pixel border style using box-shadow technique
const pixelBorder = {
  boxShadow: `
    -3px 0 0 0 var(--pixel-cyan),
     3px 0 0 0 var(--pixel-cyan),
     0 -3px 0 0 var(--pixel-cyan),
     0 3px 0 0 var(--pixel-cyan),
    -3px -3px 0 0 var(--pixel-cyan),
     3px -3px 0 0 var(--pixel-cyan),
    -3px 3px 0 0 var(--pixel-cyan),
     3px 3px 0 0 var(--pixel-cyan)
  `,
};

const pixelBorderDark = {
  boxShadow: `
    -3px 0 0 0 #0D0221,
     3px 0 0 0 #0D0221,
     0 -3px 0 0 #0D0221,
     0 3px 0 0 #0D0221,
    -3px -3px 0 0 #0D0221,
     3px -3px 0 0 #0D0221,
    -3px 3px 0 0 #0D0221,
     3px 3px 0 0 #0D0221
  `,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle scroll for background blur and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((link) => link.href.slice(1) || "hero");
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section === "hero" ? "#" : `#${section}`);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href === "#" ? "hero" : href.slice(1);
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip to content link for keyboard navigation - Pixel Style */}
      <a
        href="#main-content"
        className="fixed top-0 left-0 z-[100] -translate-y-full focus:translate-y-0 bg-[var(--pixel-cyan)] text-black px-4 py-2 text-sm uppercase tracking-wider transition-transform focus:outline-none"
        style={pixelBorderDark}
        onClick={(e) => handleNavClick(e, "#about")}
      >
        <span style={{ fontFamily: "var(--font-pixel)" }}>&gt; SKIP TO CONTENT</span>
      </a>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0D0221]/95 border-b-4 border-[var(--pixel-cyan)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20" role="navigation" aria-label="Main navigation">
          {/* Logo - Pixel Style */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "#")}
            className="group relative"
          >
            <div className="relative">
              {/* Pixel border container */}
              <div
                className="px-3 py-2 bg-[#240946] transition-all duration-100 group-hover:bg-[#3d1a6e]"
                style={pixelBorder}
              >
                <span
                  className="text-lg text-[#00F5FF] tracking-wider"
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  MH
                </span>
              </div>
              {/* Blinking indicator */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF006E] animate-blink" />
            </div>
          </Link>

          {/* Desktop Navigation - Pixel Style */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative px-4 py-2 text-xs tracking-wider uppercase transition-all duration-100",
                  "hover:bg-[#240946]",
                  activeSection === link.href
                    ? "text-[#00F5FF]"
                    : "text-[#B8B8D1] hover:text-[#00F5FF]"
                )}
                style={{ fontFamily: "var(--font-pixel)" }}
                aria-current={activeSection === link.href ? "page" : undefined}
                role="menuitem"
              >
                {link.name}
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#00F5FF]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Desktop Theme Toggle - Pixel Container */}
          <div
            className="hidden md:flex items-center bg-[#1A0B2E] p-1"
            style={{
              boxShadow: `
                -2px 0 0 0 var(--pixel-cyan),
                 2px 0 0 0 var(--pixel-cyan),
                 0 -2px 0 0 var(--pixel-cyan),
                 0 2px 0 0 var(--pixel-cyan)
              `,
            }}
          >
            <ThemeToggle />
          </div>

          {/* Mobile Menu - Pixel Style */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="relative p-3 bg-[var(--pixel-cyan)] text-black transition-transform active:translate-y-1"
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    boxShadow: `
                      -3px 0 0 0 var(--pixel-cyan),
                       3px 0 0 0 var(--pixel-cyan),
                       0 -3px 0 0 var(--pixel-cyan),
                       0 4px 0 0 #0D0221,
                      -3px -3px 0 0 var(--pixel-cyan),
                       3px -3px 0 0 var(--pixel-cyan),
                      -3px 4px 0 0 #0D0221,
                       3px 4px 0 0 #0D0221
                    `,
                  }}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-[#0D0221] border-l-4 border-[var(--pixel-cyan)] p-0"
                style={{
                  boxShadow: `
                    -8px 0 0 0 rgba(0, 245, 255, 0.3),
                    -4px 0 0 0 var(--pixel-cyan)
                  `,
                }}
              >
                <SheetHeader className="p-6 border-b-4 border-[var(--pixel-purple)] bg-[#1A0B2E]">
                  <SheetTitle className="text-left flex items-center gap-3">
                    <div
                      className="bg-[var(--pixel-purple)] px-3 py-1"
                      style={{
                        boxShadow: `
                          -3px 0 0 0 var(--pixel-purple),
                           3px 0 0 0 var(--pixel-purple),
                           0 -3px 0 0 var(--pixel-purple),
                           0 3px 0 0 var(--pixel-purple)
                        `,
                      }}
                    >
                      <span className="font-pixel text-white text-sm">MH</span>
                    </div>
                    <span className="font-vt323 text-[var(--pixel-muted)] text-lg">MENU</span>
                  </SheetTitle>
                </SheetHeader>
                {/* Pixel Close Button */}
                <SheetClose asChild>
                  <button
                    className="absolute top-4 right-4 p-2 bg-[var(--pixel-pink)] text-white"
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: "10px",
                      boxShadow: `
                        -2px 0 0 0 var(--pixel-pink),
                         2px 0 0 0 var(--pixel-pink),
                         0 -2px 0 0 var(--pixel-pink),
                         0 2px 0 0 var(--pixel-pink)
                      `,
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </SheetClose>
                <nav className="flex flex-col p-4 gap-2">
                  {navLinks.map((link, index) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                          "relative px-4 py-4 uppercase tracking-wider transition-all",
                          activeSection === link.href
                            ? "text-[var(--pixel-cyan)] bg-[var(--pixel-cyan)]/10"
                            : "text-[var(--pixel-muted)] hover:text-white hover:bg-white/5"
                        )}
                        style={{ fontFamily: "var(--font-vt323)", fontSize: "1.5rem" }}
                      >
                        {/* Menu item number */}
                        <span
                          className="text-[var(--pixel-purple)] mr-3"
                          style={{ fontFamily: "var(--font-pixel)", fontSize: "0.75rem" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.name}
                        {/* Active indicator arrow */}
                        {activeSection === link.href && (
                          <span className="absolute right-4 text-[var(--pixel-cyan)]">
                            &gt;
                          </span>
                        )}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                {/* Pixel decoration at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 animate-blink"
                        style={{
                          backgroundColor: [
                            "var(--pixel-pink)",
                            "var(--pixel-cyan)",
                            "var(--pixel-yellow)",
                            "var(--pixel-purple)",
                            "var(--pixel-green)",
                          ][i],
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-center text-[var(--pixel-muted)] text-sm mt-2"
                    style={{ fontFamily: "var(--font-vt323)" }}
                  >
                    INSERT COIN TO CONTINUE
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}
