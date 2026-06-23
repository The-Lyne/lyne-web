"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
        background: scrolled
          ? "rgba(10,10,10,0.86)"
          : "rgba(10,10,10,0.28)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: scrolled
          ? "0.5px solid rgba(255,255,255,0.07)"
          : "0.5px solid rgba(255,255,255,0.04)",
        transition:
          "background 380ms cubic-bezier(0.16,1,0.3,1), border-color 380ms cubic-bezier(0.16,1,0.3,1)",
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
          color: "rgba(255,255,255,0.9)",
          flexShrink: 0,
        }}
      >
        Lyne
      </Link>

      {/* Centre links */}
      <ul
        style={{
          display: "flex",
          gap: 36,
          listStyle: "none",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        {[
          { label: "Bench",      href: "/bench" },
          { label: "Pilates",    href: "/pilates" },
          { label: "Essentials", href: "/essentials" },
          { label: "Training",   href: "/training" },
          { label: "Journal",    href: "/journal" },
        ].map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "rgba(255,255,255,0.6)",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right links */}
      <div
        style={{
          display: "flex",
          gap: 28,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {[
          { label: "Account", href: "/account" },
          { label: "Cart",    href: "/cart" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "rgba(255,255,255,0.6)",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
