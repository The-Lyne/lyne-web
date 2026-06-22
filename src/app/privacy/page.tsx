"use client";

export default function PrivacyPage() {
  const iron = "rgba(12,12,12,0.08)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  const sections = [
    { title: "Information We Collect", body: "We collect information you provide directly: name, email address, phone number, delivery address, and payment information. We also collect usage data when you use the Lyne website or app, including device type, pages visited, and session duration." },
    { title: "How We Use Your Information", body: "We use your information to process orders, schedule delivery and installation, provide app access, send order and delivery updates, and improve our products and services. We do not sell your personal information to third parties." },
    { title: "Payment Security", body: "All payment transactions are processed by Paymob, a PCI-DSS Level 1 certified payment processor. We do not store full card numbers on our servers. Card details are transmitted directly to Paymob using industry-standard encryption." },
    { title: "Data Retention", body: "We retain your personal information for as long as your account is active, or as required to provide services and comply with legal obligations. You may request deletion of your account and data at any time by contacting us." },
    { title: "Your Rights", body: "You have the right to access, correct, or delete your personal information at any time. You may also object to certain processing activities or request data portability. To exercise these rights, contact us at privacy@lyne.co." },
    { title: "Cookies", body: "We use essential cookies to keep you logged in and maintain your cart. We use analytics cookies (with your consent) to understand how the site is used. You can manage cookie preferences in your browser settings." },
    { title: "Contact", body: "For privacy-related questions or requests, contact us at privacy@lyne.co or write to: Lyne, Cairo, Egypt." },
  ];

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>
      <div style={{ padding: "80px var(--g) 64px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          Legal
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: obs, marginBottom: 12 }}>Privacy Policy</h1>
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
