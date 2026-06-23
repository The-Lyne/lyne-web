"use client";
import { useState, useEffect, useRef } from "react";

const PRICES = {
  air: 55000, pro: 88000,
  pad_memory: 950, springs_full: 2200, motor_extended: 8000,
  jump: 2800, riser: 3500,
  mat: 1200, socks: 650, bands: 780, ring: 950,
  overball: 580, blocks: 1100, handles: 780, discs: 880,
  box: 2100, toe_corrector: 750, foot_corrector: 850,
  dowel: 580, carry_tote: 1600, giftWrap: 500,
} as const;

const PAD_COLORS = { chalk: "#EAE4DA", slate: "#8A8480" };
const COLOR_NAMES = { chalk: "Chalk", slate: "Slate" };
const ACC_NAMES: Record<string, string> = {
  mat: "Mat", socks: "Grip Socks", bands: "Bands", ring: "Ring",
  overball: "Overball", blocks: "Blocks", handles: "Handles", discs: "Discs",
  box: "Box", toe_corrector: "Toe Corrector", foot_corrector: "Foot Corrector",
  dowel: "Dowel", carry_tote: "Carry Tote",
};

function fmt(n: number) { return "EGP " + n.toLocaleString(); }

type Model = "air" | "pro";
type Color = "chalk" | "slate";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  const obs = "var(--obsidian)";
  const ash = "var(--ash)";
  return (
    <div onClick={onClick} style={{
      width: 44, height: 24, position: "relative", cursor: "pointer", flexShrink: 0,
      background: on ? "rgba(12,12,12,0.1)" : "rgba(12,12,12,0.04)",
      border: `0.5px solid ${on ? "rgba(12,12,12,0.5)" : "rgba(12,12,12,0.18)"}`,
      transition: "all 220ms",
    }}>
      <div style={{ position: "absolute", top: 4, left: on ? 24 : 4, width: 14, height: 14, background: on ? obs : ash, transition: "all 220ms" }} />
    </div>
  );
}

export default function PilatesPage() {
  const [model, setModel] = useState<Model | null>(null);
  const [color, setColor] = useState<Color>("chalk");
  const [pad, setPad] = useState<"standard" | "memory">("standard");
  const [springs, setSprings] = useState<"standard" | "full">("standard");
  const [motor, setMotor] = useState<"standard" | "extended">("extended");
  const [jump, setJump] = useState(false);
  const [riser, setRiser] = useState(false);
  const [accessories, setAccessories] = useState<Set<string>>(new Set());
  const [orderType, setOrderType] = useState<"gift" | "self" | null>(null);
  const [giftMessage, setGiftMessage] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [training, setTraining] = useState<"free" | "subscription" | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());
  const [stickyVisible, setStickyVisible] = useState(false);

  const modelRef = useRef<HTMLElement>(null);
  const configRef = useRef<HTMLElement>(null);
  const accRef = useRef<HTMLElement>(null);
  const orderRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  const padColor = PAD_COLORS[color];
  const obs = "var(--obsidian)";
  const ash = "var(--ash)";
  const iron = "rgba(12,12,12,0.08)";
  const sec = (c: string) => `0.5px solid ${c}`;

  useEffect(() => { if (model) setStickyVisible(true); }, [model]);

  useEffect(() => {
    const OFFSET = 64 + 44 + 80;
    const sections = [
      { ref: modelRef, step: 1 }, { ref: configRef, step: 2 },
      { ref: accRef, step: 3 }, { ref: orderRef, step: 4 }, { ref: summaryRef, step: 4 },
    ];
    const onScroll = () => {
      let current = 1;
      sections.forEach(({ ref, step }) => {
        if (ref.current && ref.current.getBoundingClientRect().top < OFFSET) current = step;
      });
      setActiveStep(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function calcTotal(): number | null {
    if (!model) return null;
    let total: number = PRICES[model];
    if (pad === "memory") total += PRICES.pad_memory;
    if (model === "air" && springs === "full") total += PRICES.springs_full;
    if (model === "pro" && motor === "extended") total += PRICES.motor_extended;
    if (jump) total += PRICES.jump;
    if (model === "pro" && riser) total += PRICES.riser;
    accessories.forEach(k => {
      const price = PRICES[k as keyof typeof PRICES];
      if (typeof price === "number") total += price;
    });
    if (giftWrap) total += PRICES.giftWrap;
    return total;
  }

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - (64 + 44 + 1);
    window.scrollTo({ top, behavior: "smooth" });
  }

  function selectModel(m: Model) {
    setModel(m);
    setDoneSteps(prev => new Set([...prev, 1]));
    setActiveStep(2);
    setTimeout(() => scrollTo(configRef), 120);
  }

  function toggleAcc(key: string) {
    setAccessories(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  const total = calcTotal();
  const stickyParts = [COLOR_NAMES[color]];
  if (pad === "memory") stickyParts.push("Memory Foam");
  if (model === "air" && springs === "full") stickyParts.push("Full Springs");
  if (model === "pro" && motor === "extended") stickyParts.push("120kg Motor");
  if (jump) stickyParts.push("Jump Board");
  if (riser) stickyParts.push("Riser Kit");

  const summaryRows: { k: string; v: string }[] = [];
  if (model) {
    summaryRows.push({ k: "Model", v: model === "air" ? "The Air — Flex Air Sensol" : "The Pro — Flex Pro Sensol" });
    summaryRows.push({ k: "Finish", v: COLOR_NAMES[color] });
    summaryRows.push({ k: "Headrest Pad", v: pad === "standard" ? "Standard" : "Memory Foam" });
    if (model === "air") summaryRows.push({ k: "Spring Package", v: springs === "standard" ? "Standard — 4 Springs" : "Full Set — 5 Springs" });
    if (model === "pro") summaryRows.push({ k: "Motor Range", v: motor === "standard" ? "Standard — 80kg" : "Extended — 120kg" });
    if (jump) summaryRows.push({ k: "Jump Board", v: "Included" });
    if (model === "pro" && riser) summaryRows.push({ k: "Riser Kit", v: "Included" });
    const selectedAcc = [...accessories].map(k => ACC_NAMES[k]).filter(Boolean);
    if (selectedAcc.length) summaryRows.push({ k: "Accessories", v: selectedAcc.join(", ") });
    if (orderType) summaryRows.push({ k: "Order Type", v: orderType === "gift" ? "Gift" : "Self Order" });
    if (orderType === "gift" && giftWrap) summaryRows.push({ k: "Gift Wrapping", v: "Premium Wrapping" });
    if (training) summaryRows.push({ k: "Training", v: training === "free" ? "Free — Lyne App" : "Subscription — Live Coaching (Free Trial)" });
  }

  const AirSVG = ({ padFill }: { padFill: string }) => (
    <svg viewBox="0 0 480 220" fill="none" style={{ width: "100%" }}>
      <rect x="48" y="98" width="384" height="7" rx="3.5" fill="#D8D4CF" />
      <rect x="48" y="115" width="384" height="7" rx="3.5" fill="#CCCAC5" />
      <rect x="170" y="82" width="180" height="58" rx="3" fill="#E8E4DF" />
      <rect x="175" y="86" width="170" height="22" rx="2" fill={padFill} />
      <line x1="175" y1="107" x2="345" y2="107" stroke="#D4CFC9" strokeWidth="0.5" />
      <rect x="318" y="82" width="12" height="20" rx="2" fill="#D0CCC7" />
      <rect x="334" y="82" width="12" height="20" rx="2" fill="#D0CCC7" />
      <path d="M78 101 C88 101 88 115 98 115 C108 115 108 101 118 101 C128 101 128 115 138 115 C148 115 148 101 158 101 C168 101 168 115 170 115" stroke="#C8C4BE" strokeWidth="1.5" fill="none" />
      <path d="M78 108 C88 108 88 118 98 118 C108 118 108 108 118 108 C128 108 128 118 138 118 C148 118 148 108 158 108 C168 108 168 118 170 118" stroke="#C0BCB7" strokeWidth="1" fill="none" opacity={0.5} />
      <rect x="62" y="95" width="18" height="30" rx="2" fill="#C8C4BE" />
      <rect x="44" y="70" width="7" height="90" rx="3.5" fill="#C4C0BB" />
      <rect x="22" y="80" width="30" height="5" rx="2.5" fill="#B8B4AF" />
      <rect x="22" y="96" width="30" height="5" rx="2.5" fill="#B8B4AF" />
      <rect x="22" y="112" width="30" height="5" rx="2.5" fill="#B8B4AF" />
      <rect x="350" y="78" width="72" height="12" rx="2" fill="#DCD8D3" />
      <rect x="355" y="79" width="62" height="8" rx="1" fill={padFill} />
      <rect x="56" y="120" width="7" height="56" rx="3.5" fill="#C8C5C0" />
      <rect x="148" y="120" width="7" height="56" rx="3.5" fill="#C4C1BC" />
      <rect x="330" y="120" width="7" height="56" rx="3.5" fill="#C4C1BC" />
      <rect x="422" y="120" width="7" height="56" rx="3.5" fill="#C8C5C0" />
      <rect x="42" y="174" width="34" height="5" rx="2.5" fill="#BDBAB5" />
      <rect x="134" y="174" width="34" height="5" rx="2.5" fill="#BDBAB5" />
      <rect x="316" y="174" width="34" height="5" rx="2.5" fill="#BDBAB5" />
      <rect x="408" y="174" width="34" height="5" rx="2.5" fill="#BDBAB5" />
    </svg>
  );

  const ProSVG = ({ padFill }: { padFill: string }) => (
    <svg viewBox="0 0 480 220" fill="none" style={{ width: "100%" }}>
      <rect x="48" y="96" width="384" height="9" rx="4" fill="#C8C4BE" />
      <rect x="48" y="115" width="384" height="9" rx="4" fill="#BDB9B4" />
      <rect x="170" y="78" width="180" height="62" rx="3" fill="#E4E0DB" />
      <rect x="175" y="82" width="170" height="24" rx="2" fill={padFill} />
      <line x1="175" y1="105" x2="345" y2="105" stroke="#D0CBC5" strokeWidth="0.5" />
      <rect x="315" y="78" width="14" height="22" rx="2" fill="#CCCAC5" />
      <rect x="332" y="78" width="14" height="22" rx="2" fill="#CCCAC5" />
      <rect x="48" y="68" width="70" height="70" rx="4" fill="#C8C4BE" />
      <rect x="54" y="74" width="58" height="58" rx="3" fill="#D0CCC7" />
      <rect x="60" y="86" width="46" height="28" rx="2" fill="#1A1A1A" opacity={0.7} />
      <line x1="65" y1="95" x2="100" y2="95" stroke="#EAE4DA" strokeWidth="0.8" opacity={0.4} />
      <line x1="65" y1="101" x2="90" y2="101" stroke="#EAE4DA" strokeWidth="0.8" opacity={0.25} />
      <circle cx="98" cy="105" r="3" fill="#EAE4DA" opacity={0.3} />
      <rect x="44" y="138" width="78" height="8" rx="4" fill="#BDBAB5" />
      <rect x="118" y="80" width="5" height="68" rx="2.5" fill="#C4C0BB" />
      <rect x="124" y="85" width="28" height="5" rx="2.5" fill="#B8B4AF" />
      <rect x="124" y="99" width="28" height="5" rx="2.5" fill="#B8B4AF" />
      <rect x="124" y="113" width="28" height="5" rx="2.5" fill="#B8B4AF" />
      <rect x="350" y="74" width="76" height="14" rx="2" fill="#D4D0CB" />
      <rect x="355" y="75" width="66" height="10" rx="2" fill={padFill} />
      <rect x="146" y="122" width="9" height="54" rx="4" fill="#C4C1BB" />
      <rect x="326" y="122" width="9" height="54" rx="4" fill="#C4C1BB" />
      <rect x="422" y="122" width="9" height="54" rx="4" fill="#C8C5C0" />
      <rect x="132" y="174" width="38" height="5" rx="2.5" fill="#BDBAB5" />
      <rect x="312" y="174" width="38" height="5" rx="2.5" fill="#BDBAB5" />
      <rect x="408" y="174" width="38" height="5" rx="2.5" fill="#BDBAB5" />
    </svg>
  );

  return (
    <div style={{ paddingTop: "calc(var(--nav-h) + 44px)", background: "var(--paper)", color: obs }}>

      {/* ── STEP BAR ── */}
      <div style={{ position: "sticky", top: "var(--nav-h)", height: 44, background: "var(--paper)", borderBottom: sec(iron), display: "flex", alignItems: "stretch", zIndex: 200 }}>
        {[
          { label: "Choose", step: 1, ref: modelRef },
          { label: "Configure", step: 2, ref: configRef },
          { label: "Accessories", step: 3, ref: accRef },
          { label: "Complete", step: 4, ref: orderRef },
        ].map(({ label, step, ref }, i) => {
          const isDone = doneSteps.has(step);
          const isActive = !isDone && activeStep === step;
          return (
            <div key={step} onClick={() => scrollTo(ref)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 24px", borderRight: i < 3 ? sec(iron) : "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, border: isDone ? "none" : `0.5px solid ${isActive ? obs : ash}`, background: isDone ? obs : "transparent", color: isDone ? "var(--paper)" : (isActive ? obs : ash), transition: "all 200ms" }}>
                {isDone ? "✓" : step}
              </div>
              <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: isActive ? obs : ash, transition: "color 200ms" }}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* ── STEP 1: MODEL ── */}
      <section ref={modelRef}>
        <div style={{ padding: "56px var(--g) 40px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />step 01
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>the reformer</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
          {[
            { id: "air" as Model, tag: "Flex Air — Sensol", name: "the air.", desc: "Spring-based resistance. Five-spring system. The complete Pilates method in the lightest possible frame — precision without complexity.", specs: [["Dimensions", "1360 × 640 × 380mm"], ["Weight", "44kg"], ["Resistance", "5-spring system, 4 resistance levels"], ["Max load", "120kg"]], price: 55000 },
            { id: "pro" as Model, tag: "Flex Pro — Sensol", name: "the pro.", desc: "Adaptive motor resistance. 0–120kg range. Connected to the Lyne app with 200+ guided movements designed for your reformer.", specs: [["Dimensions", "1390 × 660 × 420mm"], ["Weight", "56kg"], ["Motor", "Adaptive, 0–120kg range"], ["Connectivity", "Lyne app — 200+ guided movements"]], price: 88000 },
          ].map((m, mi) => (
            <div key={m.id} onClick={() => selectModel(m.id)} style={{
              padding: "56px var(--g)", borderRight: mi === 0 ? sec(iron) : "none",
              cursor: "pointer", position: "relative", transition: "background 200ms",
              background: model === m.id ? "rgba(12,12,12,0.04)" : "transparent",
              outline: model === m.id ? "0.5px solid rgba(12,12,12,0.4)" : "none",
            }}
              onMouseEnter={e => { if (model !== m.id) e.currentTarget.style.background = "rgba(12,12,12,0.02)"; }}
              onMouseLeave={e => { if (model !== m.id) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ width: "100%", aspectRatio: "16/9", background: "#EDE8DF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, overflow: "hidden", padding: "0 24px" }}>
                {m.id === "air" ? <AirSVG padFill={padColor} /> : <ProSVG padFill={padColor} />}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 10 }}>{m.tag}</div>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 300, color: obs, marginBottom: 10, textTransform: "lowercase", lineHeight: 1.1 }}>{m.name}</h3>
              <p style={{ fontSize: 13, color: ash, lineHeight: 1.85, maxWidth: 340, marginBottom: 28 }}>{m.desc}</p>
              <div style={{ padding: "20px 0", borderTop: sec(iron), borderBottom: sec(iron), marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {m.specs.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash }}>{k}</span>
                    <span style={{ fontSize: 12, color: obs }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 22, fontWeight: 300, color: obs, marginBottom: 20 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, marginRight: 8 }}>from</span>
                EGP {m.price.toLocaleString()}
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 44, padding: "0 28px", background: model === m.id ? obs : "transparent", color: model === m.id ? "var(--paper)" : ash, fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", border: `0.5px solid ${model === m.id ? obs : "rgba(12,12,12,0.25)"}`, cursor: "pointer", transition: "all 200ms" }}>
                {model === m.id ? "Selected ✓" : "Configure"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STEP 2: CONFIGURE ── */}
      <section ref={configRef}>
        <div style={{ padding: "56px var(--g) 40px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />step 02
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>configure</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", borderBottom: sec(iron) }}>
          {/* Sticky visual */}
          <div style={{ position: "sticky", top: "calc(var(--nav-h) + 44px)", height: "calc(100vh - var(--nav-h) - 44px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: sec(iron), padding: 56, gap: 24, alignSelf: "start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: padColor, transition: "background 300ms", flexShrink: 0 }} />
              <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>
                {model ? (model === "air" ? "the air — Flex Air Sensol" : "the pro — Flex Pro Sensol") : "select a reformer above"}
              </span>
            </div>
            {(!model || model === "air") && (
              <div style={{ width: "100%", maxWidth: 440, opacity: model === "air" ? 1 : 0.3, transition: "opacity 300ms" }}>
                <AirSVG padFill={padColor} />
              </div>
            )}
            {model === "pro" && (
              <div style={{ width: "100%", maxWidth: 440 }}>
                <ProSVG padFill={padColor} />
              </div>
            )}
          </div>

          {/* Options panel */}
          <div style={{ padding: "48px 40px 140px" }}>

            {/* FINISH */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Finish</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {(["chalk", "slate"] as Color[]).map(c => (
                  <div key={c} onClick={() => setColor(c)} title={COLOR_NAMES[c]} style={{ width: 28, height: 28, borderRadius: "50%", background: PAD_COLORS[c], cursor: "pointer", boxShadow: color === c ? `0 0 0 2.5px var(--paper), 0 0 0 4px ${obs}` : "none", transition: "transform 120ms, box-shadow 120ms", flexShrink: 0 }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ))}
                <span style={{ fontSize: 11, color: ash, marginLeft: 6 }}>{COLOR_NAMES[color]}</span>
              </div>
            </div>

            {/* HEADREST PAD */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Headrest Pad</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[{ val: "standard", label: "Standard" }, { val: "memory", label: "Memory Foam", note: "Recommended" }].map(p => (
                  <div key={p.val} onClick={() => setPad(p.val as "standard" | "memory")} style={{ height: 32, padding: "0 14px", cursor: "pointer", border: `0.5px solid ${pad === p.val ? obs : "rgba(12,12,12,0.2)"}`, background: pad === p.val ? obs : "transparent", color: pad === p.val ? "var(--paper)" : ash, fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 150ms" }}>
                    {p.label}
                    {p.note && <span style={{ fontSize: 8, background: pad === p.val ? "rgba(255,255,255,0.15)" : "#2C3E2D", padding: "2px 6px", color: pad === p.val ? "rgba(255,255,255,0.75)" : "#EAE4DA" }}>{p.note}</span>}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: ash, marginTop: 10, lineHeight: 1.7 }}>Memory foam contours to the cervical spine — better for long sessions and sensitive necks.</p>
              {pad === "memory" && <p style={{ fontSize: 11, color: ash, marginTop: 4 }}>+EGP 950</p>}
            </div>

            {/* SPRING PACKAGE (Air only) */}
            {(!model || model === "air") && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Spring Package</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    { val: "standard", label: "Standard — 4 Springs", sub: "Light · Medium · Heavy · Extra Heavy", price: "Included" },
                    { val: "full", label: "Full Set — 5 Springs", sub: "Adds extra-light spring for rehab and precise balance work", price: "+EGP 2,200" },
                  ].map(s => (
                    <div key={s.val} onClick={() => setSprings(s.val as "standard" | "full")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", border: `0.5px solid ${springs === s.val ? obs : "rgba(12,12,12,0.12)"}`, background: springs === s.val ? "rgba(12,12,12,0.04)" : "transparent", transition: "all 150ms" }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", border: `0.5px solid rgba(12,12,12,0.3)`, flexShrink: 0, position: "relative" }}>
                        {springs === s.val && <div style={{ position: "absolute", top: 3, right: 3, bottom: 3, left: 3, borderRadius: "50%", background: obs }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: obs }}>{s.label}</div>
                        <div style={{ fontSize: 10, color: ash }}>{s.sub}</div>
                      </div>
                      <span style={{ fontSize: 11, color: ash, flexShrink: 0 }}>{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MOTOR RANGE (Pro only) */}
            {model === "pro" && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Motor Resistance Range</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[
                    { val: "standard", kg: "80", label: "Standard", note: "Included" },
                    { val: "extended", kg: "120", label: "Extended", note: "+EGP 8,000", rec: true },
                  ].map(m => {
                    const isActive = motor === m.val;
                    return (
                      <div key={m.val} onClick={() => setMotor(m.val as "standard" | "extended")} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: "20px 12px", border: `0.5px solid ${isActive ? obs : "rgba(12,12,12,0.18)"}`, background: isActive ? obs : "transparent", cursor: "pointer", position: "relative", transition: "all 150ms" }}>
                        {"rec" in m && m.rec && <span style={{ position: "absolute", top: -9, fontSize: 8, background: "#2C3E2D", color: "#EAE4DA", padding: "1px 6px" }}>Recommended</span>}
                        <span style={{ fontSize: 24, fontWeight: 300, color: isActive ? "var(--paper)" : obs }}>{m.kg}<small style={{ fontSize: 12 }}>kg</small></span>
                        <span style={{ fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", color: isActive ? "rgba(255,255,255,0.7)" : ash }}>{m.label}</span>
                        <span style={{ fontSize: 10, color: isActive ? "rgba(255,255,255,0.5)" : ash }}>{m.note}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* JUMP BOARD */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Jump Board</div>
              <div style={{ borderTop: "0.5px solid rgba(12,12,12,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "0.5px solid rgba(12,12,12,0.07)" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(12,12,12,0.03)", border: "0.5px solid rgba(12,12,12,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 26 26" fill="none" width="26" height="26">
                      <rect x="3" y="6" width="20" height="14" rx="2" fill="none" stroke="#9A9490" strokeWidth="1.2" />
                      <rect x="7" y="10" width="12" height="6" rx="1" fill="#D8D4CF" />
                      <line x1="3" y1="10" x2="23" y2="10" stroke="#9A9490" strokeWidth="0.8" opacity={0.5} />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: obs, marginBottom: 2 }}>Jump Board</div>
                    <div style={{ fontSize: 10, color: ash }}>Attaches to footbar end — cardio, plyometric, and leg conditioning</div>
                  </div>
                  <span style={{ fontSize: 11, color: obs, flexShrink: 0 }}>+EGP 2,800</span>
                  <Toggle on={jump} onClick={() => setJump(j => !j)} />
                </div>
              </div>
            </div>

            {/* RISER KIT (Pro only) */}
            {model === "pro" && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Riser Kit</div>
                <div style={{ borderTop: "0.5px solid rgba(12,12,12,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "0.5px solid rgba(12,12,12,0.07)" }}>
                    <div style={{ width: 44, height: 44, background: "rgba(12,12,12,0.03)", border: "0.5px solid rgba(12,12,12,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg viewBox="0 0 26 26" fill="none" width="26" height="26">
                        <rect x="4" y="16" width="18" height="5" rx="2" fill="#D8D4CF" />
                        <rect x="4" y="8" width="18" height="5" rx="2" fill="#CCCAC5" />
                        <rect x="6" y="5" width="3" height="3" fill="#C4C0BB" />
                        <rect x="17" y="5" width="3" height="3" fill="#C4C0BB" />
                        <rect x="6" y="21" width="3" height="3" fill="#C4C0BB" />
                        <rect x="17" y="21" width="3" height="3" fill="#C4C0BB" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: obs, marginBottom: 2 }}>Riser Kit</div>
                      <div style={{ fontSize: 10, color: ash }}>Raises the reformer 20cm — better for taller practitioners, easier mounting</div>
                    </div>
                    <span style={{ fontSize: 11, color: obs, flexShrink: 0 }}>+EGP 3,500</span>
                    <Toggle on={riser} onClick={() => setRiser(r => !r)} />
                  </div>
                </div>
              </div>
            )}

            <div style={{ fontSize: 11, color: ash, lineHeight: 1.8, borderTop: "0.5px solid rgba(12,12,12,0.1)", paddingTop: 20 }}>
              Free delivery &amp; installation within Cairo.<br />3–7 business days. A Lyne advisor will confirm your delivery window.
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 3: ACCESSORIES ── */}
      <section ref={accRef}>
        <div style={{ padding: "56px var(--g) 40px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />step 03
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>complete the practice.</h2>
        </div>

        <div style={{ padding: "56px var(--g) 72px", borderBottom: sec(iron) }}>
          {[
            {
              tier: "Must Have", note: "The foundation of every practice.",
              items: [
                { key: "mat", name: "mat", note: "10mm non-slip Pilates mat, Sand", price: 1200, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="28" y="34" width="104" height="32" fill="#D8D4CF" /><ellipse cx="28" cy="50" rx="14" ry="16" fill="#E0DCD8" /><ellipse cx="132" cy="50" rx="14" ry="16" fill="#CAC6C2" /><line x1="28" y1="38" x2="132" y2="38" stroke="#EAE4DA" strokeWidth="1.5" /><line x1="28" y1="50" x2="132" y2="50" stroke="#C8C4BF" strokeWidth="0.5" opacity={0.4} /></svg> },
                { key: "socks", name: "grip socks", note: "2-pack, toe grip, Sand colorway", price: 650, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><path d="M30 22 L30 60 Q30 72 42 72 L66 72 Q74 72 74 64 L74 56 L62 56 L62 62 L44 62 L44 22 Z" fill="#E8E4DF" /><circle cx="38" cy="67" r="2" fill="#C8C4BE" /><circle cx="48" cy="69" r="2" fill="#C8C4BE" /><circle cx="58" cy="69" r="2" fill="#C8C4BE" /><circle cx="66" cy="67" r="2" fill="#C8C4BE" /><path d="M86 22 L86 60 Q86 72 98 72 L122 72 Q130 72 130 64 L130 56 L118 56 L118 62 L100 62 L100 22 Z" fill="#E8E4DF" /><circle cx="94" cy="67" r="2" fill="#C8C4BE" /><circle cx="104" cy="69" r="2" fill="#C8C4BE" /><circle cx="114" cy="69" r="2" fill="#C8C4BE" /><circle cx="122" cy="67" r="2" fill="#C8C4BE" /></svg> },
                { key: "bands", name: "bands", note: "3 resistance levels — light, medium, heavy", price: 780, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><ellipse cx="80" cy="68" rx="50" ry="14" fill="#9A9490" /><ellipse cx="80" cy="68" rx="36" ry="8" fill="#F0EDE9" /><ellipse cx="80" cy="56" rx="50" ry="14" fill="#EAE4DA" /><ellipse cx="80" cy="56" rx="36" ry="8" fill="#F0EDE9" /><ellipse cx="80" cy="44" rx="50" ry="14" fill="#D8D4CF" /><ellipse cx="80" cy="44" rx="36" ry="8" fill="#F0EDE9" /></svg> },
                { key: "ring", name: "ring", note: "Core, inner thigh, upper body activation", price: 950, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><circle cx="80" cy="50" r="36" fill="none" stroke="#D8D4CF" strokeWidth="6" /><circle cx="80" cy="50" r="28" fill="none" stroke="#E4E0DB" strokeWidth="0.8" opacity={0.6} /><ellipse cx="80" cy="14" rx="10" ry="6" fill="#C8C4BE" /><ellipse cx="80" cy="86" rx="10" ry="6" fill="#C8C4BE" /></svg> },
              ]
            },
            {
              tier: "Should Have", note: "Expands what the reformer can do.",
              items: [
                { key: "overball", name: "overball", note: "22cm soft ball, deep core and pelvic floor", price: 580, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><circle cx="80" cy="50" r="34" fill="#E8E4DF" /><circle cx="80" cy="50" r="26" fill="none" stroke="#D8D4CF" strokeWidth="0.8" opacity={0.5} /><ellipse cx="68" cy="38" rx="10" ry="7" fill="#F0EDE9" opacity={0.7} /></svg> },
                { key: "blocks", name: "blocks", note: "Foam pair, alignment and flexibility work", price: 1100, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="22" y="40" width="52" height="34" rx="2" fill="#E0DCD8" /><polygon points="22,40 52,24 104,24 74,40" fill="#EAE4DA" /><polygon points="74,40 104,24 104,58 74,74" fill="#D4D0CB" /><rect x="88" y="50" width="50" height="28" rx="2" fill="#E0DCD8" opacity={0.9} /><polygon points="88,50 116,36 138,36 110,50" fill="#EAE4DA" opacity={0.85} /><polygon points="110,50 138,36 138,64 110,78" fill="#D4D0CB" opacity={0.85} /></svg> },
                { key: "handles", name: "handles", note: "Reformer strap handles, spare set", price: 780, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="18" y="30" width="50" height="40" rx="6" fill="#D8D4CF" /><rect x="24" y="36" width="38" height="28" rx="4" fill="#E8E4DF" /><rect x="30" y="24" width="26" height="10" rx="5" fill="#CCCAC5" /><rect x="92" y="30" width="50" height="40" rx="6" fill="#D8D4CF" /><rect x="98" y="36" width="38" height="28" rx="4" fill="#E8E4DF" /><rect x="104" y="24" width="26" height="10" rx="5" fill="#CCCAC5" /></svg> },
                { key: "discs", name: "discs", note: "Rotating pair, for feet or hands", price: 880, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><circle cx="52" cy="50" r="30" fill="#E4E0DB" /><circle cx="52" cy="50" r="22" fill="#EDEAE5" /><circle cx="52" cy="50" r="5" fill="#D0CCC7" /><circle cx="108" cy="50" r="30" fill="#E4E0DB" /><circle cx="108" cy="50" r="22" fill="#EDEAE5" /><circle cx="108" cy="50" r="5" fill="#D0CCC7" /></svg> },
                { key: "box", name: "box", note: "Short reformer box, prone and kneeling work", price: 2100, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="30" y="44" width="100" height="38" rx="3" fill="#E4E0DB" /><polygon points="30,44 80,22 130,44 80,44" fill="#EAE4DA" /><polygon points="130,44 130,82 80,82 80,44 130,44" fill="#D8D4CF" /><path d="M68 22 Q80 14 92 22" stroke="#C8C4BE" strokeWidth="2" fill="none" strokeLinecap="round" /></svg> },
              ]
            },
            {
              tier: "Good to Have", note: "For the serious practitioner.",
              items: [
                { key: "toe_corrector", name: "toe corrector", note: "Spring-loaded toe articulation", price: 750, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><path d="M50 70 C60 70 60 50 70 50 C80 50 80 70 90 70 C100 70 100 50 110 50" stroke="#C8C4BE" strokeWidth="4" fill="none" strokeLinecap="round" /><rect x="40" y="70" width="80" height="10" rx="5" fill="#D8D4CF" /><ellipse cx="110" cy="50" rx="14" ry="10" fill="none" stroke="#D0CCC7" strokeWidth="3" /><rect x="42" y="79" width="76" height="5" rx="2.5" fill="#CAC6C2" /></svg> },
                { key: "foot_corrector", name: "foot corrector", note: "Arch and intrinsic foot muscle work", price: 850, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><ellipse cx="80" cy="72" rx="48" ry="12" fill="#D8D4CF" /><path d="M44 72 C44 40 116 40 116 72" fill="none" stroke="#C8C4BE" strokeWidth="4" /><rect x="54" y="30" width="52" height="10" rx="5" fill="#D0CCC7" /><rect x="78" y="40" width="4" height="32" rx="2" fill="#C4C0BB" /></svg> },
                { key: "dowel", name: "dowel", note: "Alignment dowel, posture and shoulder work", price: 580, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="14" y="46" width="132" height="8" rx="4" fill="#D8D4CF" transform="rotate(-2 80 50)" /><circle cx="16" cy="49" r="6" fill="#C8C4BE" /><circle cx="144" cy="51" r="6" fill="#C8C4BE" /></svg> },
                { key: "carry_tote", name: "carry tote", note: "Pilates equipment bag, Sand colorway", price: 1600, svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="30" y="38" width="100" height="50" rx="3" fill="#E4E0DB" /><rect x="30" y="38" width="100" height="8" rx="3" fill="#D8D4CF" /><path d="M50 38 Q50 16 80 16 Q110 16 110 38" fill="none" stroke="#C8C4BE" strokeWidth="4" strokeLinecap="round" /><line x1="30" y1="60" x2="130" y2="60" stroke="#C4C0BB" strokeWidth="0.8" opacity={0.35} /></svg> },
              ]
            }
          ].map(({ tier, note, items }) => (
            <div key={tier} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: obs }}>{tier}</span>
                <span style={{ fontSize: 11, color: ash }}>{note}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: iron }}>
                {items.map(item => {
                  const sel = accessories.has(item.key);
                  return (
                    <div key={item.key} onClick={() => toggleAcc(item.key)} style={{ background: sel ? "rgba(12,12,12,0.06)" : "var(--paper)", cursor: "pointer", position: "relative", transition: "background 150ms", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 12, right: 12, width: 18, height: 18, borderRadius: "50%", background: sel ? obs : "rgba(248,248,248,0.88)", border: `0.5px solid ${sel ? obs : "rgba(12,12,12,0.18)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: sel ? "var(--paper)" : "transparent", transition: "all 150ms", zIndex: 1 }}>
                        {sel && "✓"}
                      </div>
                      <div style={{ width: "100%", height: 140, background: "#F0EDE9", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "0.5px solid rgba(12,12,12,0.07)", overflow: "hidden" }}>
                        {item.svg}
                      </div>
                      <div style={{ padding: "16px 18px 22px" }}>
                        <div style={{ fontSize: 13, color: obs, marginBottom: 4, lineHeight: 1.4, textTransform: "lowercase" }}>{item.name}</div>
                        <div style={{ fontSize: 10, color: ash, marginBottom: 8 }}>{item.note}</div>
                        <div style={{ fontSize: 12, color: obs }}>+EGP {item.price.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STEP 4: ORDER & TRAINING ── */}
      <section ref={orderRef}>
        <div style={{ padding: "56px var(--g) 40px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />step 04
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>delivery &amp; training</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
          <div style={{ padding: "56px var(--g)", borderRight: sec(iron) }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 20, height: "0.5px", background: ash, display: "inline-block" }} />Order Type
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { val: "gift", name: "Gift", desc: "A reformer is a significant gift. We'll make the presentation match." },
                { val: "self", name: "Self Order", desc: "For your own practice. We deliver, install, and calibrate." },
              ].map(o => (
                <div key={o.val}>
                  <div onClick={() => setOrderType(o.val as "gift" | "self")} style={{ background: orderType === o.val ? "rgba(12,12,12,0.07)" : "rgba(12,12,12,0.04)", padding: 22, cursor: "pointer", position: "relative", transition: "background 150ms", outline: orderType === o.val ? "0.5px solid rgba(12,12,12,0.35)" : "none" }}>
                    <div style={{ position: "absolute", top: 22, right: 22, width: 16, height: 16, borderRadius: "50%", border: "0.5px solid rgba(12,12,12,0.3)" }}>
                      {orderType === o.val && <div style={{ position: "absolute", top: 3, right: 3, bottom: 3, left: 3, borderRadius: "50%", background: obs }} />}
                    </div>
                    <div style={{ paddingRight: 28 }}>
                      <div style={{ fontSize: 15, fontWeight: 300, color: obs, marginBottom: 4 }}>{o.name}</div>
                      <div style={{ fontSize: 11, color: ash, lineHeight: 1.7 }}>{o.desc}</div>
                    </div>
                  </div>
                  {o.val === "gift" && orderType === "gift" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 1, background: "rgba(12,12,12,0.04)", padding: "20px 22px", border: "0.5px solid rgba(12,12,12,0.1)" }}>
                      <div>
                        <div style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, marginBottom: 6 }}>Message to be printed</div>
                        <textarea value={giftMessage} onChange={e => setGiftMessage(e.target.value)} placeholder="Write your message…"
                          style={{ width: "100%", height: 72, background: "transparent", border: "0.5px solid rgba(12,12,12,0.2)", padding: "10px 12px", color: obs, fontFamily: "inherit", fontSize: 12, resize: "none", outline: "none" }}
                        />
                      </div>
                      <div onClick={() => setGiftWrap(g => !g)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                        <div style={{ width: 16, height: 16, border: "0.5px solid rgba(12,12,12,0.3)", background: giftWrap ? obs : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: giftWrap ? "var(--paper)" : "transparent", flexShrink: 0, transition: "all 150ms" }}>
                          {giftWrap && "✓"}
                        </div>
                        <span style={{ fontSize: 12, color: obs }}>Add premium gift wrapping (+EGP 500)</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "56px var(--g)" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 20, height: "0.5px", background: ash, display: "inline-block" }} />Training Access
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { val: "free", name: "Free — Lyne App", desc: "Guided movement library and structured programs, included with every reformer. 200+ movements designed for The Air and The Pro." },
                { val: "subscription", name: "Subscription — Live Coaching", desc: "Free trial — 1 week, 3 live one-on-one sessions with a certified Pilates trainer via the app." },
              ].map(t => (
                <div key={t.val} onClick={() => { setTraining(t.val as "free" | "subscription"); setDoneSteps(prev => new Set([...prev, 4])); }} style={{ background: training === t.val ? "rgba(12,12,12,0.07)" : "rgba(12,12,12,0.04)", padding: 22, cursor: "pointer", position: "relative", transition: "background 150ms", outline: training === t.val ? "0.5px solid rgba(12,12,12,0.35)" : "none" }}>
                  <div style={{ position: "absolute", top: 22, right: 22, width: 16, height: 16, borderRadius: "50%", border: "0.5px solid rgba(12,12,12,0.3)" }}>
                    {training === t.val && <div style={{ position: "absolute", top: 3, right: 3, bottom: 3, left: 3, borderRadius: "50%", background: obs }} />}
                  </div>
                  <div style={{ paddingRight: 28 }}>
                    <div style={{ fontSize: 15, fontWeight: 300, color: obs, marginBottom: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: ash, lineHeight: 1.7 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUMMARY ── */}
      <section ref={summaryRef}>
        <div style={{ padding: "56px var(--g) 40px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }} />your order
          </div>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>review &amp; confirm</h2>
        </div>
        <div style={{ padding: "56px var(--g) 100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 80 }}>
            <div>
              <div style={{ borderTop: sec(iron) }}>
                {summaryRows.length === 0 && <div style={{ padding: "24px 0", fontSize: 13, color: ash }}>Select a reformer above to build your order.</div>}
                {summaryRows.map(r => (
                  <div key={r.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "13px 0", borderBottom: "0.5px solid rgba(12,12,12,0.08)" }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", color: ash }}>{r.k}</span>
                    <span style={{ fontSize: 12, color: obs, textAlign: "right", maxWidth: 220, lineHeight: 1.5 }}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "24px 0 8px" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: obs }}>Total</span>
                <span style={{ fontSize: 30, fontWeight: 300, color: obs }}>{total ? fmt(total) : "EGP —"}</span>
              </div>
              <p style={{ fontSize: 10, color: ash }}>Prices are indicative. Final price confirmed upon order. Delivery &amp; installation included within Cairo.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignSelf: "start", position: "sticky", top: "calc(var(--nav-h) + 44px + 32px)" }}>
              <button onClick={() => { if (!model) scrollTo(modelRef); else alert("Thank you! A Lyne advisor will contact you within 24 hours to confirm your order."); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, width: "100%", background: obs, color: "var(--paper)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", border: "none", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Confirm Selection →
              </button>
              <button onClick={() => window.print()} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, width: "100%", background: "transparent", color: obs, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", border: "0.5px solid rgba(12,12,12,0.3)", cursor: "pointer" }}>
                Save Summary
              </button>
              <p style={{ fontSize: 10, color: ash, lineHeight: 1.7, marginTop: 8 }}>By placing an order you agree to our terms. All orders reviewed within 24 hours. A Lyne advisor will contact you to confirm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, height: 64, background: "rgba(250,250,248,0.96)", borderTop: sec(iron), backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 var(--g)", transform: stickyVisible ? "translateY(0)" : "translateY(100%)", transition: "transform 380ms cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 12, color: obs }}>{model === "air" ? "The Air — Flex Air Sensol" : model === "pro" ? "The Pro — Flex Pro Sensol" : ""}</span>
          <span style={{ fontSize: 10, color: ash, maxWidth: 560, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{stickyParts.join(" · ")}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontSize: 18, fontWeight: 300, color: obs }}>{total ? fmt(total) : "EGP —"}</span>
          <button onClick={() => scrollTo(summaryRef)} style={{ height: 38, padding: "0 22px", background: obs, color: "var(--paper)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}
