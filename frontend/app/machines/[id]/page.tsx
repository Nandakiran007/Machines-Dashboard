"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/axios";
import AuthWrapper from "@/components/AuthWrapper";
import LogoutButton from "@/components/LogoutButton";
import { Machine } from "@/types/machine";

import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MachineDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [machine, setMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get(`/machines/${id}`)
      .then((res) => {
        setMachine(res.data);
        setError("");
      })
      .catch((e: any) => {
        const msg = e?.response?.data?.message || e?.message || "Failed to load machine";
        console.error(msg, e);
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!machine) return <p>No machine found.</p>;

  const chartData =
    machine?.temperatureHistory?.map((h) => ({ temp: h.value, time: h.updatedAt })) ?? [];

  return (
    <AuthWrapper>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",padding:4 }}>
          
            <button style={{cursor: "pointer"}} onClick={() => router.back()}>&larr; Back</button>
    

          <LogoutButton />
        </div>

        <h2>{machine.name}</h2>

        <p>Status: {machine.status}</p>
        <p>Temperature: {machine.temperature}</p>
        <p>Energy: {machine.energyConsumption}</p>

        <h3 style={{ marginTop: 20 }}>Temperature Trend</h3>

        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AuthWrapper>
  );
}
