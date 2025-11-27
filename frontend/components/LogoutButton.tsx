"use client";

import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { MachineContext } from "./MachineProvider";



export default function LogoutButton() {
  const router = useRouter();
  

  const handleLogout = useCallback(async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.replace("/login");
  }, [router]);

  return (
    <button
      onClick={handleLogout}
      aria-label="Logout"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 6,
        border: "1px solid #ddd",
        background: "white",
        cursor: "pointer",
      }}
    >
      <div style={{ color: "#171717" }}>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </div>

      <p style={{ color: "#171717" }}>Logout</p>
    </button>
  );
}
