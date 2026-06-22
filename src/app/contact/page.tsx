"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const iron = "rgba(12,12,12,0.12)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 52, padding: "0 16px",
    background: "transparent", border: sec(iron),
    fontSize: 14, color: obs, fontFamily: "inherit",
    outline: "none", transition: "border-color 150ms",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>

      {/* ── HEADER ── */}
      <div style={{ padding: "80px var(--g) 64px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          Contact
        </div>
        <h1 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, lineHeight: 1.08, color: obs }}>
          We&rsquo;re here.
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>

        {/* ── LEFT: info ── */}
        <div style={{ padding: "72px var(--g)", borderRight: sec(iron) }}>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "44ch", marginBottom: 56 }}>
            For orders, delivery scheduling, product questions, or anything else — send us a message and we&rsquo;ll get back to you within a few hours.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[
              { label: "Email", value: "hello@lyne.co", href: "mailto:hello@lyne.co" },
              { label: "WhatsApp", value: "+20 100 000 0000", href: "#" },
              { label: "Location", value: "Cairo, Egypt", href: undefined },
            ].map(c => (
              <div key={c.label}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 8 }}>{c.label}</div>
                {c.href ? (
                  <a href={c.href} style={{ fontSize: 15, fontWeight: 300, color: obs, textDecoration: "none", transition: "opacity 150ms" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.55")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >{c.value}</a>
                ) : (
                  <div style={{ fontSize: 15, fontWeight: 300, color: obs }}>{c.value}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, paddingTop: 40, borderTop: sec(iron) }}>
            <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 16 }}>Hours</div>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: ash }}>Sunday – Thursday, 9am – 6pm (Cairo time)</p>
          </div>
        </div>

        {/* ── RIGHT: form ── */}
        <div style={{ padding: "72px var(--g)" }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: 20 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>Message sent</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 300, color: obs }}>We&rsquo;ll be in touch soon.</h2>
              <p style={{ fontSize: 14, color: ash }}>Our team typically responds within a few hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Name</label>
                  <input
                    type="text" required placeholder="Your name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = obs)}
                    onBlur={e => (e.currentTarget.style.borderColor = iron)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Email</label>
                  <input
                    type="email" required placeholder="your@email.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = obs)}
                    onBlur={e => (e.currentTarget.style.borderColor = iron)}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Subject</label>
                <select
                  value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={e => (e.currentTarget.style.borderColor = obs)}
                  onBlur={e => (e.currentTarget.style.borderColor = iron)}
                >
                  <option value="">Select a topic</option>
                  <option>Product enquiry</option>
                  <option>Order status</option>
                  <option>Delivery & installation</option>
                  <option>Warranty & service</option>
                  <option>Payment</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Message</label>
                <textarea
                  required rows={6} placeholder="Tell us how we can help..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, height: "auto", padding: "16px", resize: "vertical" }}
                  onFocus={e => (e.currentTarget.style.borderColor = obs)}
                  onBlur={e => (e.currentTarget.style.borderColor = iron)}
                />
              </div>
              <div style={{ paddingTop: 8 }}>
                <button type="submit" className="btn-primary" style={{ width: "100%" }}>
                  Send Message →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
