"use client";

import Link from "next/link";

const cols = [
  {
    label: "Equipment",
    links: [
      { label: "The Pro", href: "/the-pro" },
      { label: "The Air", href: "/the-air" },
      { label: "Compare", href: "/compare" },
      { label: "Essentials", href: "/essentials" },
    ],
  },
  {
    label: "Learn",
    links: [
      { label: "Training", href: "/training" },
      { label: "Journal", href: "/journal" },
      { label: "Events", href: "/events" },
      { label: "About", href: "/about" },
    ],
  },
  {
    label: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Warranty", href: "/warranty" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--obsidian)",
        borderTop: "0.5px solid var(--iron)",
        padding: "64px var(--g) 48px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 48,
          marginBottom: 48,
        }}
      >
        {/* Brand col */}
        <div>
          <Link
            href="/"
            style={{
              fontSize: 13,
              fontWeight: 300,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--sand)",
              display: "block",
              marginBottom: 16,
            }}
          >
            Lyne
          </Link>
          <p style={{ fontSize: 13, color: "var(--ash)", lineHeight: 1.75 }}>
            Reformer Pilates, elevated.
            <br />
            Engineered for those who move with precision.
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {["Instagram", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--ash)",
                  textDecoration: "none",
                  transition: "color 150ms",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--sand)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ash)")
                }
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {cols.map((col) => (
          <div key={col.label}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--iron)",
                marginBottom: 16,
              }}
            >
              {col.label}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: 12,
                      color: "var(--ash)",
                      textDecoration: "none",
                      transition: "color 150ms",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--sand)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--ash)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          paddingTop: 24,
          borderTop: "0.5px solid var(--iron)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 11, color: "var(--ash)", letterSpacing: "0.02em" }}>
          © {new Date().getFullYear()} Lyne. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 11,
                color: "var(--ash)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--sand)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--ash)")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
