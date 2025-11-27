const statusColor: Record<any, string> = {
    Running: "#4ADE80",
    Idle: "#E5E7EB",
    Stopped: "#EF4444",
};

export function StatusBadge({ status }: { status: string }) {
    const color = statusColor[status] || "#ffffff";

    return (
        <div style={badgeWrapper}>
            <span style={{ ...dotStyle, background: color }}></span>
            <span>{status}</span>
        </div>
    );
}

const badgeWrapper: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "0.95rem",
    gap: 8,
};

const dotStyle: React.CSSProperties = {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 0 6px rgba(0,0,0,0.3)",
};
