import Link from "next/link";

/* ── HERO DOORS ── */
function HeroDoors() {
  return (
    <section style={{ position: "relative", display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Seam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "calc(50% - 0.25px)",
          width: "0.5px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(200,190,178,0.22) 16%, rgba(200,190,178,0.22) 84%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* The Pro door */}
      <Link
        href="/the-pro"
        style={{
          position: "relative",
          width: "50%",
          height: "100%",
          overflow: "hidden",
          cursor: "pointer",
          textDecoration: "none",
          display: "block",
          background: "var(--obsidian)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to bottom, transparent 30%, rgba(12,12,12,0.82) 100%),
              repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px),
              repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px)
            `,
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 80,
            right: 40,
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--iron)",
          }}
        >
          01
        </span>
        <div style={{ position: "absolute", bottom: 80, left: 64, zIndex: 2 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 20,
              color: "var(--ash)",
            }}
          >
            Smart Motor Reformer
          </span>
          <h2
            style={{
              fontSize: "clamp(36px, 3.5vw, 52px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "0.02em",
              textTransform: "lowercase",
              color: "var(--sand)",
            }}
          >
            the pro
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 36,
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--sand)",
            }}
          >
            Explore →
          </div>
        </div>
      </Link>

      {/* The Air door */}
      <Link
        href="/the-air"
        style={{
          position: "relative",
          width: "50%",
          height: "100%",
          overflow: "hidden",
          cursor: "pointer",
          textDecoration: "none",
          display: "block",
          background: "var(--paper)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to bottom, transparent 30%, rgba(250,250,248,0.9) 100%),
              repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.018) 79px, rgba(0,0,0,0.018) 80px),
              repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(0,0,0,0.018) 79px, rgba(0,0,0,0.018) 80px)
            `,
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 80,
            right: 40,
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "rgba(12,12,12,0.13)",
          }}
        >
          02
        </span>
        <div style={{ position: "absolute", bottom: 80, left: 64, zIndex: 2 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 20,
              color: "var(--ash)",
            }}
          >
            Elastic Band Reformer
          </span>
          <h2
            style={{
              fontSize: "clamp(36px, 3.5vw, 52px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "0.02em",
              textTransform: "lowercase",
              color: "var(--obsidian)",
            }}
          >
            the air
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 36,
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--obsidian)",
            }}
          >
            Explore →
          </div>
        </div>
      </Link>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <style>{`
          @keyframes line-draw {
            0%   { height: 0; opacity: 1; transform: translateY(0); }
            65%  { height: 40px; opacity: 1; }
            100% { height: 40px; opacity: 0; transform: translateY(12px); }
          }
          .scroll-line { width: 1px; background: rgba(150,140,130,0.5); animation: line-draw 1.6s ease-in-out infinite; }
        `}</style>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "white",
            mixBlendMode: "difference",
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* ── WORLD SECTION ── */
function WorldSection({
  variant,
  eyebrow,
  headline,
  body,
  products,
  ctaLabel,
  ctaHref,
}: {
  variant: "dark" | "light";
  eyebrow: string;
  headline: string;
  body: string;
  products: { name: string; price: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const dark = variant === "dark";

  return (
    <section
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: dark ? "row" : "row-reverse",
        borderTop: dark ? "0.5px solid var(--iron)" : "0.5px solid rgba(234,228,218,0.12)",
      }}
    >
      {/* Visual */}
      <div
        style={{
          width: "55%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: dark ? "var(--obsidian)" : "var(--paper)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: dark
              ? "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,0.015) 79px,rgba(255,255,255,0.015) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,0.015) 79px,rgba(255,255,255,0.015) 80px)"
              : "repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(0,0,0,0.015) 79px,rgba(0,0,0,0.015) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(0,0,0,0.015) 79px,rgba(0,0,0,0.015) 80px)",
          }}
        />
        <div
          style={{
            width: "60%",
            aspectRatio: "1",
            border: `0.5px solid ${dark ? "var(--iron)" : "rgba(12,12,12,0.08)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: dark ? "var(--iron)" : "rgba(12,12,12,0.2)",
            }}
          >
            Product Image
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px var(--g)",
          background: dark ? "var(--obsidian)" : "var(--paper)",
          borderLeft: dark ? "0.5px solid var(--iron)" : undefined,
          borderRight: !dark ? "0.5px solid rgba(12,12,12,0.08)" : undefined,
        }}
      >
        <p
          className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}
          style={{ marginBottom: 32 }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontSize: "clamp(30px, 2.8vw, 42px)",
            fontWeight: 300,
            lineHeight: 1.12,
            textTransform: "lowercase",
            letterSpacing: "0.01em",
            marginBottom: 24,
            color: dark ? "var(--sand)" : "var(--obsidian)",
          }}
        >
          {headline}
        </h2>
        <p style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.85, maxWidth: 330, color: "var(--ash)" }}>
          {body}
        </p>

        <div
          style={{
            marginTop: 48,
            borderTop: dark ? "0.5px solid var(--iron)" : "0.5px solid rgba(12,12,12,0.1)",
          }}
        >
          {products.map((p) => (
            <Link
              key={p.href + p.name}
              href={p.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 60,
                padding: "0 2px",
                borderBottom: dark ? "0.5px solid var(--iron)" : "0.5px solid rgba(12,12,12,0.1)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 300, textTransform: "lowercase", color: dark ? "var(--sand)" : "var(--obsidian)" }}>
                {p.name}
              </span>
              <span style={{ fontSize: 13, color: "var(--ash)" }}>{p.price}</span>
            </Link>
          ))}
        </div>

        <Link
          href={ctaHref}
          className={dark ? "btn-light" : "btn-primary"}
          style={{ marginTop: 40, alignSelf: "flex-start" }}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

/* ── TRAINING SECTION ── */
function TrainingSection() {
  return (
    <section
      style={{
        background: "var(--obsidian)",
        borderTop: "0.5px solid var(--iron)",
        padding: "112px var(--g)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}
    >
      <div>
        <p className="eyebrow eyebrow-dark" style={{ marginBottom: 32 }}>Lyne Training</p>
        <h2
          style={{
            fontSize: "clamp(34px, 3.8vw, 52px)",
            fontWeight: 300,
            lineHeight: 1.06,
            textTransform: "lowercase",
            color: "var(--sand)",
            marginBottom: 24,
          }}
        >
          movement designed
          <br />
          for your reformer
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--ash)", maxWidth: 360 }}>
          Follow-along Pilates programs built specifically for The Pro and The Air.
          Beginner to advanced. Progressive. Purposeful.
        </p>
        <Link href="/training" className="btn-secondary" style={{ marginTop: 48 }}>
          View Training
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {[
          {
            name: "free access",
            desc: "Follow-along videos for The Pro and The Air. Yours from day one.",
            features: ["Equipment-specific programs", "Beginner & intermediate sessions", "New content monthly"],
            price: "Free",
            featured: false,
          },
          {
            name: "ai trainer",
            desc: "Personalized sessions that adapt to your progress, schedule, and goals.",
            features: ["Everything in free", "AI-recommended sessions", "Progress tracking", "Real-time coaching cues"],
            price: "Coming soon",
            featured: true,
          },
        ].map((plan) => (
          <div
            key={plan.name}
            style={{
              padding: "32px 36px",
              background: plan.featured ? "rgba(234,228,218,0.06)" : "var(--iron)",
              border: `0.5px solid ${plan.featured ? "rgba(234,228,218,0.14)" : "rgba(234,228,218,0.06)"}`,
              position: "relative",
            }}
          >
            {plan.featured && (
              <span
                style={{
                  position: "absolute",
                  top: 32,
                  right: 36,
                  fontSize: 9,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: "#253627",
                  color: "#A8C8AA",
                  padding: "3px 8px",
                }}
              >
                Phase 2
              </span>
            )}
            <p style={{ fontSize: 15, fontWeight: 300, textTransform: "lowercase", color: "var(--sand)", marginBottom: 6 }}>
              {plan.name}
            </p>
            <p style={{ fontSize: 12, color: "var(--ash)", lineHeight: 1.65, marginBottom: 20 }}>{plan.desc}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7, marginBottom: 24 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontSize: 11, color: "var(--ash)", letterSpacing: "0.01em", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: plan.featured ? "rgba(234,228,218,0.25)" : "var(--iron)", flexShrink: 0 }}>—</span>
                  {f}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 20, fontWeight: 300, color: "var(--sand)" }}>{plan.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── JOURNAL SECTION ── */
function JournalSection() {
  const articles = [
    {
      cat: "Movement",
      title: "why reformer pilates is the most efficient strength training method",
      excerpt: "It's not just low impact. Reformer Pilates builds functional strength, improves posture, and protects joints — all in a single session.",
    },
    {
      cat: "Equipment",
      title: "the pro vs the air — how to choose your reformer",
      excerpt: "Motor resistance or elastic resistance? Both are precise. Both are premium. The difference comes down to how you train.",
    },
    {
      cat: "Lifestyle",
      title: "building a home studio that earns its space",
      excerpt: "The best home gym is the one you actually use. Here's how to design a space that's both functional and worth showing off.",
    },
  ];

  return (
    <section
      style={{
        background: "var(--paper)",
        borderTop: "0.5px solid rgba(12,12,12,0.08)",
        paddingTop: 80,
      }}
    >
      <div
        style={{
          padding: "0 var(--g) 52px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: 14 }}>Journal</p>
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300,
              textTransform: "lowercase",
              color: "var(--obsidian)",
            }}
          >
            from the lyne journal
          </h2>
        </div>
        <Link
          href="/journal"
          style={{
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--obsidian)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            paddingBottom: 3,
            borderBottom: "0.5px solid rgba(12,12,12,0.2)",
          }}
        >
          All Articles →
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "0.5px solid rgba(12,12,12,0.08)",
        }}
      >
        {articles.map((a, i) => (
          <Link
            key={i}
            href="/journal"
            style={{
              padding: "48px var(--g) 56px",
              borderRight: i < 2 ? "0.5px solid rgba(12,12,12,0.08)" : "none",
              textDecoration: "none",
              display: "block",
            }}
          >
            <p style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ash)", marginBottom: 18 }}>
              {a.cat}
            </p>
            <h3
              style={{
                fontSize: "clamp(15px, 1.3vw, 18px)",
                fontWeight: 300,
                lineHeight: 1.4,
                textTransform: "lowercase",
                color: "var(--obsidian)",
                marginBottom: 14,
              }}
            >
              {a.title}
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--ash)" }}>{a.excerpt}</p>
            <span
              style={{
                marginTop: 28,
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ash)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Read →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroDoors />
      <WorldSection
        variant="dark"
        eyebrow="The Pro"
        headline="smart motor resistance. total control."
        body="The Pro is a professional-grade reformer with variable motor resistance. Precise, silent, and built to perform at every level."
        products={[
          { name: "the pro — standard", price: "EGP 85,000", href: "/the-pro" },
          { name: "the pro — studio bundle", price: "EGP 110,000", href: "/the-pro" },
        ]}
        ctaLabel="Explore The Pro"
        ctaHref="/the-pro"
      />
      <WorldSection
        variant="light"
        eyebrow="The Air"
        headline="elastic resistance. effortless movement."
        body="The Air brings the precision of studio Pilates home. Elastic band resistance creates smooth, joint-friendly tension at every position."
        products={[
          { name: "the air — standard", price: "EGP 45,000", href: "/the-air" },
          { name: "the air — studio bundle", price: "EGP 58,000", href: "/the-air" },
        ]}
        ctaLabel="Explore The Air"
        ctaHref="/the-air"
      />
      <TrainingSection />
      <JournalSection />
    </>
  );
}
