"use client";

import { useContext } from "react";
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
import { MachineContext } from "@/components/MachineProvider";

function MachineDetails() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params?.id);
    const { machines, loading, error } = useContext(MachineContext);

    const machine = machines.find((m) => m.id === id);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!machine) return <p>No machine found.</p>;

    const chartData =
        machine?.temperatureHistory?.map((h) => ({
            temp: h.value,
            time: h.updatedAt,
            timeLabel: new Date(h.updatedAt).toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                day: "2-digit",
                month: "short",
            }),
        })) ?? [];

    return (
        <div style={wrapper}>
            <div style={headerRow}>
                <button style={backButton} onClick={() => router.back()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--foreground)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ marginRight: 6 }}
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back
                </button>
                <LogoutButton />
            </div>

            <div style={card}>
                <h2 style={title}>{machine.name}</h2>

                <div style={infoRow}>
                    <p>
                        <strong>Status:</strong> {machine.status}
                    </p>
                    <p>
                        <strong>Temperature:</strong> {machine.temperature}°C
                    </p>
                    <p>
                        <strong>Energy:</strong> {machine.energyConsumption} kWh
                    </p>
                </div>

                <h3 style={subTitle}>Temperature Trend</h3>

                <div style={chartContainer}>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 20,
                                bottom: 30,
                                left: 30,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                opacity={0.2}
                            />

                          
                            <XAxis
                                dataKey="timeLabel"
                                tick={{
                                    fill: "var(--foreground)",
                                    fontSize: 12,
                                }}
                                angle={-25}
                                textAnchor="end"
                            />

                            
                            <YAxis
                                tick={{ fill: "var(--foreground)" }}
                                domain={["auto", "auto"]}
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "rgba(0,0,0,0.7)",
                                    borderRadius: 8,
                                    border: "none",
                                    color: "white",
                                }}
                                labelStyle={{ color: "white" }}
                            />

                            <Line
                                type="monotone"
                                dataKey="temp"
                                stroke="var(--foreground)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default withAuth(MachineDetails);

const wrapper: React.CSSProperties = {
    padding: "1.5rem",
    maxWidth: 1100,
    margin: "0 auto",
};

const headerRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
};

const backButton: React.CSSProperties = {
    cursor: "pointer",
    background: "transparent",
    color: "var(--foreground)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: "0.9rem",
    transition: "background 0.2s, border 0.2s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "1.8rem",
    borderRadius: 14,
    boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
    backdropFilter: "blur(10px)",
};

const title: React.CSSProperties = {
    marginTop: 0,
    marginBottom: 10,
    fontSize: "1.6rem",
    color: "var(--foreground)",
};

const subTitle: React.CSSProperties = {
    marginTop: 30,
    marginBottom: 16,
    fontSize: "1.2rem",
    fontWeight: 600,
};

const infoRow: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginBottom: "1.2rem",
    fontSize: "1rem",
};

const chartContainer: React.CSSProperties = {
    marginTop: 5,
    paddingBottom: 10,
};
