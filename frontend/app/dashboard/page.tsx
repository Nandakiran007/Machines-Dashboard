"use client";

import api from "@/utils/axios";
import { Machine } from "@/types/machine";
import MachineTable from "@/components/MachineTable";
import AuthWrapper from "@/components/AuthWrapper";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/machines")
      .then((res) => {
        setMachines(res.data || []);
      })
      .catch((e: any) => {
        const msg = e?.response?.data?.message || e?.message || "Error fetching machines";
        console.error(msg, e);
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthWrapper>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Dashboard</h1>
          <LogoutButton />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && <MachineTable machines={machines} />}
      </div>
    </AuthWrapper>
  );
}
