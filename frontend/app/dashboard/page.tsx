"use client";


import { Machine } from "@/types/machine";
import MachineTable from "@/components/MachineTable";
import withAuth from "@/components/withAuth";
import LogoutButton from "@/components/LogoutButton";
import { useContext, useEffect, useState } from "react";
import  {MachineContext}  from "@/components/MachineProvider";

function Dashboard() {
  const { machines, loading, error } = useContext(MachineContext);

  return (
      <div style={dashboardWrapper}>
          <div style={headerRow}>
              <h1 style={titleStyle}>Dashboard</h1>
              <LogoutButton />
          </div>

          {loading && <p style={infoText}>Loading...</p>}
          {error && <p style={errorText}>{error}</p>}

          {!loading && !error && <MachineTable machines={machines} />}
      </div>
  );
}

export default withAuth(Dashboard);

const dashboardWrapper: React.CSSProperties = {
    padding: "2rem",
    maxWidth: 1200,
    margin: "0 auto",
};

const headerRow: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
};

const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 600,
    color: "var(--foreground)",
};

const infoText: React.CSSProperties = {
    opacity: 0.7,
};

const errorText: React.CSSProperties = {
    color: "tomato",
    fontWeight: 500,
};

