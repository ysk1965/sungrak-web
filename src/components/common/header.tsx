"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./container";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/about", label: "교회소개" },
  { href: "/worship", label: "예배안내" },
  { href: "/sermons", label: "설교" },
  { href: "/newcomer", label: "새가족" },
  { href: "/news", label: "소식" },
];

interface HeaderProps {
  variant?: "default" | "transparent";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          variant === "transparent"
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm",
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="주 내비게이션"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div
                className={cn(
                  "text-xl md:text-2xl font-bold transition-colors",
                  variant === "transparent" ? "text-white" : "text-neutral-900",
                )}
              >
                성락교회
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-500",
                    variant === "transparent"
                      ? "text-white/90 hover:text-white"
                      : "text-neutral-600",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              className={cn(
                "md:hidden p-2 rounded-lg transition-colors",
                variant === "transparent"
                  ? "text-white hover:bg-white/10"
                  : "text-neutral-600 hover:bg-neutral-100",
              )}
            >
              {mobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </nav>
        </Container>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-neutral-100"
            >
              <Container>
                <div className="py-4 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 px-4 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Skip Navigation 타겟: layout.tsx의 "본문으로 건너뛰기" 링크의 앵커 지점 */}
      <div id="main-content" tabIndex={-1} className="sr-only" />
    </>
  );
}
