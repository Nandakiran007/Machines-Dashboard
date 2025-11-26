"use client";

import { Machine } from "@/types/machine";
import { useRouter } from "next/navigation";

interface Props {
  machines: Machine[];
}

export default function MachineTable({ machines }: Props) {
  const router = useRouter();

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={th}>Name</th>
          <th style={th}>Status</th>
          <th style={th}>Temp (°C)</th>
          <th style={th}>Energy (kWh)</th>
        </tr>
      </thead>
      <tbody>
        {machines.map((m) => (
          <tr
            key={m.id}
            onClick={() => router.push(`/machines/${m.id}`)}
            style={{ cursor: "pointer" }}
          >
            <td style={td}>{m.name}</td>
            <td style={td}>{m.status}</td>
            <td style={td}>{m.temperature}</td>
            <td style={td}>{m.energyConsumption}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "1px solid #ddd",
};

const td: React.CSSProperties = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};
