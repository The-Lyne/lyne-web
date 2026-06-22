"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const COLORS = [
  { name: "Obsidian", hex: "#1A1A1A" },
  { name: "Stone",    hex: "#C8C0B4" },
  { name: "Forest",   hex: "#2C3E2D" },
  { name: "Dusk",     hex: "#4A4558" },
  { name: "Blush",    hex: "#C4957A" },
];

const FRAMES = [
  { name: "Matte Black",      delta: 0 },
  { name: "Brushed Steel",    delta: 3500 },
  { name: "Powder Coat Sand", delta: 3500 },
];

const BUNDLES = [
  { id: "standard", label: "Standard",      base: 85000,  desc: "Machine + springs + straps" },
  { id: "studio",   label: "Studio Bundle", base: 110000, desc: "Adds jump board, short box, and resistance band set" },
];

const SPECS: [string, string][] = [
  ["Length",           "2,400mm"],
  ["Width",            "680mm"],
  ["Height",           "310mm (carriage)"],
  ["Weight",           "122kg"],
  ["Motor resistance", "0–80kg digital"],
  ["Resistance modes", "Standard · Centrifugal · Elastic"],
  ["Upholstery",       "Full-grain leather, 5cm foam"],
  ["Max load",         "180kg"],
  ["Connectivity",     "Bluetooth 5.0"],
];

const FAQS = [
  { id: "delivery", title: "Delivery & Installation", body: "White-glove delivery to Greater Cairo and Alexandria. Our team assembles and positions the machine in your preferred room. Delivery within 7–10 business days of order confirmation." },
  { id: "warranty", title: "Warranty", body: "3-year warranty on motor and mechanical components. 2-year on upholstery and springs. Our service team comes to you — no transport required." },
  { id: "payment",  title: "Payment", body: "Pay in full by card or bank transfer. Instalment options via Sympl — up to 12 months, 0% for the first 3. A 30% deposit secures your order and production slot." },
  { id: "space",    title: "Space Requirements", body: "Minimum recommended room footprint: 3m × 5m. We offer a free space consultation before purchase — our team visits and confirms placement before you commit." },
];

function fmt(n: number) {
  return "EGP " + n.toLocaleString("en-EG");
}

function ProSVG() {
  return (
    <svg viewBox="0 0 560 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
      {/* Carriage bed */}
      <rect x="80" y="104" width="356" height="46" fill="#EAE4DA"/>
      <rect x="80" y="104" width="356" height="5" fill="#EAE4DA" opacity=".4"/>
      {/* Frame rails */}
      <rect x="72" y="150" width="372" height="5" fill="#EAE4DA" opacity=".16"/>
      {/* Front leg */}
      <rect x="88" y="155" width="12" height="80" fill="#EAE4DA"/>
      <rect x="68"  y="229" width="52" height="6"  fill="#EAE4DA"/>
      {/* Rear leg */}
      <rect x="420" y="155" width="12" height="80" fill="#EAE4DA"/>
      <rect x="400" y="229" width="52" height="6"  fill="#EAE4DA"/>
      {/* Headrest */}
      <rect x="84" y="86" width="70" height="20" rx="2" fill="#EAE4DA" opacity=".65"/>
      {/* Footbar vertical */}
      <rect x="458" y="66" width="7"  height="88" fill="#EAE4DA" opacity=".5"/>
      {/* Footbar horizontal */}
      <rect x="446" y="66" width="29" height="7"  rx="2" fill="#EAE4DA" opacity=".36"/>
      {/* Motor unit outline */}
      <rect x="416" y="104" width="52" height="43" rx="1" fill="none" stroke="#EAE4DA" strokeWidth="1" opacity=".28"/>
      <rect x="424" y="112" width="36" height="17" fill="#EAE4DA" opacity=".06"/>
      <rect x="428" y="116" width="22" height="2"  rx="1" fill="#EAE4DA" opacity=".4"/>
      <rect x="428" y="121" width="15" height="2"  rx="1" fill="#EAE4DA" opacity=".26"/>
      {/* Top energy line */}
      <rect x="80" y="104" width="356" height="0.5" fill="#EAE4DA" opacity=".65"/>
      {/* Spring pegs */}
      {[140, 176, 212].map(x => <rect key={x} x={x} y="155" width="9" height="21" rx="4.5" fill="#EAE4DA" opacity=".3"/>)}
      {[300, 336, 372].map(x => <rect key={x} x={x} y="155" width="9" height="21" rx="4.5" fill="#EAE4DA" opacity=".3"/>)}
    </svg>
  );
}

export default function TheProPage() {
  const [color,   setColor]   = useState(COLORS[0]);
  const [frame,   setFrame]   = useState(FRAMES[0]);
  const [bundle,  setBundle]  = useState(BUNDLES[0]);
  const [coaching,setCoaching]= useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [ctaOn,   setCtaOn]   = useState(false);

  const total = bundle.base + frame.delta;

  useEffect(() => {
    const fn = () => setCtaOn(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "var(--nav-h)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>

        {/* ── LEFT: sticky visual ── */}
        <div style={{
          position: "sticky", top: "var(--nav-h)",
          height: "calc(100vh - var(--nav-h))", alignSelf: "start",
          background: "var(--obsidian)", borderRight: "0.5px solid var(--iron)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}>
          {/* grid overlay */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,.018) 79px,rgba(255,255,255,.018) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,.018) 79px,rgba(255,255,255,.018) 80px)" }}/>
          {/* color wash */}
          <div style={{ position: "absolute", inset: 0, background: color.hex, mixBlendMode: "color", opacity: 0.18, pointerEvents: "none", transition: "background 280ms var(--ease)" }}/>
          {/* SVG */}
          <div style={{ position: "relative", width: "70%", maxWidth: 440, zIndex: 2 }}>
            <ProSVG/>
          </div>
          {/* bottom info */}
          <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 40px", zIndex: 3 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)" }}>lyne / the pro</div>
              <div style={{ fontSize: 13, color: "var(--sand)", marginTop: 4, transition: "opacity 200ms" }}>{color.name}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: i === 0 ? "var(--sand)" : "var(--iron)" }}/>)}
            </div>
          </div>
        </div>

        {/* ── RIGHT: config ── */}
        <div style={{ padding: "56px 64px 160px", background: "var(--obsidian)" }}>

          {/* Bundle switcher */}
          <div style={{ display: "flex", border: "0.5px solid var(--iron)", marginBottom: 48 }}>
            {BUNDLES.map((b, i) => (
              <button key={b.id} onClick={() => setBundle(b)} style={{
                flex: 1, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer",
                border: "none", borderRight: i === 0 ? "0.5px solid var(--iron)" : "none",
                background: bundle.id === b.id ? "var(--sand)" : "transparent",
                color: bundle.id === b.id ? "var(--obsidian)" : "var(--ash)",
                transition: "background 200ms, color 200ms",
              }}>{b.label}</button>
            ))}
          </div>

          <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)", marginBottom: 12 }}>the pro</div>
          <h1 style={{ fontSize: "clamp(26px,2.6vw,36px)", fontWeight: 300, lineHeight: 1.1, textTransform: "lowercase", color: "var(--sand)", marginBottom: 14 }}>
            {bundle.id === "standard" ? "smart motor reformer" : "the pro studio bundle"}
          </h1>
          <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--ash)", maxWidth: 360, marginBottom: 28 }}>
            {bundle.id === "standard"
              ? "Professional-grade motor reformer. Variable resistance, precision control, built for those who train with intention."
              : "Everything in Standard — plus jump board, short box, and resistance band set. The complete home studio."}
          </p>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--sand)" }}>
            <span style={{ fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ash)", marginRight: 8 }}>from</span>
            {fmt(total)}
          </div>

          <div style={{ height: "0.5px", background: "var(--iron)", margin: "36px 0" }}/>

          {/* Color */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)" }}>Upholstery</span>
              <span style={{ fontSize: 13, color: "var(--sand)" }}>{color.name}</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {COLORS.map(c => (
                <div key={c.name} onClick={() => setColor(c)} title={c.name} style={{
                  width: 30, height: 30, borderRadius: "50%", background: c.hex, cursor: "pointer",
                  boxShadow: color.name === c.name ? "0 0 0 3.5px var(--iron), 0 0 0 5px var(--sand)" : "none",
                  transform: color.name === c.name ? "scale(1.14)" : "scale(1)",
                  transition: "transform 120ms, box-shadow 120ms",
                }}/>
              ))}
            </div>
          </div>

          {/* Frame */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)" }}>Frame Finish</span>
              <span style={{ fontSize: 13, color: "var(--sand)" }}>{frame.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {FRAMES.map(f => (
                <button key={f.name} onClick={() => setFrame(f)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  height: 50, padding: "0 18px", cursor: "pointer", textAlign: "left",
                  border: `0.5px solid ${frame.name === f.name ? "var(--sand)" : "var(--iron)"}`,
                  background: frame.name === f.name ? "rgba(234,228,218,.04)" : "transparent",
                  color: "var(--sand)", fontSize: 13,
                  transition: "border-color 150ms, background 150ms",
                }}>
                  <span>{f.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 11, color: "var(--ash)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                      {f.delta === 0 ? "Included" : `+ ${fmt(f.delta)}`}
                    </span>
                    <div style={{
                      width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      border: `0.5px solid ${frame.name === f.name ? "var(--sand)" : "var(--iron)"}`,
                      background: frame.name === f.name ? "var(--sand)" : "transparent",
                      transition: "border-color 150ms, background 150ms",
                    }}>
                      {frame.name === f.name && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--obsidian)" }}/>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Coaching */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)" }}>Training</span>
              <span style={{ fontSize: 13, color: "var(--sand)" }}>{coaching ? "AI Trainer" : "Free access"}</span>
            </div>
            <div style={{ border: `0.5px solid ${coaching ? "var(--sand)" : "var(--iron)"}`, padding: 28, transition: "border-color 300ms" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sand)" }}>AI Trainer</span>
                <div onClick={() => setCoaching(v => !v)} style={{
                  width: 44, height: 24, borderRadius: 12, cursor: "pointer", position: "relative",
                  background: coaching ? "var(--sand)" : "var(--iron)",
                  border: `0.5px solid ${coaching ? "var(--sand)" : "var(--ash)"}`,
                  transition: "background 200ms, border-color 200ms",
                }}>
                  <div style={{
                    position: "absolute", top: 3, left: 3, width: 16, height: 16, borderRadius: "50%",
                    background: coaching ? "var(--obsidian)" : "var(--ash)",
                    transform: coaching ? "translateX(20px)" : "none",
                    transition: "transform 200ms, background 200ms",
                  }}/>
                </div>
              </div>
              <div style={{ fontSize: 9, letterSpacing: ".06em", textTransform: "uppercase", background: "#253627", color: "#A8C8AA", padding: "3px 8px", display: "inline-block", marginBottom: 16 }}>Phase 2</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Personalised sessions for your programme", "AI-adapted resistance recommendations", "Progress tracking and weekly check-ins", "Real-time coaching cues"].map(f => (
                  <li key={f} style={{ fontSize: 13, color: "var(--ash)", display: "flex", gap: 10 }}>
                    <span style={{ color: "var(--iron)", flexShrink: 0 }}>—</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ height: "0.5px", background: "var(--iron)", margin: "36px 0" }}/>

          {/* Specs */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)", marginBottom: 16 }}>Specifications</div>
            {SPECS.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 48, borderTop: "0.5px solid var(--iron)" }}>
                <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ash)" }}>{k}</span>
                <span style={{ fontSize: 13, color: "var(--sand)" }}>{v}</span>
              </div>
            ))}
            <div style={{ height: "0.5px", background: "var(--iron)" }}/>
          </div>

          <div style={{ height: "0.5px", background: "var(--iron)", marginTop: 36 }}/>

          {/* FAQs */}
          {FAQS.map(faq => (
            <div key={faq.id} style={{ borderBottom: "0.5px solid var(--iron)" }}>
              <div
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 52, cursor: "pointer" }}
              >
                <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--sand)" }}>{faq.title}</span>
                <span style={{ fontSize: 20, fontWeight: 300, color: "var(--ash)", display: "inline-block", transform: openFaq === faq.id ? "rotate(45deg)" : "none", transition: "transform 300ms var(--ease)" }}>+</span>
              </div>
              <div style={{ maxHeight: openFaq === faq.id ? 300 : 0, overflow: "hidden", transition: "max-height 400ms var(--ease)" }}>
                <p style={{ paddingBottom: 20, fontSize: 13, lineHeight: 1.85, color: "var(--ash)", maxWidth: 400 }}>{faq.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 72,
        background: "var(--obsidian)", borderTop: "0.5px solid var(--iron)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 var(--g)", zIndex: 400,
        transform: ctaOn ? "translateY(0)" : "translateY(100%)",
        transition: "transform 300ms var(--ease)",
      }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--sand)" }}>The Pro · {bundle.label}</div>
          <div style={{ fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ash)", marginTop: 2 }}>{color.name} · {frame.name}</div>
        </div>
        <div style={{ fontSize: 20, fontWeight: 300, color: "var(--sand)" }}>{fmt(total)}</div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={{ height: 44, padding: "0 28px", border: "0.5px solid var(--iron)", background: "transparent", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--sand)", cursor: "pointer" }}>Save</button>
          <button style={{ height: 44, padding: "0 36px", border: "none", background: "var(--sand)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--obsidian)", cursor: "pointer" }}>Add to Cart →</button>
        </div>
      </div>
    </>
  );
}
