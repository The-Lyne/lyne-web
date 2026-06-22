"use client";

import Link from "next/link";
import { useState } from "react";

const PRODUCTS = [
  { cat: "mats",       name: "Lyne Grip Mat",          sub: "Non-slip reformer mat, 6mm",                   price: "EGP 1,200" },
  { cat: "accessories",name: "Resistance Band Set",     sub: "5 bands, light to extra-heavy",                price: "EGP 980" },
  { cat: "accessories",name: "Theraband Set",           sub: "3 widths, natural latex",                      price: "EGP 750" },
  { cat: "accessories",name: "Reformer Box — Short",    sub: "Padded, leather-wrapped, The Pro compatible",  price: "EGP 2,800" },
  { cat: "accessories",name: "Reformer Box — Long",     sub: "Padded, leather-wrapped, The Pro compatible",  price: "EGP 3,200" },
  { cat: "care",       name: "Leather Care Kit",        sub: "Conditioner, protector, applicator cloth",     price: "EGP 480" },
  { cat: "accessories",name: "Jump Board",              sub: "Padded jump surface, The Pro compatible",      price: "EGP 3,600" },
  { cat: "mats",       name: "Anti-Fatigue Mat",        sub: "Under-reformer standing mat, 80 × 200cm",      price: "EGP 1,600" },
  { cat: "care",       name: "Spring Lubricant",        sub: "Professional-grade, for reformer springs",     price: "EGP 220" },
  { cat: "accessories",name: "Footbar Cushion Set",     sub: "Pair, non-slip silicone, 4 sizes",             price: "EGP 560" },
  { cat: "mats",       name: "Sticky Socks — Pack of 3",sub: "Egyptian cotton, grip sole, S/M/L",           price: "EGP 420" },
  { cat: "care",       name: "Strap Replacement Kit",   sub: "Loops + long straps, leather, The Pro & Air", price: "EGP 1,100" },
];

const CATS = ["all", "accessories", "mats", "care"] as const;

export default function EssentialsPage() {
  const [cat, setCat] = useState<string>("all");

  const iron = "rgba(12,12,12,0.1)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  const visible = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--cement)", color: obs }}>

      {/* ── HERO ── */}
      <div style={{ height: 300, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 var(--g) 56px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }}/>
          Essentials
        </div>
        <h1 style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 300, letterSpacing: "0.02em", textTransform: "lowercase", lineHeight: 1.0, color: obs }}>
          everything you need.
        </h1>
        <p style={{ fontSize: 13, color: ash, lineHeight: 1.85, marginTop: 14, maxWidth: 360 }}>
          Accessories, care products, and add-ons — sourced to the same standard as the machines.
        </p>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ position: "sticky", top: "var(--nav-h)", height: 52, background: "var(--cement)", borderBottom: sec(iron), display: "flex", alignItems: "stretch", zIndex: 200 }}>
        {CATS.map((c, i) => (
          <button key={c} onClick={() => setCat(c)} style={{
            display: "flex", alignItems: "center",
            padding: i === 0 ? "0 28px 0 var(--g)" : i === CATS.length - 1 ? "0 var(--g) 0 28px" : "0 28px",
            fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
            color: cat === c ? obs : ash,
            background: cat === c ? "rgba(12,12,12,0.06)" : "none",
            border: "none", borderRight: i < CATS.length - 1 ? sec(iron) : "none",
            cursor: "pointer", fontFamily: "inherit", transition: "color 150ms, background 150ms",
          }}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
        ))}
      </div>

      {/* ── PRODUCT GRID ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: sec(iron) }}>
        {visible.map((p, i) => (
          <div key={i} style={{
            borderRight: (i + 1) % 3 !== 0 ? sec(iron) : "none",
            borderBottom: sec(iron), cursor: "pointer",
            transition: "background 200ms",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.04)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {/* Visual placeholder */}
            <div style={{ aspectRatio: "4/3", background: "rgba(12,12,12,0.06)", borderBottom: sec(iron), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, opacity: 0.5 }}>Image</span>
            </div>
            {/* Info */}
            <div style={{ padding: "28px 32px 32px" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 10 }}>{p.cat}</div>
              <h3 style={{ fontSize: 16, fontWeight: 300, color: obs, marginBottom: 6 }}>{p.name}</h3>
              <p style={{ fontSize: 12, color: ash, lineHeight: 1.65, marginBottom: 20 }}>{p.sub}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: sec(iron) }}>
                <span style={{ fontSize: 15, fontWeight: 300, color: obs }}>{p.price}</span>
                <button style={{
                  height: 36, padding: "0 20px", border: "none",
                  background: obs, color: "var(--sand)",
                  fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase",
                  cursor: "pointer", transition: "opacity 150ms",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.78")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >Add →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
