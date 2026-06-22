import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  const iron = "rgba(12,12,12,0.08)";
  const ash  = "var(--ash)";
  const obs  = "var(--obsidian)";
  const sec  = (c: string) => `0.5px solid ${c}`;

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs, minHeight: "100vh" }}>

      <div style={{ padding: "80px var(--g) 64px", borderBottom: sec(iron) }}>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: ash, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 32, height: "0.5px", background: ash, display: "inline-block" }}/>
          Cart
        </div>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: obs }}>Your cart is empty.</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: sec(iron) }}>
        <div style={{ padding: "72px var(--g)", borderRight: sec(iron) }}>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: ash, maxWidth: "44ch", marginBottom: 48 }}>
            You haven&rsquo;t added anything yet. Browse our reformers or essentials to get started.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/the-pro" className="btn-primary">The Pro</Link>
            <Link href="/the-air" className="btn-primary">The Air</Link>
          </div>
        </div>
        <div style={{ padding: "72px var(--g)" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, marginBottom: 32 }}>Order summary</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: sec(iron) }}>
            <span style={{ fontSize: 13, color: ash }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 300, color: obs }}>EGP 0</span>
          </div>
          <button disabled style={{
            marginTop: 24, width: "100%", height: 52, border: "none",
            background: "rgba(12,12,12,0.1)", color: ash,
            fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
            cursor: "not-allowed",
          }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
