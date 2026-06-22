"use client";

import { useState } from "react";

const SECTIONS = [
  {
    label: "Orders & Payment",
    items: [
      { q: "How do I place an order?", a: "Visit the product page for The Pro or The Air, configure your machine, and click 'Add to Cart'. A 30% deposit is required to confirm your order. The remaining balance is due before delivery." },
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, bank transfers, and Sympl instalments — up to 12 months, with 0% interest for the first 3 months." },
      { q: "Can I pay in instalments?", a: "Yes. We partner with Sympl for 0% instalment plans up to 12 months. Available on all products at checkout." },
      { q: "Is my payment secure?", a: "All card transactions are processed through Paymob, a PCI-DSS compliant payment gateway. We do not store card details." },
    ],
  },
  {
    label: "Delivery & Installation",
    items: [
      { q: "Where do you deliver?", a: "We currently deliver to Greater Cairo and Alexandria. We'll expand to other cities — sign up to the waitlist to be notified." },
      { q: "How long does delivery take?", a: "7–10 business days from order confirmation. We'll contact you to schedule a delivery window that works for you." },
      { q: "What does white-glove delivery include?", a: "Our team delivers, assembles, and positions the machine in your chosen room. We remove all packaging and ensure the machine is ready to use before we leave." },
      { q: "Do I need to do anything to prepare?", a: "We offer a free pre-delivery space consultation. Our team will visit, confirm the room dimensions, and advise on the best placement before you commit." },
    ],
  },
  {
    label: "Products",
    items: [
      { q: "What is the difference between The Pro and The Air?", a: "The Pro uses a digital motor for variable resistance — connected to the app, it adjusts automatically throughout your programme. The Air uses an elastic band system: no motor, no Bluetooth, pure mechanical resistance. Both are full-size reformers with full-grain leather upholstery." },
      { q: "Can I try before I buy?", a: "We'll be running trial events in Cairo before our official launch. Sign up on the Events page to be notified." },
      { q: "What upholstery options are available?", a: "Both machines are available in Obsidian, Stone, Forest, Dusk, and Blush. Frame finishes: Matte Black (standard), Brushed Steel, and Powder Coat Sand." },
      { q: "What is included in the Studio Bundle?", a: "The Studio Bundle adds a jump board, short box, and a premium resistance band set to the standard machine. Everything you need for a fully equipped home studio." },
    ],
  },
  {
    label: "Training & App",
    items: [
      { q: "How does the Lyne app work?", a: "The Lyne app provides structured Pilates programmes built specifically for The Pro and The Air. Access is free with any machine purchase — sign in with your order email." },
      { q: "When can I access the app?", a: "Your app access unlocks immediately when your order is confirmed. No code required — just sign in with the email you used to order." },
      { q: "What programmes are available?", a: "Three full programmes: Foundation (8 weeks, beginner), Deep Centre (6 weeks, intermediate), and The Long Line (ongoing, advanced). Plus 60+ individual sessions across core, full body, lower body, and recovery categories." },
      { q: "What is the AI Trainer?", a: "Coming in Phase 2: AI Trainer personalises sessions based on your progress, adapts resistance recommendations in real time, and provides weekly check-ins. Available as an optional add-on." },
    ],
  },
  {
    label: "Warranty & Service",
    items: [
      { q: "What is covered under warranty?", a: "The Pro: 3-year motor and mechanical warranty, 2-year upholstery and springs. The Air: 2-year frame and mechanical, 1-year upholstery and bands." },
      { q: "How does the service process work?", a: "Our service team comes to you. You never need to transport the machine. Schedule a service visit via the app or by contacting us." },
      { q: "Are replacement parts available?", a: "Yes. Springs, straps, and elastic bands can be ordered directly from us. Most replacements are same-day in Greater Cairo." },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);

  const iron = "rgba(12,12,12,0.08)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>

      {/* ── HEADER ── */}
      <div style={{ padding: "80px var(--g) 64px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          FAQ
        </div>
        <h1 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.01em", color: obs }}>
          Common questions.
        </h1>
      </div>

      {/* ── FAQ SECTIONS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", borderBottom: sec(iron) }}>

        {/* Sidebar — section nav */}
        <div style={{ borderRight: sec(iron), padding: "48px var(--g)", position: "sticky", top: "var(--nav-h)", height: "fit-content", alignSelf: "start" }}>
          {SECTIONS.map(s => (
            <a key={s.label} href={`#${s.label.replace(/\s/g, "-")}`} style={{
              display: "block", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
              color: ash, textDecoration: "none", padding: "10px 0",
              borderBottom: sec("rgba(12,12,12,0.06)"), transition: "color 150ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = obs)}
            onMouseLeave={e => (e.currentTarget.style.color = ash)}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Questions */}
        <div>
          {SECTIONS.map(section => (
            <section key={section.label} id={section.label.replace(/\s/g, "-")} style={{ borderBottom: sec(iron) }}>
              <div style={{ padding: "48px var(--g) 32px", borderBottom: sec(iron) }}>
                <h2 style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>{section.label}</h2>
              </div>
              {section.items.map((item, i) => {
                const key = `${section.label}-${i}`;
                return (
                  <div key={key} style={{ borderBottom: i < section.items.length - 1 ? sec(iron) : "none" }}>
                    <div
                      onClick={() => setOpen(open === key ? null : key)}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px var(--g)", cursor: "pointer" }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 300, color: obs, maxWidth: "60ch" }}>{item.q}</span>
                      <span style={{
                        fontSize: 20, fontWeight: 300, color: ash, display: "inline-block",
                        transform: open === key ? "rotate(45deg)" : "none",
                        transition: "transform 300ms var(--ease)", flexShrink: 0, marginLeft: 24,
                      }}>+</span>
                    </div>
                    <div style={{ maxHeight: open === key ? 400 : 0, overflow: "hidden", transition: "max-height 400ms var(--ease)" }}>
                      <p style={{ padding: "0 var(--g) 28px", fontSize: 14, lineHeight: 1.85, color: ash, maxWidth: "56ch" }}>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </div>

      {/* ── STILL NEED HELP ── */}
      <div style={{ padding: "80px var(--g)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 300, color: obs, marginBottom: 8 }}>Still have a question?</h2>
          <p style={{ fontSize: 14, color: ash }}>Our team typically responds within a few hours.</p>
        </div>
        <a href="/contact" className="btn-primary">Contact Us</a>
      </div>

    </div>
  );
}
