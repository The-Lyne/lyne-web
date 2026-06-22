import type { Metadata } from "next";

export const metadata: Metadata = { title: "Warranty" };

export default function WarrantyPage() {
  const iron = "rgba(12,12,12,0.08)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  const rows = [
    ["Motor & electronics",     "3 years",  "The Pro only"],
    ["Frame & mechanical",      "3 years",  "The Pro · 2 years for The Air"],
    ["Upholstery & foam",       "2 years",  "The Pro · 1 year for The Air"],
    ["Springs & resistance",    "2 years",  "The Pro · 1 year for The Air"],
    ["Elastic bands",           "1 year",   "The Air only"],
    ["Straps & loops",          "1 year",   "The Pro · The Air"],
  ];

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>

      <div style={{ padding: "80px var(--g) 64px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          Warranty
        </div>
        <h1 style={{ fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, lineHeight: 1.08, color: obs }}>
          We stand behind our machines.
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
        <div style={{ padding: "72px var(--g)", borderRight: sec(iron) }}>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "44ch", marginBottom: 40 }}>
            All Lyne machines are covered by a comprehensive warranty. If anything fails, our service team comes to you — no transport, no drop-off points.
          </p>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 16 }}>Coverage table</div>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", height: 40, alignItems: "center", borderTop: sec(iron), borderBottom: sec(iron) }}>
              <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>Component</span>
              <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>Period</span>
              <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash }}>Notes</span>
            </div>
            {rows.map(([comp, period, note]) => (
              <div key={comp} style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", height: 52, alignItems: "center", borderBottom: sec(iron) }}>
                <span style={{ fontSize: 13, color: obs }}>{comp}</span>
                <span style={{ fontSize: 13, fontWeight: 300, color: obs }}>{period}</span>
                <span style={{ fontSize: 12, color: ash }}>{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "72px var(--g)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {[
              { title: "How to claim", body: "Contact us via email or WhatsApp with your order number and a description of the issue. We'll schedule a service visit at a time that works for you." },
              { title: "What's covered", body: "Manufacturing defects, mechanical failures, and material faults under normal use. Warranty does not cover cosmetic damage from improper care, accidental damage, or unauthorised modifications." },
              { title: "Service in Cairo", body: "Our team operates across Greater Cairo and Alexandria. Most service visits are scheduled within 48 hours. Replacement parts are stocked in Cairo." },
              { title: "After warranty", body: "After the warranty period, our team still comes to you. Spare parts and service are available at standard rates — no courier, no workshops." },
            ].map(item => (
              <div key={item.title} style={{ paddingBottom: 40, borderBottom: sec(iron) }}>
                <h3 style={{ fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: obs, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: ash }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "64px var(--g)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 14, color: ash }}>Need to make a warranty claim?</p>
        <a href="/contact" className="btn-primary">Contact Us</a>
      </div>
    </div>
  );
}
