"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import DearlyLogo from "@/components/dearly-logo";

const navigation = [
  { label: "Experiences", href: "/experiences" },
  { label: "Our approach", href: "/#journey" },
  { label: "Gifts", href: "/#gifts" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Dearly Studio home">
        <DearlyLogo />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <Link key={item.label} href={item.href}>
            {item.label}
          </Link>
        ))}
        <a className="nav-project" href="https://www.instagram.com/dearly_digitalstudio/" target="_blank" rel="noopener noreferrer">
          Contact us
        </a>
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href="https://www.instagram.com/dearly_digitalstudio/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              Contact us
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}