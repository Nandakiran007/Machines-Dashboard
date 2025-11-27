"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MachineContextProvider from "@/components/MachineProvider";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.replace("/login");
  }, []);

  return <MachineContextProvider>{children}</MachineContextProvider>;
}
