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
      <button style={logoutButton} onClick={handleLogout} aria-label="Logout">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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

          <span>Logout</span>
      </button>
  );
}

const logoutButton: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "var(--foreground)",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background 0.2s, transform 0.1s",
};
