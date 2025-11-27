"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MachineContextProvider from "./MachineProvider";

export default function withAuth<P extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthWrapper(props: P) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      const token =  localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        return;
      }
      setChecked(true);
    }, []);

    if (!checked) return null;

    return (
      <MachineContextProvider>
        <WrappedComponent {...props} />
      </MachineContextProvider>
    );
  };
}
