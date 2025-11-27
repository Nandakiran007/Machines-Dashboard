"use client";

import { Machine } from "@/types/machine";
import { useRouter } from "next/navigation";
import { StatusBadge } from "./StatusBadge";

interface Props {
  machines: Machine[];
}

export default function MachineTable({ machines }: Props) {
  const router = useRouter();

  return (
      <div style={tableCard}>
          <table style={tableStyle}>
              <thead>
                  <tr>
                      <th style={th}>Name</th>
                      <th style={th}>Status</th>
                      <th style={th}>Temp (°C)</th>
                      <th style={th}>Energy (kWh)</th>
                  </tr>
              </thead>

              <tbody>
                  {machines.map((m,index) =>{ 
                    const isLast = index === machines.length - 1;
                    return (
                      <tr
                          key={m.id}
                          onClick={() => router.push(`/machines/${m.id}`)}
                          style={trClickable}
                      >
                          <td
                              style={{
                                  ...td,
                                  borderBottom: isLast
                                      ? "none"
                                      : td.borderBottom,
                              }}
                          >
                              {m.name}
                          </td>
                          <td
                              style={{
                                  ...td,
                                  borderBottom: isLast
                                      ? "none"
                                      : td.borderBottom,
                              }}
                          >
                              <StatusBadge status={m.status} />
                          </td>
                          <td
                              style={{
                                  ...td,
                                  borderBottom: isLast
                                      ? "none"
                                      : td.borderBottom,
                              }}
                          >
                              {m.temperature}
                          </td>
                          <td
                              style={{
                                  ...td,
                                  borderBottom: isLast
                                      ? "none"
                                      : td.borderBottom,
                              }}
                          >
                              {m.energyConsumption}
                          </td>
                      </tr>
                  )})}
              </tbody>
          </table>
      </div>
  );
}

const tableCard: React.CSSProperties = {
    padding: "1rem",
    borderRadius: 12,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
};

const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
};

const th: React.CSSProperties = {
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    fontWeight: 600,
    color: "var(--foreground)",
};

const td: React.CSSProperties = {
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    color: "var(--foreground)",
};

const trClickable: React.CSSProperties = {
    cursor: "pointer",
    transition: "background 0.2s",
};

