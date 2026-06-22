"use client";

import Link from "next/link";
import { useState } from "react";

const FEATURED = {
  cat: "training",
  tag: "Training",
  title: "Why the first six weeks on the reformer change everything about how you move.",
  excerpt: "Most people who train with Pilates equipment for the first time are surprised by what it reveals — not just what they can do, but what they have been doing wrong. The reformer is an honest machine.",
  date: "June 14, 2026",
};

const ARTICLES = [
  { cat: "equipment", title: "The Pro vs The Air — how to choose your reformer.", excerpt: "Motor resistance or elastic resistance? Both are precise. Both are premium. The difference comes down to how you train.", date: "June 10, 2026", bg: "linear-gradient(135deg,#D8D2C9 0%,#C8C0B4 100%)" },
  { cat: "movement",  title: "Pilates for the strength athlete. A framework for adding reformer work to a lifting practice.", excerpt: "Mobility, breath, control — what Pilates offers the person who already lifts.", date: "June 5, 2026",  bg: "linear-gradient(135deg,#C8C4BC 0%,#D4CFC7 100%)" },
  { cat: "space",     title: "Designing your home training space around the equipment you own.", excerpt: "The room should serve the practice, not the other way around.", date: "May 28, 2026", bg: "linear-gradient(135deg,#D0CAC0 0%,#BEB8B0 100%)" },
  { cat: "training",  title: "Four weeks with The Air. What we learned from testing Lyne's elastic reformer.", excerpt: "An honest account of training on the elastic band system, written by our lead trainer.", date: "May 20, 2026", bg: "linear-gradient(135deg,#C4C0B8 0%,#CCC8C0 100%)" },
  { cat: "lifestyle", title: "On consistency. Why the space you build matters as much as the practice itself.", excerpt: "People who train regularly do not have more discipline. They have better environments.", date: "May 12, 2026", bg: "linear-gradient(135deg,#D4D0C8 0%,#C0BAB0 100%)" },
  { cat: "movement",  title: "The footwork series. A beginner's guide to the reformer's most foundational exercises.", excerpt: "Before the hundred, before the long stretch — there is footwork. Always.", date: "May 5, 2026",  bg: "linear-gradient(135deg,#C8C4BC 0%,#D8D0C4 100%)" },
];

const FILTERS = ["all", "training", "movement", "equipment", "space", "lifestyle"];

export default function JournalPage() {
  const [filter, setFilter] = useState("all");

  const iron  = "rgba(12,12,12,0.08)";
  const ash   = "var(--ash)";
  const obs   = "var(--obsidian)";
  const paper = "var(--paper)";
  const sec   = (c: string) => `0.5px solid ${c}`;

  const featVisible = filter === "all" || FEATURED.cat === filter;
  const visible = filter === "all" ? ARTICLES : ARTICLES.filter(a => a.cat === filter);

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: paper, color: obs }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ padding: "72px var(--g) 56px", borderBottom: sec(iron), display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
            Journal
          </div>
          <h1 style={{ fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.01em", color: obs }}>
            Movement, space,<br/>and the practice.
          </h1>
        </div>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: obs, lineHeight: 1, letterSpacing: "-0.02em" }}>12</div>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginTop: 4 }}>articles</div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{
        position: "sticky", top: "var(--nav-h)", height: 44,
        background: paper, borderBottom: sec(iron),
        display: "flex", alignItems: "stretch", overflowX: "auto", zIndex: 200,
        scrollbarWidth: "none",
      }}>
        {FILTERS.map((f, i) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            flexShrink: 0, display: "flex", alignItems: "center",
            padding: i === 0 ? "0 28px 0 var(--g)" : i === FILTERS.length - 1 ? "0 var(--g) 0 28px" : "0 28px",
            borderRight: i < FILTERS.length - 1 ? sec(iron) : "none",
            fontSize: 10, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase",
            color: filter === f ? obs : ash,
            background: filter === f ? "rgba(12,12,12,0.04)" : "none",
            border: "none", borderTop: "none", borderBottom: "none", borderLeft: "none",
            borderRightWidth: i < FILTERS.length - 1 ? "0.5px" : "0",
            borderRightStyle: "solid",
            borderRightColor: iron,
            cursor: "pointer", fontFamily: "inherit", transition: "color 150ms, background 150ms",
          }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* ── FEATURED ── */}
      {featVisible && (
        <article style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron), minHeight: 480 }}>
          <div style={{ background: "linear-gradient(145deg,#D8D2C9 0%,#C8C2B8 100%)", borderRight: sec(iron), display: "flex", alignItems: "center", justifyContent: "center", minHeight: 480 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, opacity: 0.5 }}>Image — Training</span>
          </div>
          <div style={{ padding: "56px var(--g)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-block", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: paper, background: obs, padding: "4px 10px", marginBottom: 32 }}>Featured</div>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 12, marginBottom: 0 }}>
                <span style={{ width: 20, height: "0.5px", background: ash, display: "inline-block" }}/>
                {FEATURED.tag}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 300, lineHeight: 1.2, color: obs, letterSpacing: "0.01em", marginBottom: 20 }}>{FEATURED.title}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: ash, maxWidth: "48ch", marginBottom: 40 }}>{FEATURED.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 28, borderTop: sec(iron) }}>
                <span style={{ fontSize: 11, letterSpacing: "0.06em", color: ash }}>{FEATURED.date}</span>
                <Link href="/journal/post" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: obs, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, transition: "gap 200ms var(--ease)" }}
                  onMouseEnter={e => (e.currentTarget.style.gap = "16px")}
                  onMouseLeave={e => (e.currentTarget.style.gap = "10px")}
                >
                  Read article →
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* ── ARTICLE GRID ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "40px var(--g) 32px", borderBottom: sec(iron), display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash }}>All articles</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {visible.map((a, i) => (
            <Link key={i} href="/journal/post" style={{
              borderRight: (i + 1) % 3 !== 0 ? sec(iron) : "none",
              borderBottom: sec(iron),
              display: "flex", flexDirection: "column",
              textDecoration: "none", color: "inherit",
              transition: "background 200ms var(--ease)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(12,12,12,0.02)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ aspectRatio: "16/9", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: sec(iron) }}>
                <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, opacity: 0.4 }}>Image</span>
              </div>
              <div style={{ padding: "28px 32px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 12 }}>{a.cat}</div>
                <h3 style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.35, color: obs, marginBottom: 12, flex: 1 }}>{a.title}</h3>
                <p style={{ fontSize: 12, lineHeight: 1.85, color: ash, marginBottom: 24 }}>{a.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: sec(iron) }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.06em", color: ash }}>{a.date}</span>
                  <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 8 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LOAD MORE ── */}
      <div style={{ padding: "48px var(--g)", display: "flex", justifyContent: "center", borderBottom: sec(iron) }}>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          height: 48, padding: "0 40px",
          background: "transparent", color: obs,
          fontFamily: "inherit", fontSize: 10, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase",
          border: sec(iron), cursor: "pointer", transition: "border-color 200ms",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = obs)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = iron)}
        >
          Load more articles
        </button>
      </div>

    </div>
  );
}
