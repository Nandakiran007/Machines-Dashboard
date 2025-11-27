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
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <MachineTable machines={machines} />}
    </div>
  );
}

export default withAuth(Dashboard);
