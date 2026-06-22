"use client";

import { useState } from "react";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

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

  return (
    <div style={{ paddingTop: "var(--nav-h)", background: "var(--paper)", color: obs, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 440, padding: "64px 0" }}>

        {/* Tabs */}
        <div style={{ display: "flex", border: sec(iron), marginBottom: 48 }}>
          {(["login", "register"] as const).map((t, i) => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer",
              border: "none", borderRight: i === 0 ? sec(iron) : "none",
              background: tab === t ? obs : "transparent",
              color: tab === t ? "var(--sand)" : ash,
              transition: "background 200ms, color 200ms",
            }}>{t === "login" ? "Sign In" : "Create Account"}</button>
          ))}
        </div>

        <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {tab === "register" && (
            <div>
              <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Full Name</label>
              <input type="text" required placeholder="Your name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = obs)}
                onBlur={e => (e.currentTarget.style.borderColor = iron)}
              />
            </div>
          )}
          <div>
            <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Email</label>
            <input type="email" required placeholder="your@email.com" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = obs)}
              onBlur={e => (e.currentTarget.style.borderColor = iron)}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: ash, display: "block", marginBottom: 8 }}>Password</label>
            <input type="password" required placeholder="••••••••" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = obs)}
              onBlur={e => (e.currentTarget.style.borderColor = iron)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: 8, width: "100%" }}>
            {tab === "login" ? "Sign In →" : "Create Account →"}
          </button>
          {tab === "login" && (
            <a href="#" style={{ fontSize: 11, color: ash, textDecoration: "none", textAlign: "center", letterSpacing: "0.04em", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = obs)}
              onMouseLeave={e => (e.currentTarget.style.color = ash)}
            >Forgot password?</a>
          )}
        </form>

        <p style={{ marginTop: 40, fontSize: 12, color: ash, textAlign: "center", lineHeight: 1.75 }}>
          {tab === "login"
            ? <>No account? <button onClick={() => setTab("register")} style={{ background: "none", border: "none", color: obs, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>Create one.</button></>
            : <>Already have an account? <button onClick={() => setTab("login")} style={{ background: "none", border: "none", color: obs, cursor: "pointer", fontSize: 12, textDecoration: "underline" }}>Sign in.</button></>
          }
        </p>
      </div>
    </div>
  );
}
