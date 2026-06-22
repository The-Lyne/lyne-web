"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--nav-h)",
        padding: "0 var(--g)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 300,
        pointerEvents: "none",
        transition: "background 300ms",
        background: scrolled ? "rgba(12,12,12,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <style>{`nav * { pointer-events: all; }`}</style>

      {/* Wordmark */}
      <Link
        href="/"
        style={{
          fontSize: 13,
          fontWeight: 300,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: "white",
          mixBlendMode: scrolled ? "normal" : "difference",
        }}
      >
        Lyne
      </Link>

      {/* Centre links */}
      <ul
        style={{
          display: "flex",
          gap: 40,
          listStyle: "none",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {[
          { label: "The Pro", href: "/the-pro" },
          { label: "The Air", href: "/the-air" },
          { label: "Essentials", href: "/essentials" },
          { label: "Training", href: "/training" },
          { label: "Journal", href: "/journal" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "white",
                mixBlendMode: scrolled ? "normal" : "difference",
                transition: "opacity 150ms",
                opacity: 1,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {[
          { label: "Account", href: "/account" },
          { label: "Cart (0)", href: "/cart" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "white",
              mixBlendMode: scrolled ? "normal" : "difference",
              transition: "opacity 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.45")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
