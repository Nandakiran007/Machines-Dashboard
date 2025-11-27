"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const payload = { email, password };
      const res = await api.post("/login", payload);
      const token = res?.data?.access_token;
      localStorage.setItem("token", token);
      router.push("/dashboard");

    } catch (error: any) {
      const msg =
        error?.response?.data?.message || error?.message || "Login failed";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div style={wrapperStyle}>
          <div style={cardStyle}>
              <h2 style={titleStyle}>Your Dashboard Awaits</h2>
              <p style={subtitleStyle}> Login to continue</p>

              <form onSubmit={handleSubmit} style={formStyle}>
                  <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputBox}
                  />

                  <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputBox}
                  />

                  {err && <p style={errorStyle}>{err}</p>}

                  <button style={buttonStyle} disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                  </button>
              </form>
          </div>
      </div>
  );
}

const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
    boxSizing: "border-box",
};


const wrapperStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "var(--background)",
    padding: "1rem",
};

const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 380,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 12,
    padding: "2rem",
    boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
};

const titleStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: 6,
    fontSize: "1.6rem",
    fontWeight: 600,
    color: "var(--foreground)",
};

const subtitleStyle: React.CSSProperties = {
    margin: 0,
    marginBottom: 24,
    opacity: 0.7,
    fontSize: "0.9rem",
    color: "var(--foreground)",
};

const inputBox: React.CSSProperties = {
    padding: "10px 12px",
    width: "100%",
    marginTop: 12,
    fontSize: "0.95rem",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.07)",
    color: "var(--foreground)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s",
};

const buttonStyle: React.CSSProperties = {
    marginTop: 20,
    width: "100%",
    padding: "10px 12px",
    background: "var(--foreground)",
    color: "var(--background)",
    border: "none",
    borderRadius: 8,
    fontSize: "1rem",
    fontWeight: 600,
    boxSizing: "border-box",
    cursor: "pointer",  
    transition: "opacity 0.2s, transform 0.1s",
};

const errorStyle: React.CSSProperties = {
    color: "tomato",
    marginTop: 10,
    marginBottom: 0,
    fontSize: "0.9rem",
};
