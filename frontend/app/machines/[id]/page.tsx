"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import LogoutButton from "@/components/LogoutButton";

import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {MachineContext}  from "@/components/MachineProvider";

function MachineDetails() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  const { machines, loading, error } = useContext(MachineContext);
  const machine = machines.find((m) => m.id === id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!machine) return <p>No machine found.</p>;

  const chartData = machine?.temperatureHistory?.map((h) => ({ temp: h.value, time: h.updatedAt })) ?? [];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 4 }}>
        <button style={{ cursor: "pointer" }} onClick={() => router.back()}>&larr; Back</button>
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
  );
}

export default withAuth(MachineDetails);
