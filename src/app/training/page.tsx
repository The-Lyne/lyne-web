"use client";

import Link from "next/link";
import { useState } from "react";

const PROGRAMMES = [
  {
    num: "01", level: "Beginner", name: "Foundation",
    desc: "Eight weeks. Every session builds on the last. You will learn to use your powerhouse before you load it, move with control before you move with speed. By week four, your body will feel different.",
    weeks: "8 weeks", freq: "3× per week", duration: "30–40 min", machine: "The Pro · The Air",
  },
  {
    num: "02", level: "Intermediate", name: "Deep Centre",
    desc: "A six-week intensive that goes inward. Transverse abdominis, pelvic floor, multifidus — the muscles that hold everything together. Sessions run longer and resistance demands are higher.",
    weeks: "6 weeks", freq: "4× per week", duration: "35–50 min", machine: "The Pro · The Air",
  },
  {
    num: "03", level: "Advanced", name: "The Long Line",
    desc: "Ongoing. No end date. Classical Pilates sequences run at pace — long, flowing, unbroken. For practitioners who are ready to let the machine disappear and feel only the movement.",
    weeks: "Ongoing", freq: "4–5× per week", duration: "45–60 min", machine: "The Pro",
  },
];

const SESSIONS = [
  { cat: "core",      title: "Hundred Variations",       duration: "30 min", machine: "Pro · Air", level: 30 },
  { cat: "full-body", title: "Classical Short Box",      duration: "40 min", machine: "Pro · Air", level: 60 },
  { cat: "lower",     title: "Footwork Sequence",        duration: "35 min", machine: "Pro · Air", level: 25 },
  { cat: "full-body", title: "Long Stretch Series",      duration: "45 min", machine: "Pro",       level: 85 },
  { cat: "core",      title: "Spine Articulation",       duration: "25 min", machine: "Pro · Air", level: 50 },
  { cat: "recovery",  title: "Stretch & Release",        duration: "20 min", machine: "Pro · Air", level: 15 },
  { cat: "lower",     title: "Side Splits & Hips",       duration: "40 min", machine: "Pro · Air", level: 75 },
  { cat: "full-body", title: "Centrifugal Flow",         duration: "50 min", machine: "Pro",       level: 90 },
];

const CATS = ["all", "core", "full-body", "lower", "recovery"] as const;

const SCHEDULE = [
  { day: "Monday",    name: "Spine Articulation",      focus: "Core",      dur: "35 min" },
  { day: "Tuesday",   name: "Rest",                    focus: "",          dur: "—",     rest: true },
  { day: "Wednesday", name: "Long Spine Series",       focus: "Full body", dur: "40 min" },
  { day: "Thursday",  name: "Rest",                    focus: "",          dur: "—",     rest: true },
  { day: "Friday",    name: "Hundred + Coordination",  focus: "Core",      dur: "30 min" },
  { day: "Saturday",  name: "Stretch & Release",       focus: "Recovery",  dur: "20 min" },
];

export default function TrainingPage() {
  const [cat, setCat] = useState<string>("all");

  const visible = SESSIONS.filter(s => cat === "all" || s.cat === cat);

  const sec = (color: string) => `0.5px solid ${color}`;
  const iron = "rgba(12,12,12,0.1)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ padding: "80px var(--g) 72px", borderBottom: sec(iron), display: "grid", gridTemplateColumns: "1fr auto", gap: 80, alignItems: "end" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
            Lyne Training
          </div>
          <h1 style={{ fontSize: "clamp(32px,4.5vw,64px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.02em", color: obs, marginBottom: 24 }}>
            The programme starts<br/>the day your machine arrives.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: ash, maxWidth: "52ch" }}>
            Every session in the Lyne app is built around your reformer — the resistance, the sequence, the progression. Not a generic workout. A structured programme designed for the machine in your home.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20, flexShrink: 0 }}>
          <div style={{ display: "flex", border: sec(iron) }}>
            {[
              { small: "Download on the", large: "App Store" },
              { small: "Get it on", large: "Google Play" },
            ].map((b, i) => (
              <a key={i} href="#" style={{
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "14px 28px", borderRight: i === 0 ? sec(iron) : "none",
                textDecoration: "none", transition: "background 150ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, display: "block" }}>{b.small}</span>
                <span style={{ fontSize: 15, fontWeight: 300, color: obs, display: "block" }}>{b.large}</span>
              </a>
            ))}
          </div>
          <p style={{ fontSize: 11, color: ash, textAlign: "right", maxWidth: "30ch", lineHeight: 1.75 }}>
            <strong style={{ color: obs, fontWeight: 400 }}>Free with any machine purchase.</strong><br/>
            Sign in with your order email to unlock the full library immediately.
          </p>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: sec(iron) }}>
        {[
          { num: "60+", label: "Guided sessions" },
          { num: "3",   label: "Full programmes" },
          { num: "8",   label: "Week foundation programme" },
          { num: "2",   label: "Machines supported" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "36px var(--g)", borderRight: i < 3 ? sec(iron) : "none" }}>
            <div style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, color: obs, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.num}</div>
            <div style={{ fontSize: 11, letterSpacing: "0.06em", color: ash }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── PROGRAMMES ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron), display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }}/>Programmes
            </div>
            <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, color: obs, letterSpacing: "-0.01em" }}>Three paths.<br/>One standard.</h2>
          </div>
          <p style={{ fontSize: 13, color: ash, maxWidth: "36ch", textAlign: "right", lineHeight: 1.8 }}>
            Each programme is a structured path from where you are to where you want to be. Choose by level — switch at any time.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {PROGRAMMES.map((p, i) => (
            <div key={p.num} style={{ padding: "48px var(--g)", borderRight: i < 2 ? sec(iron) : "none", cursor: "pointer", transition: "background 300ms var(--ease)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--cement)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 24 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: ash }}/>
                {p.level}
              </div>
              <div style={{ fontSize: "clamp(48px,5vw,72px)", fontWeight: 300, color: "var(--cement)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 16 }}>{p.num}</div>
              <h3 style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 300, color: obs, marginBottom: 12 }}>{p.name}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: ash, marginBottom: 28 }}>{p.desc}</p>
              <div style={{ paddingTop: 24, borderTop: sec(iron), display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Duration", p.weeks], ["Frequency", p.freq], ["Session length", p.duration], ["Machine", p.machine]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash }}>{k}</span>
                    <span style={{ fontSize: 11, color: obs }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Preview programme →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SESSION BROWSER ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron), display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }}/>From the library
            </div>
            <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, color: obs }}>Individual sessions</h2>
          </div>
          <div style={{ display: "flex", border: sec(iron) }}>
            {CATS.map((c, i) => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: "9px 18px", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase",
                color: cat === c ? obs : ash,
                background: cat === c ? "rgba(12,12,12,0.06)" : "none",
                border: "none", borderRight: i < CATS.length - 1 ? sec(iron) : "none",
                cursor: "pointer", fontFamily: "inherit", transition: "color 150ms, background 150ms",
              }}>{c === "full-body" ? "Full Body" : c.charAt(0).toUpperCase() + c.slice(1)}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {visible.map((s, i) => (
            <div key={i} style={{
              padding: "32px 28px", borderRight: (i + 1) % 4 !== 0 ? sec(iron) : "none",
              borderBottom: sec(iron), cursor: "pointer", transition: "background 200ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--cement)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 12, height: "0.5px", background: ash, display: "inline-block" }}/>{s.cat.replace("-", " ")}
              </div>
              <div style={{ fontSize: 15, fontWeight: 300, color: obs, lineHeight: 1.3, marginBottom: 20 }}>{s.title}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: ash }}>{s.duration}</span>
                <span style={{ fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 8px", border: sec(iron), color: ash }}>{s.machine}</span>
                <div style={{ flex: 1, height: 1, background: iron }}>
                  <div style={{ height: "100%", width: `${s.level}%`, background: ash }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT STARTS ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }}/>Getting started
          </div>
          <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, color: obs }}>Three steps to your first session.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { num: "01", title: "Order your machine.", desc: "Choose The Pro or The Air and place your order. White-glove delivery brings it to your room, assembled and ready. Your order email is your app key.", link: "/the-pro", linkLabel: "Shop reformers →" },
            { num: "02", title: "Download Lyne.", desc: "Available on iOS and Android. Sign in with the email address used for your order. Your programme library unlocks immediately — no code, no registration form.", link: "#", linkLabel: "App Store →" },
            { num: "03", title: "Start on day one.", desc: "Open Foundation. Session 1 is 32 minutes. It starts with breath, it ends with purpose. You do not need to know Pilates. You just need to follow the cue.", link: "#", linkLabel: "Preview a session →" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "48px var(--g)", borderRight: i < 2 ? sec(iron) : "none", display: "flex", gap: 24 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.06em", color: ash, flexShrink: 0, paddingTop: 4 }}>{s.num}</span>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 300, color: obs, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: ash }}>{s.desc}</p>
                <Link href={s.link} style={{ display: "inline-block", marginTop: 12, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, textDecoration: "none", transition: "color 150ms" }}
                  onMouseEnter={e => (e.currentTarget.style.color = obs)}
                  onMouseLeave={e => (e.currentTarget.style.color = ash)}
                >{s.linkLabel}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MACHINES ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron), background: "var(--cement)" }}>
        {[
          {
            eyebrow: "Smart reformer", name: "the pro.",
            desc: "Connects directly to the app. Your phone controls motor resistance in real time — the app adjusts automatically per exercise as you move through the programme. All three programmes available.",
            href: "/the-pro",
          },
          {
            eyebrow: "Elastic reformer", name: "the air.",
            desc: "No motor, no Bluetooth required. The app runs all sessions in guided video and audio — cueing band selection and carriage position manually throughout. Foundation programme and full session library available.",
            href: "/the-air",
          },
        ].map((m, i) => (
          <div key={i} style={{ padding: "64px var(--g)", borderRight: i === 0 ? sec(iron) : "none" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, marginBottom: 16 }}>{m.eyebrow}</div>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 300, color: obs, marginBottom: 20 }}>{m.name}</h2>
            <p style={{ fontSize: 13, lineHeight: 1.85, color: ash, marginBottom: 36 }}>{m.desc}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: sec(iron) }}>
              <span style={{ fontSize: 11, color: ash }}>App access — included with purchase</span>
              <Link href={m.href} style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = obs)}
                onMouseLeave={e => (e.currentTarget.style.color = ash)}
              >Shop →</Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── APP / DOWNLOAD ── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
        <div style={{ padding: "80px var(--g)", borderRight: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }}/>Lyne App
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: obs, lineHeight: 1.1, letterSpacing: "-0.015em", marginBottom: 16 }}>
            Your programme.<br/>Your machine.<br/>Your home.
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: ash, maxWidth: "44ch", marginBottom: 40 }}>
            Download free. Unlock the full library the moment your machine is confirmed. Available in Arabic and English.
          </p>
          <div style={{ display: "flex", border: sec(iron), width: "fit-content" }}>
            {[
              { small: "Download on the", large: "App Store" },
              { small: "Get it on", large: "Google Play" },
            ].map((b, i) => (
              <a key={i} href="#" style={{
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "14px 28px", borderRight: i === 0 ? sec(iron) : "none",
                textDecoration: "none", transition: "background 150ms",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: 8, letterSpacing: "0.06em", textTransform: "uppercase", color: ash, display: "block" }}>{b.small}</span>
                <span style={{ fontSize: 15, fontWeight: 300, color: obs, display: "block" }}>{b.large}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Schedule preview */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px var(--g)", borderBottom: sec(iron), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>Foundation · Week 2</span>
            <span style={{ fontSize: 13, fontWeight: 300, color: obs }}>4 sessions remaining</span>
          </div>
          <div style={{ padding: "14px var(--g)", borderBottom: sec(iron), fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: ash }}>This week</div>
          {SCHEDULE.map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "80px 1fr 64px 52px",
              padding: "18px var(--g)", borderBottom: sec(iron), alignItems: "center", gap: 16,
              opacity: row.rest ? 0.5 : 1, transition: "background 150ms",
            }}
            onMouseEnter={e => !row.rest && (e.currentTarget.style.background = "var(--cement)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash }}>{row.day}</span>
              <span style={{ fontSize: 13, fontWeight: 300, color: obs }}>{row.name}</span>
              <span style={{ fontSize: 10, color: ash }}>{row.focus}</span>
              <span style={{ fontSize: 11, color: ash, textAlign: "right" }}>{row.dur}</span>
            </div>
          ))}
          <div style={{ padding: "14px var(--g)", borderBottom: sec(iron), fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: ash }}>Next week</div>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 64px 52px", padding: "18px var(--g)", alignItems: "center", gap: 16, opacity: 0.4 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: ash }}>Monday</span>
            <span style={{ fontSize: 13, fontWeight: 300, color: obs }}>Footwork Progressions</span>
            <span style={{ fontSize: 10, color: ash }}>Lower</span>
            <span style={{ fontSize: 11, color: ash, textAlign: "right" }}>35 min</span>
          </div>
        </div>
      </section>

    </div>
  );
}
