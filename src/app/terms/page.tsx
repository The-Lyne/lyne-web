"use client";

export default function TermsPage() {
  const iron = "rgba(12,12,12,0.08)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  const sections = [
    { title: "Acceptance of Terms", body: "By using the Lyne website or placing an order, you agree to these Terms of Service. If you do not agree, please do not use our services." },
    { title: "Orders & Payment", body: "All orders require a 30% deposit to confirm. The remaining balance is due prior to delivery. We reserve the right to cancel orders if payment is not received within 7 days of the due date. Prices are displayed in Egyptian Pounds (EGP) and include applicable taxes." },
    { title: "Delivery", body: "Delivery is available in Greater Cairo and Alexandria. We will contact you to schedule a delivery appointment. Delivery timelines are estimates and may vary due to production or logistics factors. Lyne is not liable for delays beyond our control." },
    { title: "Returns & Cancellations", body: "Orders may be cancelled before production commences — the 30% deposit is non-refundable. Once production has begun, cancellations are not accepted. For defective or damaged items upon delivery, please contact us within 48 hours of receipt." },
    { title: "Intellectual Property", body: "All content on the Lyne website — including designs, copy, photography, and software — is the property of Lyne and protected by applicable intellectual property laws. Unauthorised use is prohibited." },
    { title: "App & Training Content", body: "The Lyne app and all training programmes are provided for personal, non-commercial use. Access is tied to a verified machine purchase. Sharing access credentials or redistributing content is prohibited." },
    { title: "Limitation of Liability", body: "Lyne is not liable for indirect, incidental, or consequential damages arising from the use of our products or services, beyond the value of the original purchase. Our machines are for domestic use only and must not be used commercially without prior agreement." },
    { title: "Governing Law", body: "These terms are governed by the laws of the Arab Republic of Egypt. Any disputes will be resolved in Cairo courts." },
    { title: "Contact", body: "For questions regarding these terms, contact us at legal@lyne.co." },
  ];

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>
      <div style={{ padding: "80px var(--g) 64px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          Legal
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: obs, marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: ash }}>Last updated: August 2026</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", borderBottom: sec(iron) }}>
        <div style={{ borderRight: sec(iron), padding: "48px 40px", position: "sticky", top: "var(--nav-h)", alignSelf: "start", height: "fit-content" }}>
          {sections.map(s => (
            <a key={s.title} href={`#${s.title.replace(/\s/g, "-")}`} style={{ display: "block", fontSize: 11, color: ash, textDecoration: "none", padding: "8px 0", borderBottom: sec("rgba(12,12,12,0.05)"), transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = obs)}
              onMouseLeave={e => (e.currentTarget.style.color = ash)}
            >{s.title}</a>
          ))}
        </div>
        <div style={{ padding: "48px var(--g)" }}>
          {sections.map((s, i) => (
            <div key={s.title} id={s.title.replace(/\s/g, "-")} style={{ paddingBottom: 48, marginBottom: i < sections.length - 1 ? 48 : 0, borderBottom: i < sections.length - 1 ? sec(iron) : "none" }}>
              <h2 style={{ fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: obs, marginBottom: 20 }}>{s.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "60ch" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
