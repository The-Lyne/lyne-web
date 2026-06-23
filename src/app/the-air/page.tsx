"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const UPHOLSTERY = [
  { name: "Ivory",    hex: "#E8E4DC" },
  { name: "Stone",    hex: "#C8C0B4" },
  { name: "Obsidian", hex: "#1A1A1A" },
  { name: "Blush",    hex: "#C4957A" },
  { name: "Dusk",     hex: "#4A4558" },
];

const MOVEMENTS = [
  { name: "Footwork",      desc: "Elastic resistance creates smooth, progressive load from retraction through full extension. Five band levels let beginners and advanced practitioners work on the same machine." },
  { name: "Core Series",   desc: "Hundreds, single-leg stretch, criss-cross — elastic tension holds consistent throughout spinal articulation. Better for neutral spine work than motor resistance." },
  { name: "Hip Work",      desc: "Circles, frogs, walking, beats. Spring tension at the end-range makes hip mobility work genuinely resisted — not just bodyweight." },
  { name: "Arm Work",      desc: "12 anchor positions for straps and push-through bar. Band resistance works bi-directionally — same load on push as on pull." },
  { name: "Long Stretch",  desc: "Full posterior chain under spring tension. The Air's elastic resistance naturally decelerates the carriage — joint-protective at every extension point." },
  { name: "Back Rowing",   desc: "The most complete back-of-body sequence in classical Pilates. Elastic springs provide the ideal resistance curve for rowing movements." },
  { name: "Side-Lying",    desc: "Hip abduction, inner thigh, glute med in full lateral chain range. Elastic bands provide perfectly graduated lateral resistance." },
  { name: "Elephant",      desc: "Deep hamstring lengthening and spinal decompression under load. The spring system decelerates naturally — making this safe, even under significant stretch." },
];

const MATERIALS = [
  {
    label: "Frame",
    material: "Anodized aluminum",
    spec: "Extruded profile — 3 finishes",
    desc: "Extruded 6061 aluminum profile, hard-anodized to 25 micron depth. Lighter than steel, stronger per kilo. Dimensional tolerance ±0.8mm. Powder-coated in three finishes, or left in brushed natural aluminum.",
  },
  {
    label: "Carriage",
    material: "Precision-machined aluminum",
    spec: "4-wheel sealed — stainless guides",
    desc: "CNC-machined carriage running on four sealed-bearing precision wheels and four stainless steel rails. Silent at all resistance levels. Friction-free. Requires no maintenance and no lubrication.",
  },
  {
    label: "Upholstery",
    material: "Full-grain leather",
    spec: "5cm high-density foam",
    desc: "Top-layer full-grain hide — breathable, durable, and does not crack under consistent use. The same grade specified for premium furniture. Five colorways, cut and stitched to order.",
  },
  {
    label: "Springs",
    material: "Tempered steel",
    spec: "5-spring system — 4 resistance levels",
    desc: "Five individually tempered steel springs with color-coded resistance levels: extra-light, light, medium, heavy, extra-heavy. Interchangeable. Individually replaceable. Consistent resistance profile over the full travel arc.",
  },
];

const SPECS: [string, string][] = [
  ["Dimensions",      "1,360 × 640 × 380mm"],
  ["Machine weight",  "44kg"],
  ["Resistance",      "5-spring elastic system — 4 levels"],
  ["Spring count",    "5 tempered steel springs"],
  ["Band positions",  "12 anchor points"],
  ["Carriage travel", "870mm"],
  ["Upholstery",      "Full-grain leather, 5cm high-density foam"],
  ["Frame",           "Anodized aluminum extrusion"],
  ["Rails",           "Stainless steel — 4-wheel sealed carriage"],
  ["Max load",        "120kg"],
  ["Connectivity",    "Optional — Lyne App"],
  ["Power required",  "None"],
];

const FAQS = [
  { id: "delivery", title: "Delivery & Installation",    body: "White-glove delivery to Greater Cairo and Alexandria. Our team assembles and positions The Air in your preferred room. Delivery within 7–10 business days of order confirmation." },
  { id: "warranty", title: "Warranty",                   body: "2-year warranty on frame and mechanical components. 1-year on upholstery and elastic bands. Springs are individually replaceable — our team comes to you, always." },
  { id: "payment",  title: "Payment & Instalments",      body: "Pay in full by card or bank transfer. Instalment options via Sympl — up to 12 months, 0% interest for the first 3. A 30% deposit secures your order and production slot." },
  { id: "space",    title: "Space Requirements",         body: "Minimum recommended room footprint: 2.5m × 4.5m. The Air is the most space-efficient reformer in our range. A free space consultation is available before you commit." },
  { id: "compare",  title: "The Air vs. The Pro",        body: "The Air uses a 5-spring elastic resistance system — lighter, quieter, no power required. The Pro uses an adaptive motor with digital resistance control and Lyne app integration. Both are built to the same material and construction standard." },
];

function fmt(n: number) { return "EGP " + n.toLocaleString(); }

function AirSVG({ colorHex }: { colorHex: string }) {
  return (
    <svg viewBox="0 0 560 240" fill="none" style={{ width: "100%" }}>
      {/* Frame rails */}
      <rect x="60" y="132" width="440" height="7" rx="3.5" fill="#0C0C0C" opacity="0.14" />
      <rect x="60" y="145" width="440" height="6" rx="3" fill="#0C0C0C" opacity="0.09" />
      {/* Carriage */}
      <rect x="160" y="90" width="240" height="54" rx="2" fill="#DDD9D3" opacity="0.6" />
      <rect x="160" y="90" width="240" height="22" rx="2" fill={colorHex} opacity="0.72" />
      <rect x="160" y="90" width="240" height="0.5" fill="#0C0C0C" opacity="0.2" />
      <line x1="160" y1="112" x2="400" y2="112" stroke="#0C0C0C" strokeWidth="0.5" opacity="0.12" />
      {/* Shoulder blocks */}
      <rect x="366" y="90" width="14" height="22" rx="2" fill="#C8C4BE" opacity="0.7" />
      <rect x="384" y="90" width="14" height="22" rx="2" fill="#C0BCB8" opacity="0.6" />
      {/* Spring bracket */}
      <rect x="60" y="124" width="18" height="32" rx="2" fill="#C8C4BE" opacity="0.55" />
      {/* Spring paths */}
      <path d="M78 130 C92 130 92 146 106 146 C120 146 120 130 134 130 C148 130 148 146 160 146" stroke="#B8B4AE" strokeWidth="1.5" fill="none" />
      <path d="M78 138 C92 138 92 150 106 150 C120 150 120 138 134 138 C148 138 148 150 160 150" stroke="#B0ACA8" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Footbar post */}
      <rect x="152" y="70" width="6" height="92" rx="3" fill="#C4C0BB" opacity="0.65" />
      {/* Footbar rails */}
      <rect x="128" y="80" width="26" height="5" rx="2.5" fill="#B8B4AF" opacity="0.6" />
      <rect x="128" y="96" width="26" height="5" rx="2.5" fill="#B8B4AF" opacity="0.6" />
      <rect x="128" y="112" width="26" height="5" rx="2.5" fill="#B8B4AF" opacity="0.6" />
      {/* Headrest */}
      <rect x="156" y="74" width="70" height="18" rx="2" fill="#DCD8D3" opacity="0.8" />
      <rect x="160" y="75" width="62" height="12" rx="1" fill={colorHex} opacity="0.85" />
      {/* Legs */}
      <rect x="72" y="151" width="8" height="68" rx="4" fill="#C8C5C0" opacity="0.55" />
      <rect x="52" y="217" width="48" height="5" rx="2.5" fill="#BDBAB5" opacity="0.5" />
      <rect x="168" y="151" width="8" height="68" rx="4" fill="#C4C1BC" opacity="0.5" />
      <rect x="148" y="217" width="48" height="5" rx="2.5" fill="#BDBAB5" opacity="0.45" />
      <rect x="382" y="151" width="8" height="68" rx="4" fill="#C4C1BC" opacity="0.5" />
      <rect x="362" y="217" width="48" height="5" rx="2.5" fill="#BDBAB5" opacity="0.45" />
      <rect x="478" y="151" width="8" height="68" rx="4" fill="#C8C5C0" opacity="0.55" />
      <rect x="458" y="217" width="48" height="5" rx="2.5" fill="#BDBAB5" opacity="0.5" />
    </svg>
  );
}

export default function TheAirPage() {
  const [upholstery, setUpholstery] = useState(UPHOLSTERY[0]);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [ctaOn, setCtaOn] = useState(false);

  useEffect(() => {
    const fn = () => setCtaOn(window.scrollY > 120);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const paper = "var(--paper)";
  const obs   = "var(--obsidian)";
  const ash   = "var(--ash)";
  const iron  = "rgba(12,12,12,0.08)";
  const sec   = (c: string) => `0.5px solid ${c}`;

  return (
    <div style={{ background: paper, color: obs }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "var(--nav-h)", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", borderBottom: sec(iron) }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(0,0,0,.012) 79px,rgba(0,0,0,.012) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(0,0,0,.012) 79px,rgba(0,0,0,.012) 80px)", pointerEvents: "none" }} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px var(--g) 60px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "min(860px, 90%)" }}>
            <AirSVG colorHex={upholstery.hex} />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, borderTop: sec(iron), display: "grid", gridTemplateColumns: "1fr 1fr", padding: "32px var(--g) 48px", gap: 48 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Flex Air — Sensol</div>
            <h1 style={{ fontSize: "clamp(40px,5.5vw,70px)", fontWeight: 300, lineHeight: 1.03, textTransform: "lowercase", letterSpacing: "-0.015em", color: obs }}>the air.</h1>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: ash, marginTop: 18, maxWidth: 380 }}>Spring-based elastic resistance. Five-spring system. Four levels. The complete Pilates method in the lightest possible frame.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", gap: 18 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: ash }}>from</div>
              <div style={{ fontSize: 36, fontWeight: 300, color: obs, marginTop: 4 }}>{fmt(55000)}</div>
            </div>
            <Link href="/pilates" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 30px", background: obs, color: paper, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none" }}>
              Configure Yours →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{ padding: "104px var(--g)", borderBottom: sec(iron) }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "end" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, lineHeight: 1.8 }}>
            The spring-resistance reformer<br />built for the Egyptian home.
          </div>
          <blockquote style={{ fontSize: "clamp(22px,3.2vw,44px)", fontWeight: 300, lineHeight: 1.22, letterSpacing: "-0.01em", color: obs }}>
            Precision without complexity.<br />The complete Pilates method<br />without a single wire.
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
            <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: obs }}>The complete classical method.<br />Every movement. Every level.</h2>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {MOVEMENTS.map((m, i) => (
            <div key={m.name} style={{ padding: "44px 40px 52px", borderRight: (i + 1) % 4 !== 0 ? sec(iron) : "none", borderBottom: i < 4 ? sec(iron) : "none" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", color: ash, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: "0.5px", background: ash, display: "inline-block" }} />
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 300, color: obs, marginBottom: 14, textTransform: "lowercase", lineHeight: 1.2 }}>{m.name}</h3>
              <p style={{ fontSize: 12, lineHeight: 1.9, color: ash }}>{m.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: sec(iron) }}>
          {[
            { stat: "120kg",  label: "Max load capacity" },
            { stat: "5",      label: "Spring resistance levels" },
            { stat: "870mm",  label: "Full carriage travel" },
            { stat: "44kg",   label: "Machine weight" },
          ].map((s, i) => (
            <div key={s.stat} style={{ padding: "44px 40px", borderRight: i < 3 ? sec(iron) : "none" }}>
              <div style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: obs, lineHeight: 1, marginBottom: 10 }}>{s.stat}</div>
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
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: obs }}>Light enough to move.<br />Rigid enough to last decades.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {MATERIALS.map((m, i) => (
            <div key={m.label} style={{ padding: "52px 40px 60px", borderRight: i < 3 ? sec(iron) : "none" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 22 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 300, color: obs, marginBottom: 6, lineHeight: 1.25 }}>{m.material}</div>
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
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: obs }}>Every number, stated precisely.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {SPECS.map(([k, v], i) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 40px", borderBottom: sec(iron), borderRight: i % 2 === 0 ? sec(iron) : "none", gap: 16 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: ash, flexShrink: 0 }}>{k}</span>
              <span style={{ fontSize: 13, color: obs, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONFIGURE TEASER ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ padding: "72px 40px", borderRight: sec(iron), display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, background: "var(--cement)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(0,0,0,.009) 79px,rgba(0,0,0,.009) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(0,0,0,.009) 79px,rgba(0,0,0,.009) 80px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <AirSVG colorHex={upholstery.hex} />
            </div>
            <div style={{ position: "relative", zIndex: 1, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: ash, textAlign: "center" }}>{upholstery.name} Upholstery</div>
          </div>
          <div style={{ padding: "72px 40px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 36 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16 }}>Make it yours</div>
              <h2 style={{ fontSize: "clamp(22px,2.5vw,36px)", fontWeight: 300, lineHeight: 1.2, color: obs, marginBottom: 16 }}>Five colorways. Three frame finishes. Built to your spec.</h2>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: ash, maxWidth: 360 }}>Every Air is built to order. White-glove delivery and in-home assembly within 7–10 business days. Our team positions it before they leave.</p>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Upholstery colorway</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 32 }}>
                {UPHOLSTERY.map(c => (
                  <div key={c.name} onClick={() => setUpholstery(c)} title={c.name}
                    style={{ width: 26, height: 26, borderRadius: "50%", background: c.hex, cursor: "pointer", flexShrink: 0, transition: "all 120ms", boxShadow: upholstery.name === c.name ? `0 0 0 2.5px ${paper}, 0 0 0 4.5px ${obs}` : "none", transform: upholstery.name === c.name ? "scale(1.12)" : "scale(1)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.15)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = upholstery.name === c.name ? "scale(1.12)" : "scale(1)")}
                  />
                ))}
                <span style={{ fontSize: 11, color: ash, marginLeft: 4 }}>{upholstery.name}</span>
              </div>
              <Link href="/pilates" style={{ display: "inline-flex", alignItems: "center", height: 50, padding: "0 28px", background: obs, color: paper, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Build Your Air →
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
          <h2 style={{ fontSize: "clamp(26px,3vw,42px)", fontWeight: 300, color: obs }}>Common questions.</h2>
        </div>
        {FAQS.map(faq => (
          <div key={faq.id} style={{ borderBottom: sec(iron) }}>
            <div onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 72, padding: "0 var(--g)", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 15, fontWeight: 300, color: obs }}>{faq.title}</span>
              <span style={{ fontSize: 22, fontWeight: 300, color: ash, display: "inline-block", transform: openFaq === faq.id ? "rotate(45deg)" : "none", transition: "transform 280ms var(--ease)", flexShrink: 0 }}>+</span>
            </div>
            <div style={{ maxHeight: openFaq === faq.id ? 300 : 0, overflow: "hidden", transition: "max-height 380ms var(--ease)" }}>
              <p style={{ padding: "0 var(--g) 32px", fontSize: 14, lineHeight: 1.9, color: ash, maxWidth: 560 }}>{faq.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── STICKY CTA ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 68, background: "rgba(250,250,248,0.94)", borderTop: sec(iron), backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--g)", zIndex: 400, transform: ctaOn ? "translateY(0)" : "translateY(100%)", transition: "transform 320ms var(--ease)" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 300, color: obs }}>The Air — Flex Air Sensol</div>
          <div style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, marginTop: 3 }}>from {fmt(55000)} · 5 colorways · 3 finishes</div>
        </div>
        <Link href="/pilates" style={{ height: 44, padding: "0 28px", background: obs, color: paper, fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          Configure Yours →
        </Link>
      </div>

    </div>
  );
}
