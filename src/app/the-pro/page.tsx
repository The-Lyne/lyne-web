"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const UPHOLSTERY = [
  { name: "Obsidian", hex: "#1A1A1A" },
  { name: "Stone",    hex: "#C8C0B4" },
  { name: "Forest",   hex: "#2C3E2D" },
  { name: "Dusk",     hex: "#4A4558" },
  { name: "Blush",    hex: "#C4957A" },
];

const MOVEMENTS = [
  { name: "Footwork",        desc: "Glutes, quads, hamstrings, calves. Motor resistance creates a smooth, consistent load from full extension to retraction — no spring falloff." },
  { name: "Core Series",     desc: "Hundreds, roll-ups, short spine. Precise resistance at every inch of spinal articulation. Centrifugal mode adds difficulty as the carriage extends." },
  { name: "Hip Work",        desc: "Circles, frogs, walking, beats. Joint-friendly load through every angle of hip rotation. Excellent for rehab and advanced hip mobility." },
  { name: "Arm Work",        desc: "Push-through bar, straps, rowing. Motor resistance works in both push and pull directions — something springs cannot do." },
  { name: "Jump Board",      desc: "Plyometric cardio at up to 120kg. The motor provides constant deceleration resistance — every landing is controlled, zero joint impact." },
  { name: "Back Rowing",     desc: "The most complete back-of-body sequence in classical Pilates. Full spinal flexion, extension, and lateral movement under load." },
  { name: "Kneeling Series", desc: "Hip flexor activation, posterior chain stability. Motor eccentric mode — the carriage resists on the way back — turns this into a true strength movement." },
  { name: "Long Stretch",    desc: "Total body stabilization under load. Wrists, shoulders, core, and hips working simultaneously. Motor load makes this exponentially harder." },
];

const MATERIALS = [
  {
    label: "Frame",
    material: "Cold-rolled steel",
    spec: "3mm gauge — powder-coated",
    desc: "Laser-cut from 3mm cold-rolled steel plate. MIG-welded, ground to surface, and powder-coated in three finishes. Dimensional tolerance: ±1mm. No flex. No creak. No compromise.",
  },
  {
    label: "Carriage",
    material: "Anodized aluminum",
    spec: "CNC-machined — 4-wheel",
    desc: "CNC-machined carriage platform running on four stainless steel guide rails. Sealed-bearing precision wheels. Silent at all resistance levels. No lubrication required.",
  },
  {
    label: "Upholstery",
    material: "Full-grain leather",
    spec: "5cm high-density foam",
    desc: "Top-layer full-grain hide — the same grade specified for premium furniture. Does not crack under consistent use. Does not absorb moisture. Five colorways, all built to order.",
  },
  {
    label: "Motor",
    material: "Brushless DC",
    spec: "0–120kg adaptive — 3 modes",
    desc: "Variable-resistance brushless motor with digital encoder feedback. Resistance modes: standard linear, centrifugal decay, eccentric overload. Calibrated and updated via the Lyne app.",
  },
];

const SPECS: [string, string][] = [
  ["Dimensions",       "1,390 × 660 × 420mm"],
  ["Machine weight",   "56kg"],
  ["Motor range",      "Standard 0–80kg · Extended 0–120kg"],
  ["Resistance modes", "Standard · Centrifugal · Eccentric"],
  ["Carriage travel",  "920mm"],
  ["Spring count",     "5 tempered steel springs"],
  ["Upholstery",       "Full-grain leather, 5cm high-density foam"],
  ["Frame",            "Cold-rolled steel, powder-coated"],
  ["Rails",            "Anodized aluminum, 4-wheel sealed carriage"],
  ["Max load",         "180kg"],
  ["Connectivity",     "Bluetooth 5.0 · Lyne App"],
  ["Power",            "220V / 50Hz"],
];

const FAQS = [
  { id: "delivery", title: "Delivery & Installation",  body: "White-glove delivery to Greater Cairo and Alexandria. Our team assembles and positions The Pro in your preferred room. Delivery within 7–10 business days of order confirmation." },
  { id: "warranty", title: "Warranty",                 body: "3-year warranty on motor and mechanical components. 2-year on upholstery and springs. Our service team comes to you — no transport required, ever." },
  { id: "payment",  title: "Payment & Instalments",    body: "Pay in full by card or bank transfer. Instalment options via Sympl — up to 12 months, 0% interest for the first 3. A 30% deposit secures your order and production slot." },
  { id: "space",    title: "Space Requirements",        body: "Minimum recommended room footprint: 3m × 5m. We offer a free space consultation before purchase — our team visits and confirms placement before you commit to anything." },
  { id: "compare",  title: "The Pro vs. The Air",       body: "The Pro uses adaptive motor resistance — precise, digital, connected to the Lyne app. The Air uses a 5-spring elastic system — lighter, quieter, no power required. Both are built to the same material standard." },
];

function fmt(n: number) { return "EGP " + n.toLocaleString(); }

function ProSVG({ colorHex }: { colorHex: string }) {
  return (
    <svg viewBox="0 0 560 240" fill="none" style={{ width: "100%" }}>
      {/* Frame rails */}
      <rect x="60" y="130" width="440" height="7" rx="3.5" fill="#EAE4DA" opacity="0.2" />
      <rect x="60" y="143" width="440" height="6" rx="3" fill="#EAE4DA" opacity="0.12" />
      {/* Carriage */}
      <rect x="160" y="90" width="240" height="54" rx="2" fill="#EAE4DA" opacity="0.1" />
      <rect x="160" y="90" width="240" height="22" rx="2" fill={colorHex} opacity="0.32" />
      <rect x="160" y="90" width="240" height="0.5" fill="#EAE4DA" opacity="0.55" />
      <line x1="160" y1="112" x2="400" y2="112" stroke="#EAE4DA" strokeWidth="0.5" opacity="0.2" />
      {/* Shoulder blocks */}
      <rect x="366" y="90" width="14" height="22" rx="2" fill="#EAE4DA" opacity="0.2" />
      <rect x="384" y="90" width="14" height="22" rx="2" fill="#EAE4DA" opacity="0.16" />
      {/* Motor housing */}
      <rect x="60" y="84" width="76" height="66" rx="3" fill="none" stroke="#EAE4DA" strokeWidth="0.8" opacity="0.15" />
      <rect x="68" y="92" width="60" height="50" rx="2" fill="#EAE4DA" opacity="0.04" />
      <rect x="74" y="100" width="48" height="28" rx="1.5" fill="#0C0C0C" opacity="0.55" />
      <line x1="78" y1="110" x2="116" y2="110" stroke="#EAE4DA" strokeWidth="0.7" opacity="0.3" />
      <line x1="78" y1="117" x2="108" y2="117" stroke="#EAE4DA" strokeWidth="0.7" opacity="0.18" />
      <circle cx="116" cy="120" r="3" fill="#EAE4DA" opacity="0.2" />
      <rect x="56" y="150" width="84" height="7" rx="3.5" fill="#EAE4DA" opacity="0.12" />
      {/* Headrest */}
      <rect x="156" y="74" width="70" height="18" rx="2" fill="#EAE4DA" opacity="0.12" />
      <rect x="160" y="75" width="62" height="12" rx="1" fill={colorHex} opacity="0.22" />
      {/* Footbar */}
      <rect x="152" y="70" width="6" height="80" rx="3" fill="#EAE4DA" opacity="0.24" />
      <rect x="130" y="78" width="24" height="5" rx="2.5" fill="#EAE4DA" opacity="0.18" />
      <rect x="130" y="92" width="24" height="5" rx="2.5" fill="#EAE4DA" opacity="0.18" />
      <rect x="130" y="106" width="24" height="5" rx="2.5" fill="#EAE4DA" opacity="0.18" />
      {/* Legs */}
      <rect x="72" y="149" width="8" height="72" rx="4" fill="#EAE4DA" opacity="0.18" />
      <rect x="52" y="219" width="48" height="5" rx="2.5" fill="#EAE4DA" opacity="0.12" />
      <rect x="478" y="149" width="8" height="72" rx="4" fill="#EAE4DA" opacity="0.18" />
      <rect x="458" y="219" width="48" height="5" rx="2.5" fill="#EAE4DA" opacity="0.12" />
      {/* Spring pegs */}
      {[200, 238, 276].map(x => <rect key={x} x={x} y="149" width="8" height="20" rx="4" fill="#EAE4DA" opacity="0.16" />)}
      {[320, 358, 396].map(x => <rect key={x} x={x} y="149" width="8" height="20" rx="4" fill="#EAE4DA" opacity="0.16" />)}
    </svg>
  );
}

export default function TheProPage() {
  const [upholstery, setUpholstery] = useState(UPHOLSTERY[0]);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [ctaOn, setCtaOn] = useState(false);

  useEffect(() => {
    const fn = () => setCtaOn(window.scrollY > 120);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const sand = "var(--sand)";
  const ash  = "var(--ash)";
  const iron = "var(--iron)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  return (
    <div style={{ background: obs, color: sand }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "var(--nav-h)", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,.013) 79px,rgba(255,255,255,.013) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,.013) 79px,rgba(255,255,255,.013) 80px)", pointerEvents: "none" }} />

        {/* SVG — large, center */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px var(--g) 60px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "min(860px, 90%)" }}>
            <ProSVG colorHex={upholstery.hex} />
          </div>
        </div>

        {/* Hero bottom strip */}
        <div style={{ position: "relative", zIndex: 2, borderTop: sec(iron), display: "grid", gridTemplateColumns: "1fr 1fr", padding: "32px var(--g) 48px", gap: 48 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Flex Pro — Sensol</div>
            <h1 style={{ fontSize: "clamp(40px,5.5vw,70px)", fontWeight: 300, lineHeight: 1.03, textTransform: "lowercase", letterSpacing: "-0.015em", color: sand }}>the pro.</h1>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: ash, marginTop: 18, maxWidth: 380 }}>Smart motor resistance. Adaptive 0–120kg range. Three resistance modes. Built for those who train with absolute intention.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", gap: 18 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: ash }}>from</div>
              <div style={{ fontSize: 36, fontWeight: 300, color: sand, marginTop: 4 }}>{fmt(88000)}</div>
            </div>
            <Link href="/pilates" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 30px", background: sand, color: obs, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none" }}>
              Configure Yours →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ padding: "104px var(--g)", borderTop: sec(iron), borderBottom: sec(iron) }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "end" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, lineHeight: 1.8 }}>
            The first adaptive-motor reformer<br />engineered for the Egyptian home.
          </div>
          <blockquote style={{ fontSize: "clamp(22px,3.2vw,44px)", fontWeight: 300, lineHeight: 1.22, letterSpacing: "-0.01em", color: sand }}>
            A motor doesn't remove the work.<br />It gives you precise control over<br />exactly how hard you work.
          </blockquote>
        </div>
      </section>

      {/* ── WHAT YOU ACHIEVE ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron), display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />what you can achieve
            </div>
            <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: sand }}>200+ movements. Every muscle group.<br />Every level of practitioner.</h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {MOVEMENTS.map((m, i) => (
            <div key={m.name} style={{ padding: "44px 40px 52px", borderRight: (i + 1) % 4 !== 0 ? sec(iron) : "none", borderBottom: i < 4 ? sec(iron) : "none" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", color: ash, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: "0.5px", background: ash, display: "inline-block" }} />
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 300, color: sand, marginBottom: 14, textTransform: "lowercase", lineHeight: 1.2 }}>{m.name}</h3>
              <p style={{ fontSize: 12, lineHeight: 1.9, color: ash }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Capacity stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: sec(iron) }}>
          {[
            { stat: "180kg",  label: "Max load capacity" },
            { stat: "0–120",  label: "kg motor resistance" },
            { stat: "920mm",  label: "Full carriage travel" },
            { stat: "3",      label: "Resistance modes" },
          ].map((s, i) => (
            <div key={s.stat} style={{ padding: "44px 40px", borderRight: i < 3 ? sec(iron) : "none" }}>
              <div style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: sand, lineHeight: 1, marginBottom: 10 }}>{s.stat}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: ash }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MATERIALS ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />materials & construction
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: sand }}>Built to outlast any other piece<br />of furniture in the room.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {MATERIALS.map((m, i) => (
            <div key={m.label} style={{ padding: "52px 40px 60px", borderRight: i < 3 ? sec(iron) : "none" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 22 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 300, color: sand, marginBottom: 6, lineHeight: 1.25 }}>{m.material}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: ash, marginBottom: 24, paddingBottom: 24, borderBottom: sec(iron) }}>{m.spec}</div>
              <p style={{ fontSize: 12, lineHeight: 1.95, color: ash }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPECS ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />technical specifications
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: sand }}>Every number, stated precisely.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {SPECS.map(([k, v], i) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 40px", borderBottom: sec(iron), borderRight: i % 2 === 0 ? sec(iron) : "none", gap: 16 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: ash, flexShrink: 0 }}>{k}</span>
              <span style={{ fontSize: 13, color: sand, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONFIGURE TEASER ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "72px 40px", borderRight: sec(iron), display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,.011) 79px,rgba(255,255,255,.011) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,.011) 79px,rgba(255,255,255,.011) 80px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: upholstery.hex, mixBlendMode: "color", opacity: 0.14, pointerEvents: "none", transition: "background 300ms" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <ProSVG colorHex={upholstery.hex} />
            </div>
            <div style={{ position: "relative", zIndex: 1, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: ash, textAlign: "center" }}>{upholstery.name} Upholstery</div>
          </div>
          <div style={{ padding: "72px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 36 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16 }}>Make it yours</div>
              <h2 style={{ fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 300, lineHeight: 1.2, color: sand, marginBottom: 16 }}>Five colorways. Three frame finishes. Built to your spec.</h2>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: ash, maxWidth: 360 }}>Every Pro is built to order. Delivery and in-home installation within 7–10 business days. Our team positions and calibrates the motor before they leave.</p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Upholstery colorway</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 32 }}>
                {UPHOLSTERY.map(c => (
                  <div key={c.name} onClick={() => setUpholstery(c)} title={c.name}
                    style={{ width: 26, height: 26, borderRadius: "50%", background: c.hex, cursor: "pointer", flexShrink: 0, transition: "all 120ms", boxShadow: upholstery.name === c.name ? "0 0 0 2.5px var(--obsidian), 0 0 0 4.5px var(--sand)" : "none", transform: upholstery.name === c.name ? "scale(1.12)" : "scale(1)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = upholstery.name === c.name ? "scale(1.12)" : "scale(1)")}
                  />
                ))}
                <span style={{ fontSize: 11, color: ash, marginLeft: 4 }}>{upholstery.name}</span>
              </div>
              <Link href="/pilates" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", background: sand, color: obs, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Build Your Pro →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />before you order
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: sand }}>Common questions.</h2>
        </div>
        {FAQS.map(faq => (
          <div key={faq.id} style={{ borderBottom: sec(iron) }}>
            <div onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 72, padding: "0 var(--g)", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 15, fontWeight: 300, color: sand }}>{faq.title}</span>
              <span style={{ fontSize: 22, fontWeight: 300, color: ash, display: "inline-block", transform: openFaq === faq.id ? "rotate(45deg)" : "none", transition: "transform 280ms var(--ease)", flexShrink: 0 }}>+</span>
            </div>
            <div style={{ maxHeight: openFaq === faq.id ? 300 : 0, overflow: "hidden", transition: "max-height 380ms var(--ease)" }}>
              <p style={{ padding: "0 var(--g) 32px", fontSize: 14, lineHeight: 1.9, color: ash, maxWidth: 560 }}>{faq.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── STICKY CTA ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 68, background: "rgba(10,10,10,0.92)", borderTop: sec(iron), backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--g)", zIndex: 400, transform: ctaOn ? "translateY(0)" : "translateY(100%)", transition: "transform 320ms var(--ease)" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 300, color: sand }}>The Pro — Flex Pro Sensol</div>
          <div style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, marginTop: 3 }}>from {fmt(88000)} · 5 colorways · 3 finishes</div>
        </div>
        <Link href="/pilates" style={{ height: 44, padding: "0 28px", background: sand, color: obs, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          Configure Yours →
        </Link>
      </div>

    </div>
  );
}
