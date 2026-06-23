"use client";
import { useState, useEffect, useRef } from "react";

const PRICES = {
  epto1: 48000, epto4: 38000,
  handle2: 1500, bungee: 2500, bar: 3500, band: 2000,
  db_wood_s1: 6000, db_wood_s2: 9500, db_steel_s1: 9000, db_steel_s2: 14000,
  wire_2: 2000, wire_3: 3500, wire_4: 5500, wire_5: 8000,
  foam_roller: 850, mat_female: 1200, mat_male: 1400, loop_bands: 650,
  gloves: 1200, towel: 950, tree: 7500, kettlebell: 4200, giftWrap: 500,
} as const;

const PAD_COLORS = { "dark-green": "#2C3E2D", orange: "#B8541E", white: "#D4CFC8" };
const COLOR_NAMES = { "dark-green": "Forest", orange: "Ember", white: "Chalk" };
const DB_COLORS = { wood: { light: "#8B6239", dark: "#6B4A28" }, steel: { light: "#5A5A5A", dark: "#3E3E3E" } };
const ACC_NAMES: Record<string, string> = {
  foam_roller: "Foam Roller", mat_female: "Gym Mat — Female", mat_male: "Gym Mat — Male",
  loop_bands: "Resistance Loop Bands", gloves: "Workout Gloves", towel: "Premium Gym Towel",
  tree: "Weight Storage Tree", kettlebell: "Kettlebells",
};

function fmt(n: number) { return "EGP " + n.toLocaleString(); }

type Model = "epto1" | "epto4";
type Color = "dark-green" | "orange" | "white";

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
      <div style={{
        position: "absolute", top: 4, left: on ? 24 : 4,
        width: 14, height: 14, background: on ? obs : ash,
        transition: "all 220ms",
      }} />
    </div>
  );
}

export default function BenchPage() {
  const [model, setModel] = useState<Model | null>(null);
  const [color, setColor] = useState<Color>("dark-green");
  const [handle, setHandle] = useState<"1" | "2">("2");
  const [bungee, setBungee] = useState(false);
  const [adjustableBar, setAdjustableBar] = useState(false);
  const [extensionBand, setExtensionBand] = useState(false);
  const [dumbbell, setDumbbell] = useState<{ mat: "wood" | "steel"; set: "s1" | "s2" } | null>(null);
  const [wireResistance, setWireResistance] = useState<"default" | "2" | "3" | "4" | "5">("3");
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
  const dbLight = dumbbell ? DB_COLORS[dumbbell.mat].light : "#2A2A2A";
  const dbDark = dumbbell ? DB_COLORS[dumbbell.mat].dark : "#242424";
  const db4Light = dumbbell ? DB_COLORS[dumbbell.mat].light : "#2E2E2E";
  const db4Dark = dumbbell ? DB_COLORS[dumbbell.mat].dark : "#282828";

  const obs = "var(--obsidian)";
  const ash = "var(--ash)";
  const iron = "rgba(12,12,12,0.08)";
  const sec = (c: string) => `0.5px solid ${c}`;

  useEffect(() => {
    if (model) setStickyVisible(true);
  }, [model]);

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
    if (model === "epto1") {
      if (handle === "2") total += PRICES.handle2;
      if (bungee) total += PRICES.bungee;
      const wMap: Record<string, number> = { "2": PRICES.wire_2, "3": PRICES.wire_3, "4": PRICES.wire_4, "5": PRICES.wire_5 };
      if (wMap[wireResistance]) total += wMap[wireResistance];
    }
    if (adjustableBar) total += PRICES.bar;
    if (extensionBand) total += PRICES.band;
    if (dumbbell) {
      const key = `db_${dumbbell.mat}_${dumbbell.set}` as keyof typeof PRICES;
      total += (PRICES[key] as number) || 0;
    }
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
  if (adjustableBar) stickyParts.push("Adj. Bar");
  if (bungee) stickyParts.push("Bungee");
  if (extensionBand) stickyParts.push("Ext. Band");
  if (dumbbell) stickyParts.push(dumbbell.mat === "wood" ? "Wood DB" : "Steel DB");

  const summaryRows: { k: string; v: string }[] = [];
  if (model) {
    summaryRows.push({ k: "Model", v: model === "epto1" ? "EPTO1 — Master Series with Cable" : "EPTO4 — Master Series Open Bench" });
    summaryRows.push({ k: "Finish", v: COLOR_NAMES[color] });
    if (model === "epto1") {
      summaryRows.push({ k: "Handle", v: "Handle " + handle });
      if (bungee) summaryRows.push({ k: "Bungee", v: "Resistance Bungee" });
      summaryRows.push({ k: "Resistance Level", v: wireResistance === "default" ? "Default" : "Level " + wireResistance });
    }
    if (adjustableBar) summaryRows.push({ k: "Adjustable Bar", v: "Included" });
    if (extensionBand) summaryRows.push({ k: "Extension Band", v: "Included" });
    if (dumbbell) {
      const setLabel = dumbbell.set === "s1" ? "2 · 4 · 8 · 12 kg" : "4 · 8 · 12 · 16 kg";
      summaryRows.push({ k: "Dumbbells", v: (dumbbell.mat === "wood" ? "Wood" : "Stainless Steel") + " — " + setLabel });
    }
    const selectedAcc = [...accessories].map(k => ACC_NAMES[k]).filter(Boolean);
    if (selectedAcc.length) summaryRows.push({ k: "Accessories", v: selectedAcc.join(", ") });
    if (orderType) summaryRows.push({ k: "Order Type", v: orderType === "gift" ? "Gift" : "Self Order" });
    if (orderType === "gift" && giftWrap) summaryRows.push({ k: "Gift Wrapping", v: "Premium Wrapping" });
    if (training) summaryRows.push({ k: "Training", v: training === "free" ? "Free Training Access" : "Subscription — Free Trial (1 week, 3 sessions)" });
  }

  return (
    <div style={{ paddingTop: "calc(var(--nav-h) + 44px)", background: "var(--paper)", color: obs }}>

      {/* ── STEP BAR ── */}
      <div style={{
        position: "sticky", top: "var(--nav-h)", height: 44,
        background: "var(--paper)", borderBottom: sec(iron),
        display: "flex", alignItems: "stretch", zIndex: 200,
      }}>
        {[
          { label: "Choose", step: 1, ref: modelRef },
          { label: "Configure", step: 2, ref: configRef },
          { label: "Accessories", step: 3, ref: accRef },
          { label: "Complete", step: 4, ref: orderRef },
        ].map(({ label, step, ref }, i) => {
          const isDone = doneSteps.has(step);
          const isActive = !isDone && activeStep === step;
          return (
            <div key={step} onClick={() => scrollTo(ref)} style={{
              flex: 1, display: "flex", alignItems: "center", gap: 10,
              padding: "0 24px", borderRight: i < 3 ? sec(iron) : "none",
              cursor: "pointer",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, flexShrink: 0,
                border: isDone ? "none" : `0.5px solid ${isActive ? obs : ash}`,
                background: isDone ? obs : "transparent",
                color: isDone ? "var(--paper)" : (isActive ? obs : ash),
                transition: "all 200ms",
              }}>
                {isDone ? "✓" : step}
              </div>
              <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: isActive ? obs : ash, transition: "color 200ms" }}>
                {label}
              </span>
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
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>the bench</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
          {[
            { id: "epto1" as Model, tag: "EPTO1 — Master Series", name: "cable bench", desc: "Six resistance stages. Nine cable-arm angles. Five incline positions. A complete training system in 1.1m².", specs: [["Dimensions", "1130 × 320 × 440mm"], ["Weight", "38kg"], ["Resistance", "6-stage wire, 9-angle arm"], ["Incline", "5 positions"]], price: 48000 },
            { id: "epto4" as Model, tag: "EPTO4 — Master Series", name: "open frame bench", desc: "An architectural piece as much as a training tool. Open frame, full dumbbell display. Made to be left out.", specs: [["Dimensions", "1130 × 320 × 430mm"], ["Weight", "32kg"], ["Frame", "Open rack, wood + steel"], ["Incline", "Flat"]], price: 38000 },
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
              <div style={{ width: "100%", aspectRatio: "16/9", background: "#EDE8DF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, overflow: "hidden" }}>
                {m.id === "epto1" ? (
                  <svg viewBox="0 0 480 260" fill="none" style={{ width: "85%", maxWidth: 420 }}>
                    <rect x="56" y="118" width="330" height="88" rx="6" fill="#1A1A1A" />
                    <rect x="54" y="105" width="334" height="22" rx="5" fill={padColor} />
                    <rect x="324" y="52" width="66" height="66" rx="5" fill={padColor} />
                    <line x1="324" y1="52" x2="390" y2="52" stroke="#111" strokeWidth="1.5" />
                    <rect x="382" y="8" width="7" height="106" rx="3" fill="#363636" />
                    <rect x="336" y="8" width="53" height="6" rx="3" fill="#363636" />
                    <circle cx="338" cy="11" r="9" fill="none" stroke="#363636" strokeWidth="2" />
                    <circle cx="338" cy="11" r="4" fill="#282828" />
                    <line x1="338" y1="20" x2="290" y2="75" stroke="#444" strokeWidth="1" strokeDasharray="4 3" />
                    <rect x="50" y="112" width="10" height="98" rx="3" fill="#7A5230" />
                    <rect x="382" y="112" width="10" height="98" rx="3" fill="#7A5230" />
                    <ellipse cx="136" cy="162" rx="19" ry="7" fill="#2A2A2A" />
                    <ellipse cx="178" cy="162" rx="19" ry="7" fill="#242424" />
                    <ellipse cx="220" cy="162" rx="19" ry="7" fill="#2A2A2A" />
                    <ellipse cx="262" cy="162" rx="19" ry="7" fill="#242424" />
                    <ellipse cx="304" cy="162" rx="16" ry="7" fill="#2A2A2A" />
                    <ellipse cx="136" cy="185" rx="19" ry="7" fill="#242424" />
                    <ellipse cx="178" cy="185" rx="19" ry="7" fill="#2A2A2A" />
                    <ellipse cx="220" cy="185" rx="19" ry="7" fill="#242424" />
                    <ellipse cx="262" cy="185" rx="19" ry="7" fill="#2A2A2A" />
                    <ellipse cx="304" cy="185" rx="16" ry="7" fill="#242424" />
                    <rect x="72" y="206" width="7" height="46" rx="2" fill="#161616" />
                    <rect x="362" y="206" width="7" height="46" rx="2" fill="#161616" />
                    <rect x="58" y="250" width="35" height="5" rx="2" fill="#2E2E2E" />
                    <rect x="348" y="250" width="35" height="5" rx="2" fill="#2E2E2E" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 480 260" fill="none" style={{ width: "85%", maxWidth: 420 }}>
                    <rect x="54" y="105" width="372" height="22" rx="5" fill={padColor} />
                    <rect x="50" y="127" width="12" height="110" rx="3" fill="#7A5230" />
                    <rect x="418" y="127" width="12" height="110" rx="3" fill="#7A5230" />
                    <rect x="62" y="145" width="356" height="5" rx="2" fill="#222" />
                    <rect x="62" y="178" width="356" height="5" rx="2" fill="#222" />
                    <rect x="62" y="211" width="356" height="5" rx="2" fill="#222" />
                    <rect x="78" y="150" width="48" height="26" rx="13" fill="#2E2E2E" />
                    <rect x="136" y="150" width="48" height="26" rx="13" fill="#282828" />
                    <rect x="194" y="150" width="48" height="26" rx="13" fill="#2E2E2E" />
                    <rect x="252" y="150" width="48" height="26" rx="13" fill="#282828" />
                    <rect x="310" y="150" width="48" height="26" rx="13" fill="#2E2E2E" />
                    <rect x="368" y="150" width="42" height="26" rx="13" fill="#282828" />
                    <rect x="78" y="183" width="48" height="26" rx="13" fill="#282828" />
                    <rect x="136" y="183" width="48" height="26" rx="13" fill="#2E2E2E" />
                    <rect x="194" y="183" width="48" height="26" rx="13" fill="#282828" />
                    <rect x="252" y="183" width="48" height="26" rx="13" fill="#2E2E2E" />
                    <rect x="310" y="183" width="48" height="26" rx="13" fill="#282828" />
                    <rect x="368" y="183" width="42" height="26" rx="13" fill="#2E2E2E" />
                    <rect x="50" y="232" width="380" height="7" rx="3" fill="#7A5230" />
                    <rect x="62" y="238" width="8" height="16" rx="2" fill="#1A1A1A" />
                    <rect x="410" y="238" width="8" height="16" rx="2" fill="#1A1A1A" />
                  </svg>
                )}
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
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10, height: 44, padding: "0 28px",
                background: model === m.id ? obs : "transparent",
                color: model === m.id ? "var(--paper)" : ash,
                fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase",
                border: `0.5px solid ${model === m.id ? obs : "rgba(12,12,12,0.25)"}`,
                cursor: "pointer", transition: "all 200ms",
              }}>
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
          <div style={{
            position: "sticky", top: "calc(var(--nav-h) + 44px)",
            height: "calc(100vh - var(--nav-h) - 44px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            borderRight: sec(iron), padding: 56, gap: 24, overflow: "hidden",
            alignSelf: "start",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: padColor, transition: "background 300ms", flexShrink: 0 }} />
              <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>
                {model ? (model === "epto1" ? "EPTO1 — Master Series" : "EPTO4 — Master Series") : "select a model above"}
              </span>
            </div>

            {(!model || model === "epto1") && (
              <svg viewBox="0 0 480 260" fill="none" style={{ width: "100%", maxWidth: 440, transition: "all 400ms", opacity: model === "epto1" ? 1 : 0.3 }}>
                <rect x="56" y="118" width="330" height="88" rx="6" fill="#1A1A1A" />
                <rect x="54" y="105" width="334" height="22" rx="5" fill={padColor} />
                <rect x="324" y="52" width="66" height="66" rx="5" fill={padColor} />
                <line x1="324" y1="52" x2="390" y2="52" stroke="#111" strokeWidth="1.5" />
                <rect x="382" y="8" width="7" height="106" rx="3" fill="#363636" />
                <rect x="336" y="8" width="53" height="6" rx="3" fill="#363636" />
                <circle cx="338" cy="11" r="9" fill="none" stroke="#363636" strokeWidth="2" />
                <circle cx="338" cy="11" r="4" fill="#282828" />
                <line x1="338" y1="20" x2="290" y2="75" stroke="#444" strokeWidth="1" strokeDasharray="4 3" />
                <rect x="50" y="112" width="10" height="98" rx="3" fill="#7A5230" />
                <rect x="382" y="112" width="10" height="98" rx="3" fill="#7A5230" />
                {[136, 178, 220, 262].map((cx, i) => <ellipse key={i} cx={cx} cy={162} rx={19} ry={7} fill={i % 2 === 0 ? dbLight : dbDark} />)}
                <ellipse cx={304} cy={162} rx={16} ry={7} fill={dbLight} />
                {[136, 178, 220, 262].map((cx, i) => <ellipse key={i + 5} cx={cx} cy={185} rx={19} ry={7} fill={i % 2 === 0 ? dbDark : dbLight} />)}
                <ellipse cx={304} cy={185} rx={16} ry={7} fill={dbDark} />
                <rect x="72" y="206" width="7" height="46" rx="2" fill="#161616" />
                <rect x="362" y="206" width="7" height="46" rx="2" fill="#161616" />
                <rect x="58" y="250" width="35" height="5" rx="2" fill="#2E2E2E" />
                <rect x="348" y="250" width="35" height="5" rx="2" fill="#2E2E2E" />
              </svg>
            )}

            {model === "epto4" && (
              <svg viewBox="0 0 480 260" fill="none" style={{ width: "100%", maxWidth: 440, transition: "all 400ms" }}>
                <rect x="54" y="105" width="372" height="22" rx="5" fill={padColor} />
                <rect x="50" y="127" width="12" height="110" rx="3" fill="#7A5230" />
                <rect x="418" y="127" width="12" height="110" rx="3" fill="#7A5230" />
                <rect x="62" y="145" width="356" height="5" rx="2" fill="#222" />
                <rect x="62" y="178" width="356" height="5" rx="2" fill="#222" />
                <rect x="62" y="211" width="356" height="5" rx="2" fill="#222" />
                {[78, 136, 194, 252, 310].map((x, i) => <rect key={i} x={x} y={150} width={48} height={26} rx={13} fill={i % 2 === 0 ? db4Light : db4Dark} />)}
                <rect x={368} y={150} width={42} height={26} rx={13} fill={db4Dark} />
                {[78, 136, 194, 252, 310].map((x, i) => <rect key={i + 6} x={x} y={183} width={48} height={26} rx={13} fill={i % 2 === 0 ? db4Dark : db4Light} />)}
                <rect x={368} y={183} width={42} height={26} rx={13} fill={db4Light} />
                <rect x="50" y="232" width="380" height="7" rx="3" fill="#7A5230" />
                <rect x="62" y="238" width="8" height="16" rx="2" fill="#1A1A1A" />
                <rect x="410" y="238" width="8" height="16" rx="2" fill="#1A1A1A" />
              </svg>
            )}
          </div>

          {/* Options panel */}
          <div style={{ padding: "48px 40px 140px" }}>

            {/* FINISH */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Finish</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {(["dark-green", "orange", "white"] as Color[]).map(c => (
                  <div key={c} onClick={() => setColor(c)} title={COLOR_NAMES[c]} style={{
                    width: 28, height: 28, borderRadius: "50%", background: PAD_COLORS[c], cursor: "pointer",
                    boxShadow: color === c ? `0 0 0 2.5px var(--paper), 0 0 0 4px ${obs}` : "none",
                    transition: "transform 120ms, box-shadow 120ms", flexShrink: 0,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.12)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                ))}
                <span style={{ fontSize: 11, color: ash, marginLeft: 6 }}>{COLOR_NAMES[color]}</span>
              </div>
            </div>

            {/* HANDLE (EPTO1 only) */}
            {(!model || model === "epto1") && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Handle</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[{ val: "1", label: "Handle 1", note: "Standard grip" }, { val: "2", label: "Handle 2", note: "Recommended" }].map(h => (
                    <div key={h.val} onClick={() => setHandle(h.val as "1" | "2")} style={{
                      height: 32, padding: "0 14px", cursor: "pointer",
                      border: `0.5px solid ${handle === h.val ? obs : "rgba(12,12,12,0.2)"}`,
                      background: handle === h.val ? obs : "transparent",
                      color: handle === h.val ? "var(--paper)" : ash,
                      fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase",
                      display: "inline-flex", alignItems: "center", gap: 6, transition: "all 150ms",
                    }}>
                      {h.label}
                      <span style={{ fontSize: 8, background: handle === h.val ? "rgba(255,255,255,0.15)" : "#2C3E2D", padding: "2px 6px", color: handle === h.val ? "rgba(255,255,255,0.75)" : "#EAE4DA" }}>{h.note}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: ash, marginTop: 10, lineHeight: 1.7 }}>Handle 2 extends further and angles for press and row work — the fuller range of motion.</p>
              </div>
            )}

            {/* BUNGEE (EPTO1 only) */}
            {(!model || model === "epto1") && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Bungee</div>
                <div style={{ borderTop: "0.5px solid rgba(12,12,12,0.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "0.5px solid rgba(12,12,12,0.07)" }}>
                    <div style={{ width: 44, height: 44, background: "rgba(12,12,12,0.03)", border: "0.5px solid rgba(12,12,12,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
                        <ellipse cx="14" cy="10" rx="9" ry="6" fill="none" stroke="#6B6B6B" strokeWidth="1.5" />
                        <ellipse cx="14" cy="20" rx="9" ry="6" fill="none" stroke="#6B6B6B" strokeWidth="1.5" />
                        <line x1="5" y1="10" x2="5" y2="20" stroke="#6B6B6B" strokeWidth="1.5" />
                        <line x1="23" y1="10" x2="23" y2="20" stroke="#6B6B6B" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: obs, marginBottom: 2 }}>Resistance Bungee</div>
                      <div style={{ fontSize: 10, color: ash }}>Increases resistance as you push — builds power through full range</div>
                    </div>
                    <span style={{ fontSize: 11, color: obs, flexShrink: 0 }}>+EGP 2,500</span>
                    <span style={{ fontSize: 8, letterSpacing: "0.04em", textTransform: "uppercase", background: "#2C3E2D", color: "#EAE4DA", padding: "3px 8px", flexShrink: 0 }}>Recommended</span>
                    <Toggle on={bungee} onClick={() => setBungee(b => !b)} />
                  </div>
                </div>
              </div>
            )}

            {/* ADJUSTABLE BAR */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Adjustable Bar</div>
              <div style={{ borderTop: "0.5px solid rgba(12,12,12,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "0.5px solid rgba(12,12,12,0.07)" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(12,12,12,0.03)", border: "0.5px solid rgba(12,12,12,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
                      <rect x="5" y="12" width="18" height="4" rx="2" fill="#5A5A5A" />
                      <rect x="3" y="8" width="5" height="12" rx="2.5" fill="#6B6B6B" />
                      <rect x="20" y="8" width="5" height="12" rx="2.5" fill="#6B6B6B" />
                      <line x1="11" y1="13" x2="11" y2="15" stroke="#333" strokeWidth="1" />
                      <line x1="14" y1="13" x2="14" y2="15" stroke="#333" strokeWidth="1" />
                      <line x1="17" y1="13" x2="17" y2="15" stroke="#333" strokeWidth="1" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: obs, marginBottom: 2 }}>Adjustable Training Bar</div>
                    <div style={{ fontSize: 10, color: ash }}>Multi-grip bar for pull and press work</div>
                  </div>
                  <span style={{ fontSize: 11, color: obs, flexShrink: 0 }}>+EGP 3,500</span>
                  <span style={{ fontSize: 8, letterSpacing: "0.04em", textTransform: "uppercase", background: "#2C3E2D", color: "#EAE4DA", padding: "3px 8px", flexShrink: 0 }}>Recommended</span>
                  <Toggle on={adjustableBar} onClick={() => setAdjustableBar(b => !b)} />
                </div>
              </div>
            </div>

            {/* EXTENSION BAND */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Extension Band</div>
              <div style={{ borderTop: "0.5px solid rgba(12,12,12,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "0.5px solid rgba(12,12,12,0.07)" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(12,12,12,0.03)", border: "0.5px solid rgba(12,12,12,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
                      <ellipse cx="14" cy="14" rx="11" ry="7" fill="none" stroke="#6B6B6B" strokeWidth="2" />
                      <ellipse cx="14" cy="14" rx="6" ry="3.5" fill="none" stroke="#4A4A4A" strokeWidth="1" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: obs, marginBottom: 2 }}>Extension Resistance Band</div>
                    <div style={{ fontSize: 10, color: ash }}>Adds resistance beyond the cable&apos;s reach — stretching and warm-up work</div>
                  </div>
                  <span style={{ fontSize: 11, color: obs, flexShrink: 0 }}>+EGP 2,000</span>
                  <Toggle on={extensionBand} onClick={() => setExtensionBand(b => !b)} />
                </div>
              </div>
            </div>

            {/* DUMBBELLS */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Weights — Dumbbells</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {([
                  { mat: "wood" as const, label: "Wood", sets: [{ val: "s1", label: "2 · 4 · 8 · 12 kg", sub: "4 pairs — standard range · +EGP 6,000" }, { val: "s2", label: "4 · 8 · 12 · 16 kg", sub: "4 pairs — extended range · +EGP 9,500" }] },
                  { mat: "steel" as const, label: "Stainless Steel", sets: [{ val: "s1", label: "2 · 4 · 8 · 12 kg", sub: "4 pairs — standard range · +EGP 9,000" }, { val: "s2", label: "4 · 8 · 12 · 16 kg", sub: "4 pairs — extended range · +EGP 14,000" }] },
                ]).map(({ mat, label, sets }) => (
                  <div key={mat} style={{ border: "0.5px solid rgba(12,12,12,0.12)", overflow: "hidden" }}>
                    <div style={{ padding: "10px 14px", background: "rgba(12,12,12,0.04)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, borderBottom: "0.5px solid rgba(12,12,12,0.08)" }}>{label}</div>
                    {sets.map(s => {
                      const sel = dumbbell?.mat === mat && dumbbell?.set === s.val;
                      return (
                        <div key={s.val} onClick={() => setDumbbell(sel ? null : { mat, set: s.val as "s1" | "s2" })} style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                          cursor: "pointer", borderBottom: "0.5px solid rgba(12,12,12,0.07)",
                          background: sel ? "rgba(12,12,12,0.07)" : "transparent", transition: "background 120ms",
                        }}>
                          <div style={{ width: 14, height: 14, borderRadius: "50%", border: "0.5px solid rgba(12,12,12,0.3)", flexShrink: 0, position: "relative" }}>
                            {sel && <div style={{ position: "absolute", top: 3, right: 3, bottom: 3, left: 3, borderRadius: "50%", background: obs }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: obs }}>{s.label}</div>
                            <div style={{ fontSize: 10, color: ash }}>{s.sub}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* RESISTANCE LEVEL (EPTO1 only) */}
            {(!model || model === "epto1") && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 14 }}>Resistance Level</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
                  {[
                    { val: "default", label: "Base", sub: "Included" },
                    { val: "2", label: "L2", sub: "Light", price: "+2,000" },
                    { val: "3", label: "L3", sub: "Athletic", price: "+3,500", rec: true },
                    { val: "4", label: "L4", sub: "Performance", price: "+5,500" },
                    { val: "5", label: "L5", sub: "Elite", price: "+8,000" },
                  ].map(opt => {
                    const isActive = wireResistance === opt.val;
                    return (
                      <div key={opt.val} onClick={() => setWireResistance(opt.val as typeof wireResistance)} style={{
                        aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                        border: `0.5px solid ${isActive ? obs : "rgba(12,12,12,0.18)"}`,
                        background: isActive ? obs : "transparent",
                        cursor: "pointer", position: "relative", transition: "all 150ms",
                      }}>
                        {"rec" in opt && opt.rec && <span style={{ position: "absolute", top: -9, fontSize: 8, background: "#2C3E2D", color: "#EAE4DA", padding: "1px 6px" }}>Best</span>}
                        <span style={{ fontSize: opt.val === "default" ? 11 : 18, fontWeight: 300, color: isActive ? "var(--paper)" : obs }}>{opt.label}</span>
                        <span style={{ fontSize: 8, letterSpacing: "0.05em", textTransform: "uppercase", color: isActive ? "rgba(255,255,255,0.6)" : ash }}>{opt.sub}</span>
                        {"price" in opt && opt.price && <span style={{ fontSize: 8, color: isActive ? "rgba(255,255,255,0.6)" : ash }}>{opt.price}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ fontSize: 11, color: ash, lineHeight: 1.8, borderTop: "0.5px solid rgba(12,12,12,0.1)", paddingTop: 20 }}>
              Free delivery &amp; installation within Cairo.<br />2–5 business days.
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
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, color: obs }}>the setup</h2>
        </div>

        <div style={{ padding: "56px var(--g) 72px", borderBottom: sec(iron) }}>
          {[
            {
              tier: "Essential", note: "Add to complete your setup",
              items: [
                {
                  key: "foam_roller", name: "Foam Roller", note: "High-density. Targets deep muscle tissue.", price: 850,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="26" y="32" width="108" height="36" fill="#2A2A2A" /><ellipse cx="26" cy="50" rx="16" ry="18" fill="#383838" /><ellipse cx="134" cy="50" rx="16" ry="18" fill="#1E1E1E" /><line x1="54" y1="32" x2="54" y2="68" stroke="#1A1A1A" strokeWidth="2" /><line x1="80" y1="32" x2="80" y2="68" stroke="#1A1A1A" strokeWidth="2" /><line x1="106" y1="32" x2="106" y2="68" stroke="#1A1A1A" strokeWidth="2" /></svg>
                },
                {
                  key: "mat_female", name: "Gym Mat — Female", note: "6mm high-density foam. Grip base, matte finish.", price: 1200,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="30" y="34" width="100" height="32" fill="#1A2A1C" /><ellipse cx="30" cy="50" rx="14" ry="16" fill="#243226" /><ellipse cx="130" cy="50" rx="14" ry="16" fill="#121C14" /><line x1="30" y1="37" x2="130" y2="37" stroke="#2C3E2D" strokeWidth="2" opacity={0.6} /></svg>
                },
                {
                  key: "mat_male", name: "Gym Mat — Male", note: "8mm extended surface. Built for larger movement patterns.", price: 1400,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="24" y="28" width="112" height="44" fill="#1E1E1E" /><ellipse cx="24" cy="50" rx="18" ry="22" fill="#2E2E2E" /><ellipse cx="136" cy="50" rx="18" ry="22" fill="#141414" /><line x1="24" y1="50" x2="136" y2="50" stroke="#383838" strokeWidth="0.5" /></svg>
                },
                {
                  key: "loop_bands", name: "Mini Resistance Loop Bands", note: "5 levels. Warm-up through heavy resistance.", price: 650,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><ellipse cx="80" cy="70" rx="54" ry="15" fill="#8A8480" /><ellipse cx="80" cy="70" rx="40" ry="9" fill="#EDE8DF" /><ellipse cx="80" cy="60" rx="54" ry="15" fill="#2C3E2D" /><ellipse cx="80" cy="60" rx="40" ry="9" fill="#EDE8DF" /><ellipse cx="80" cy="50" rx="54" ry="15" fill="#7A5230" /><ellipse cx="80" cy="50" rx="40" ry="9" fill="#EDE8DF" /><ellipse cx="80" cy="40" rx="54" ry="15" fill="#5A3A2A" /><ellipse cx="80" cy="40" rx="40" ry="9" fill="#EDE8DF" /><ellipse cx="80" cy="30" rx="54" ry="15" fill="#3A3A3A" /><ellipse cx="80" cy="30" rx="40" ry="9" fill="#EDE8DF" /></svg>
                },
              ]
            },
            {
              tier: "Should Have", note: "Strongly recommended add-ons",
              items: [
                {
                  key: "gloves", name: "Workout Gloves", note: "Full-palm grip. Wrist support built in.", price: 1200,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="14" y="30" width="44" height="50" rx="8" fill="#2A2A2A" /><rect x="14" y="30" width="8" height="22" rx="4" fill="#1A1A1A" /><rect x="24" y="28" width="9" height="26" rx="4" fill="#1A1A1A" /><rect x="35" y="28" width="9" height="26" rx="4" fill="#1A1A1A" /><rect x="46" y="30" width="8" height="22" rx="4" fill="#1A1A1A" /><line x1="14" y1="53" x2="58" y2="53" stroke="#363636" strokeWidth="1" /><rect x="12" y="66" width="48" height="9" rx="2" fill="#363636" /><rect x="102" y="30" width="44" height="50" rx="8" fill="#2A2A2A" /><rect x="102" y="30" width="8" height="22" rx="4" fill="#1A1A1A" /><rect x="112" y="28" width="9" height="26" rx="4" fill="#1A1A1A" /><rect x="123" y="28" width="9" height="26" rx="4" fill="#1A1A1A" /><rect x="134" y="30" width="8" height="22" rx="4" fill="#1A1A1A" /><line x1="102" y1="53" x2="146" y2="53" stroke="#363636" strokeWidth="1" /><rect x="100" y="66" width="48" height="9" rx="2" fill="#363636" /></svg>
                },
                {
                  key: "towel", name: "Premium Gym Towel", note: "Quick-dry microfibre. 80 × 160cm.", price: 950,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="26" y="33" width="108" height="34" fill="#C4BDB4" opacity={0.55} /><ellipse cx="26" cy="50" rx="16" ry="17" fill="#CECCBF" opacity={0.6} /><ellipse cx="134" cy="50" rx="16" ry="17" fill="#A8A29A" opacity={0.45} /><line x1="26" y1="37" x2="134" y2="37" stroke="#E2DDD6" strokeWidth="1.2" opacity={0.9} /><line x1="26" y1="50" x2="134" y2="50" stroke="#2C3E2D" strokeWidth="2" opacity={0.22} /></svg>
                },
                {
                  key: "tree", name: "Weight Storage Tree + Weights", note: "Stores clean, displays well.", price: 7500,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><rect x="48" y="90" width="64" height="6" rx="3" fill="#2A2A2A" /><rect x="77" y="16" width="6" height="76" rx="3" fill="#3A3A3A" /><rect x="36" y="22" width="88" height="5" rx="2.5" fill="#303030" /><circle cx="39" cy="24" r="12" fill="#222" stroke="#3A3A3A" strokeWidth="1" /><circle cx="39" cy="24" r="5" fill="#161616" /><circle cx="121" cy="24" r="12" fill="#222" stroke="#3A3A3A" strokeWidth="1" /><circle cx="121" cy="24" r="5" fill="#161616" /><rect x="44" y="44" width="72" height="5" rx="2.5" fill="#303030" /><circle cx="47" cy="46" r="10" fill="#222" stroke="#3A3A3A" strokeWidth="1" /><circle cx="47" cy="46" r="4" fill="#161616" /><circle cx="113" cy="46" r="10" fill="#222" stroke="#3A3A3A" strokeWidth="1" /><circle cx="113" cy="46" r="4" fill="#161616" /><rect x="52" y="66" width="56" height="5" rx="2.5" fill="#303030" /><circle cx="55" cy="68" r="9" fill="#222" stroke="#3A3A3A" strokeWidth="1" /><circle cx="55" cy="68" r="3" fill="#161616" /><circle cx="105" cy="68" r="9" fill="#222" stroke="#3A3A3A" strokeWidth="1" /><circle cx="105" cy="68" r="3" fill="#161616" /></svg>
                },
              ]
            },
            {
              tier: "Good to Have", note: "Elevate the experience",
              items: [
                {
                  key: "kettlebell", name: "Premium Kettlebells", note: "Chromed steel, wood-turned handle. Sold as a pair.", price: 4200,
                  svg: <svg viewBox="0 0 160 100" fill="none" style={{ width: "78%", maxHeight: 110 }}><path d="M 20 52 Q 20 24 42 24 Q 64 24 64 52" stroke="#505050" strokeWidth="6" fill="none" strokeLinecap="round" /><circle cx="42" cy="68" r="22" fill="#252525" /><rect x="20" y="48" width="44" height="8" rx="4" fill="#1E1E1E" /><circle cx="34" cy="60" r="6" fill="#323232" /><path d="M 96 52 Q 96 24 118 24 Q 140 24 140 52" stroke="#505050" strokeWidth="6" fill="none" strokeLinecap="round" /><circle cx="118" cy="68" r="22" fill="#252525" /><rect x="96" y="48" width="44" height="8" rx="4" fill="#1E1E1E" /><circle cx="110" cy="60" r="6" fill="#323232" /></svg>
                },
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
                    <div key={item.key} onClick={() => toggleAcc(item.key)} style={{
                      background: sel ? "rgba(12,12,12,0.06)" : "var(--paper)",
                      cursor: "pointer", position: "relative", transition: "background 150ms", overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", top: 12, right: 12, width: 18, height: 18, borderRadius: "50%", background: sel ? obs : "rgba(248,244,239,0.88)", border: `0.5px solid ${sel ? obs : "rgba(12,12,12,0.18)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: sel ? "var(--paper)" : "transparent", transition: "all 150ms", zIndex: 1 }}>
                        {sel && "✓"}
                      </div>
                      <div style={{ width: "100%", height: 140, background: "#EDE8DF", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "0.5px solid rgba(12,12,12,0.07)", overflow: "hidden" }}>
                        {item.svg}
                      </div>
                      <div style={{ padding: "16px 18px 22px" }}>
                        <div style={{ fontSize: 13, color: obs, marginBottom: 4, lineHeight: 1.4 }}>{item.name}</div>
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
                { val: "gift", name: "Gift", desc: "Ordering for someone else? We'll handle the presentation." },
                { val: "self", name: "Self Order", desc: "Ordering for yourself. We'll deliver and install." },
              ].map(o => (
                <div key={o.val}>
                  <div onClick={() => setOrderType(o.val as "gift" | "self")} style={{
                    background: orderType === o.val ? "rgba(12,12,12,0.07)" : "rgba(12,12,12,0.04)",
                    padding: 22, cursor: "pointer", position: "relative", transition: "background 150ms",
                    outline: orderType === o.val ? "0.5px solid rgba(12,12,12,0.35)" : "none",
                  }}>
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
              <span style={{ width: 20, height: "0.5px", background: ash, display: "inline-block" }} />Training
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { val: "free", name: "Free Training", desc: "Guided programming and movement library, included with every bench." },
                { val: "subscription", name: "Subscription", desc: "Free Trial — 1 week, 3 live sessions with a certified trainer." },
              ].map(t => (
                <div key={t.val} onClick={() => { setTraining(t.val as "free" | "subscription"); setDoneSteps(prev => new Set([...prev, 4])); }} style={{
                  background: training === t.val ? "rgba(12,12,12,0.07)" : "rgba(12,12,12,0.04)",
                  padding: 22, cursor: "pointer", position: "relative", transition: "background 150ms",
                  outline: training === t.val ? "0.5px solid rgba(12,12,12,0.35)" : "none",
                }}>
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
                {summaryRows.length === 0 && (
                  <div style={{ padding: "24px 0", fontSize: 13, color: ash }}>Select a model above to build your order.</div>
                )}
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
              <button onClick={() => { if (!model) scrollTo(modelRef); else alert("Thank you! A Lyne advisor will contact you within 24 hours to confirm your order."); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, width: "100%", background: obs, color: "var(--paper)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "opacity 150ms" }}
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
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, height: 64,
        background: "rgba(250,250,248,0.96)", borderTop: sec(iron),
        backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 var(--g)",
        transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 380ms cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 12, color: obs }}>{model === "epto1" ? "EPTO1 — Master Series" : model === "epto4" ? "EPTO4 — Master Series" : ""}</span>
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
