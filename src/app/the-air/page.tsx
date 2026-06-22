"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const COLORS = [
  { name: "Ivory",    hex: "#E8E4DC" },
  { name: "Stone",    hex: "#C8C0B4" },
  { name: "Obsidian", hex: "#1A1A1A" },
  { name: "Blush",    hex: "#C4957A" },
  { name: "Dusk",     hex: "#4A4558" },
];

const FRAMES = [
  { name: "Matte Black",      delta: 0 },
  { name: "Brushed Steel",    delta: 2500 },
  { name: "Powder Coat Sand", delta: 2500 },
];

const BUNDLES = [
  { id: "standard", label: "Standard",      base: 45000,  desc: "Machine + elastic bands + straps" },
  { id: "studio",   label: "Studio Bundle", base: 58000,  desc: "Adds short box, balance disc, and premium band set" },
];

const SPECS: [string, string][] = [
  ["Length",           "2,200mm"],
  ["Width",            "620mm"],
  ["Height",           "290mm (carriage)"],
  ["Weight",           "68kg"],
  ["Resistance",       "Elastic band system, 5 levels"],
  ["Band positions",   "12 anchor points"],
  ["Upholstery",       "Full-grain leather, 5cm foam"],
  ["Max load",         "160kg"],
  ["Connectivity",     "Not required"],
];

const FAQS = [
  { id: "delivery", title: "Delivery & Installation", body: "White-glove delivery to Greater Cairo and Alexandria. Our team assembles and positions the machine in your preferred room. Delivery within 7–10 business days of order confirmation." },
  { id: "warranty", title: "Warranty", body: "2-year warranty on frame and mechanical components. 1-year on upholstery and elastic bands. Bands are replaceable — our team comes to you." },
  { id: "payment",  title: "Payment", body: "Pay in full by card or bank transfer. Instalment options via Sympl — up to 12 months, 0% for the first 3. A 30% deposit secures your order and production slot." },
  { id: "space",    title: "Space Requirements", body: "Minimum recommended room footprint: 2.5m × 4.5m. The Air is our most space-efficient machine. Free space consultation available before purchase." },
];

function fmt(n: number) {
  return "EGP " + n.toLocaleString("en-EG");
}

function AirSVG() {
  return (
    <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Carriage bed */}
      <rect x="90" y="108" width="340" height="42" rx="1" fill="#0C0C0C"/>
      <rect x="90" y="108" width="340" height="5"  rx="1" fill="#0C0C0C" opacity=".45"/>
      {/* Frame rails */}
      <rect x="82" y="150" width="356" height="4" fill="#0C0C0C" opacity=".14"/>
      {/* Front leg */}
      <rect x="98"  y="154" width="11" height="78" fill="#0C0C0C"/>
      <rect x="78"  y="226" width="51" height="6"  fill="#0C0C0C"/>
      {/* Rear leg */}
      <rect x="411" y="154" width="11" height="78" fill="#0C0C0C"/>
      <rect x="391" y="226" width="51" height="6"  fill="#0C0C0C"/>
      {/* Headrest */}
      <rect x="94" y="92" width="65" height="18" rx="2" fill="#0C0C0C" opacity=".6"/>
      {/* Footbar vertical */}
      <rect x="449" y="70" width="7"  height="84" fill="#0C0C0C" opacity=".45"/>
      {/* Footbar horizontal */}
      <rect x="437" y="70" width="27" height="6"  rx="2" fill="#0C0C0C" opacity=".32"/>
      {/* Top surface line */}
      <rect x="90" y="108" width="340" height="0.5" fill="#0C0C0C" opacity=".55"/>
      {/* Elastic band anchors */}
      {[138, 168, 198].map(x => <rect key={x} x={x} y="154" width="8" height="18" rx="4" fill="#0C0C0C" opacity=".28"/>)}
      {[282, 312, 342].map(x => <rect key={x} x={x} y="154" width="8" height="18" rx="4" fill="#0C0C0C" opacity=".28"/>)}
      {/* Band curves (simplified) */}
      <path d="M146 154 Q146 136 160 130 Q174 124 188 130 Q202 136 202 154" stroke="#0C0C0C" strokeWidth="1" fill="none" opacity=".2"/>
      <path d="M290 154 Q290 136 304 130 Q318 124 332 130 Q346 136 346 154" stroke="#0C0C0C" strokeWidth="1" fill="none" opacity=".2"/>
    </svg>
  );
}

export default function TheAirPage() {
  const [color,    setColor]    = useState(COLORS[0]);
  const [frame,    setFrame]    = useState(FRAMES[0]);
  const [bundle,   setBundle]   = useState(BUNDLES[0]);
  const [coaching, setCoaching] = useState(false);
  const [openFaq,  setOpenFaq]  = useState<string | null>(null);
  const [ctaOn,    setCtaOn]    = useState(false);

  const total = bundle.base + frame.delta;

  useEffect(() => {
    const fn = () => setCtaOn(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const light = {
    bg:     "var(--paper)",
    border: "rgba(12,12,12,0.08)",
    text:   "var(--obsidian)",
    sub:    "var(--ash)",
    iron:   "rgba(12,12,12,0.1)",
    grid:   "rgba(0,0,0,0.015)",
  };

  return (
    <>
      <div style={{ paddingTop: "var(--nav-h)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* ── LEFT: sticky visual ── */}
        <div style={{
          position: "sticky", top: "var(--nav-h)",
          height: "calc(100vh - var(--nav-h))", alignSelf: "start",
          background: light.bg, borderRight: `0.5px solid ${light.border}`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `repeating-linear-gradient(0deg,transparent,transparent 79px,${light.grid} 79px,${light.grid} 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,${light.grid} 79px,${light.grid} 80px)` }}/>
          <div style={{ position: "absolute", inset: 0, background: color.hex, mixBlendMode: "color", opacity: 0.14, pointerEvents: "none", transition: "background 280ms var(--ease)" }}/>
          <div style={{ position: "relative", width: "70%", maxWidth: 420, zIndex: 2 }}>
            <AirSVG/>
          </div>
          <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 40px", zIndex: 3 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub }}>lyne / the air</div>
              <div style={{ fontSize: 13, color: light.text, marginTop: 4 }}>{color.name}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 0 ? light.text : light.border }}/>)}
            </div>
          </div>
        </div>

        {/* ── RIGHT: config ── */}
        <div style={{ padding: "56px 64px 160px", background: light.bg }}>

          {/* Bundle switcher */}
          <div style={{ display: "flex", border: `0.5px solid ${light.iron}`, marginBottom: 48 }}>
            {BUNDLES.map((b, i) => (
              <button key={b.id} onClick={() => setBundle(b)} style={{
                flex: 1, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer",
                border: "none", borderRight: i === 0 ? `0.5px solid ${light.iron}` : "none",
                background: bundle.id === b.id ? "var(--obsidian)" : "transparent",
                color: bundle.id === b.id ? "var(--paper)" : light.sub,
                transition: "background 200ms, color 200ms",
              }}>{b.label}</button>
            ))}
          </div>

          <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub, marginBottom: 12 }}>the air</div>
          <h1 style={{ fontSize: "clamp(26px,2.6vw,36px)", fontWeight: 300, lineHeight: 1.1, textTransform: "lowercase", color: light.text, marginBottom: 14 }}>
            {bundle.id === "standard" ? "elastic band reformer" : "the air studio bundle"}
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: light.sub, maxWidth: 360, marginBottom: 28 }}>
            {bundle.id === "standard"
              ? "Precision elastic resistance. No motor, no Bluetooth — just pure, joint-friendly tension at every position."
              : "Everything in Standard — plus short box, balance disc, and our premium 5-band resistance set."}
          </p>
          <div style={{ fontSize: 28, fontWeight: 300, color: light.text }}>
            <span style={{ fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: light.sub, marginRight: 8 }}>from</span>
            {fmt(total)}
          </div>

          <div style={{ height: "0.5px", background: light.iron, margin: "36px 0" }}/>

          {/* Color */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub }}>Upholstery</span>
              <span style={{ fontSize: 13, color: light.text }}>{color.name}</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {COLORS.map(c => (
                <div key={c.name} onClick={() => setColor(c)} title={c.name} style={{
                  width: 30, height: 30, borderRadius: "50%", background: c.hex, cursor: "pointer",
                  boxShadow: color.name === c.name ? `0 0 0 3.5px ${light.iron}, 0 0 0 5px ${light.text}` : "none",
                  transform: color.name === c.name ? "scale(1.14)" : "scale(1)",
                  transition: "transform 120ms, box-shadow 120ms",
                }}/>
              ))}
            </div>
          </div>

          {/* Frame */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub }}>Frame Finish</span>
              <span style={{ fontSize: 13, color: light.text }}>{frame.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {FRAMES.map(f => (
                <button key={f.name} onClick={() => setFrame(f)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  height: 50, padding: "0 18px", cursor: "pointer", textAlign: "left",
                  border: `0.5px solid ${frame.name === f.name ? light.text : light.iron}`,
                  background: frame.name === f.name ? "rgba(12,12,12,0.03)" : "transparent",
                  color: light.text, fontSize: 13,
                  transition: "border-color 150ms, background 150ms",
                }}>
                  <span>{f.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 11, color: light.sub, letterSpacing: ".04em", textTransform: "uppercase" }}>
                      {f.delta === 0 ? "Included" : `+ ${fmt(f.delta)}`}
                    </span>
                    <div style={{
                      width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      border: `0.5px solid ${frame.name === f.name ? light.text : light.iron}`,
                      background: frame.name === f.name ? light.text : "transparent",
                      transition: "border-color 150ms, background 150ms",
                    }}>
                      {frame.name === f.name && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--paper)" }}/>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Coaching */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub }}>Training</span>
              <span style={{ fontSize: 13, color: light.text }}>{coaching ? "AI Trainer" : "Free access"}</span>
            </div>
            <div style={{ border: `0.5px solid ${coaching ? light.text : light.iron}`, padding: 28, transition: "border-color 300ms" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: light.text }}>AI Trainer</span>
                <div onClick={() => setCoaching(v => !v)} style={{
                  width: 44, height: 24, borderRadius: 12, cursor: "pointer", position: "relative",
                  background: coaching ? light.text : light.iron,
                  border: `0.5px solid ${coaching ? light.text : light.sub}`,
                  transition: "background 200ms",
                }}>
                  <div style={{
                    position: "absolute", top: 3, left: 3, width: 16, height: 16, borderRadius: "50%",
                    background: coaching ? "var(--paper)" : light.sub,
                    transform: coaching ? "translateX(20px)" : "none",
                    transition: "transform 200ms, background 200ms",
                  }}/>
                </div>
              </div>
              <div style={{ fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase", background: "#253627", color: "#A8C8AA", padding: "3px 8px", display: "inline-block", marginBottom: 16 }}>Phase 2</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Personalised sessions for your programme", "Elastic resistance cues and band selection", "Progress tracking and weekly check-ins", "Real-time audio coaching"].map(f => (
                  <li key={f} style={{ fontSize: 13, color: light.sub, display: "flex", gap: 10 }}>
                    <span style={{ color: light.iron, flexShrink: 0 }}>—</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ height: "0.5px", background: light.iron, margin: "36px 0" }}/>

          {/* Specs */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub, marginBottom: 16 }}>Specifications</div>
            {SPECS.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 48, borderTop: `0.5px solid ${light.iron}` }}>
                <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.sub }}>{k}</span>
                <span style={{ fontSize: 13, color: light.text }}>{v}</span>
              </div>
            ))}
            <div style={{ height: "0.5px", background: light.iron }}/>
          </div>

          <div style={{ height: "0.5px", background: light.iron, marginTop: 36 }}/>

          {/* FAQs */}
          {FAQS.map(faq => (
            <div key={faq.id} style={{ borderBottom: `0.5px solid ${light.iron}` }}>
              <div
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 52, cursor: "pointer" }}
              >
                <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.text }}>{faq.title}</span>
                <span style={{ fontSize: 20, fontWeight: 300, color: light.sub, display: "inline-block", transform: openFaq === faq.id ? "rotate(45deg)" : "none", transition: "transform 300ms var(--ease)" }}>+</span>
              </div>
              <div style={{ maxHeight: openFaq === faq.id ? 300 : 0, overflow: "hidden", transition: "max-height 400ms var(--ease)" }}>
                <p style={{ paddingBottom: 20, fontSize: 13, lineHeight: 1.85, color: light.sub, maxWidth: 400 }}>{faq.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 72,
        background: "var(--paper)", borderTop: `0.5px solid ${light.iron}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 var(--g)", zIndex: 400,
        transform: ctaOn ? "translateY(0)" : "translateY(100%)",
        transition: "transform 300ms var(--ease)",
      }}>
        <div>
          <div style={{ fontSize: 13, color: light.text }}>The Air · {bundle.label}</div>
          <div style={{ fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: light.sub, marginTop: 2 }}>{color.name} · {frame.name}</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 300, color: light.text }}>{fmt(total)}</div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={{ height: 44, padding: "0 28px", border: `0.5px solid ${light.iron}`, background: "transparent", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: light.text, cursor: "pointer" }}>Save</button>
          <button style={{ height: 44, padding: "0 36px", border: "none", background: "var(--obsidian)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--sand)", cursor: "pointer" }}>Add to Cart →</button>
        </div>
      </div>
    </>
  );
}
