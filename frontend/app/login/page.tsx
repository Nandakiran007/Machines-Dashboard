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
    <div style={{ maxWidth: 400, margin: "4rem auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

        {err && <p style={{ color: "red" }}>{err}</p>}

        <button style={{ marginTop: 10 }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const inputBox: React.CSSProperties = {
  padding: 8,
  width: "100%",
  marginTop: 10,
};
