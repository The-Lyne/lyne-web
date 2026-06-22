"use client";

const PILLARS = [
  { num: "01", title: "Equipment that earns its place.", body: "A reformer should belong in the most considered room in your home — not hidden in a corner. Every dimension, material, and finish decision is made with that standard in mind." },
  { num: "02", title: "Programmes, not just hardware.", body: "The machine arrives with a programme built for it. Foundation, Deep Centre, The Long Line — structured paths designed around the specific resistance of your reformer." },
  { num: "03", title: "Built for Egypt's serious movers.", body: "We design for a customer who values craft, demands precision, and will not compromise on what enters their home. The Lyne customer already knows what they want. We exist to give it to them." },
];

export default function AboutPage() {
  const iron = "rgba(12,12,12,0.08)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs }}>

      {/* ── HERO ── */}
      <div style={{ padding: "100px var(--g) 80px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          About Lyne
        </div>
        <h1 style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.01em", color: obs, maxWidth: "14ch" }}>
          Built for those who demand precision.
        </h1>
      </div>

      {/* ── LEAD ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
        <div style={{ padding: "72px var(--g)", borderRight: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", color: ash, marginBottom: 48 }}>01 / Origin</div>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 300, lineHeight: 1.25, color: obs, marginBottom: 28 }}>
            Lyne was built because the right reformer did not exist for the Egyptian home.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "52ch" }}>
            The equipment available was either clinical — designed for studio use, too large, too utilitarian — or compromised. Lower resistance, cheaper upholstery, the kind of machine that sits in a spare room and eventually gets ignored.
          </p>
        </div>
        <div style={{ padding: "72px var(--g)" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", color: ash, marginBottom: 48 }}>02 / Standard</div>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "52ch", marginBottom: 20 }}>
            We set a different standard. <strong style={{ color: obs, fontWeight: 400 }}>The Pro</strong> and <strong style={{ color: obs, fontWeight: 400 }}>The Air</strong> are designed to occupy the same space as furniture you're proud of — measured to fit Egyptian rooms, finished with full-grain leather, and paired with app-based training programmes from day one.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "52ch" }}>
            This is not a workout accessory. It is a machine built for the long term — for someone who has made a decision about how they want to move through the world, and has the discipline to act on it.
          </p>
        </div>
      </div>

      {/* ── PULLQUOTE ── */}
      <div style={{ padding: "88px var(--g)", borderBottom: sec(iron), background: "var(--cement)" }}>
        <blockquote style={{ fontSize: "clamp(24px,3.5vw,46px)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.01em", color: obs, maxWidth: "22ch" }}>
          &lsquo;A machine that earns its place in the most considered room in your home.&rsquo;
        </blockquote>
      </div>

      {/* ── PILLARS ── */}
      <section style={{ borderBottom: sec(iron) }}>
        <div style={{ padding: "64px var(--g) 48px", borderBottom: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: ash, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ width: 24, height: "0.5px", background: ash, display: "inline-block" }}/>
            What we build for
          </div>
          <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, color: obs }}>Three principles.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {PILLARS.map((p, i) => (
            <div key={i} style={{ padding: "56px var(--g)", borderRight: i < 2 ? sec(iron) : "none" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", color: ash, marginBottom: 32 }}>{p.num}</div>
              <h3 style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 300, color: obs, lineHeight: 1.3, marginBottom: 20 }}>{p.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: ash }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EGYPT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
        <div style={{ padding: "72px var(--g)", borderRight: sec(iron) }}>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", color: ash, marginBottom: 48 }}>03 / Egypt</div>
          <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 300, lineHeight: 1.25, color: obs, marginBottom: 28 }}>
            Designed here. Built for here.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "52ch" }}>
            Lyne is based in Cairo. White-glove delivery, on-site installation, and after-sale service are managed by our team — not outsourced. We know the buildings, the elevators, the room dimensions. When you order, we come to you.
          </p>
        </div>
        <div style={{ padding: "72px var(--g)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {[
              { label: "Delivery coverage", value: "Cairo + Alexandria" },
              { label: "Installation", value: "White-glove, in-home" },
              { label: "After-sale service", value: "On-site, no transport" },
              { label: "Warranty", value: "Up to 3 years" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 300, color: obs }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: "80px var(--g)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 300, color: obs }}>Ready to begin?</h2>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="/the-pro" className="btn-primary">Explore The Pro</a>
          <a href="/the-air" className="btn-primary">Explore The Air</a>
        </div>
      </div>

    </div>
  );
}
