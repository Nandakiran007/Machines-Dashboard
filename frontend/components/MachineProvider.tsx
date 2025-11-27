"use client";

import { Machine } from "@/types/machine";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import api from "@/utils/axios";
import { io, Socket } from "socket.io-client";
type MachineContextValue = {
  machines: Machine[];
  loading:boolean;
  error:string;
};

export const MachineContext = createContext<MachineContextValue>({
  machines: [],
  loading:false,
  error:"",
});

export function MachineContextProvider({ children }: { children: React.ReactNode }) {
  
    const [machines, setMachines] = useState<Machine[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        setLoading(true);
        api
        .get("/machines")
        .then((res) => {
            setMachines(res.data || []);
            console.log("Fetched machines:", res.data);
        })
        .catch((e: any) => {
            const msg = e?.response?.data?.message || e?.message || "Error fetching machines";
            console.error(msg, e);
            setError(msg);
        })
        .finally(() => setLoading(false));
    }, []);




    const socketRef = useRef<Socket | null>(null);

  const disconnect =useCallback( () => {
    const s = socketRef.current;
    if (!s) return;
    try {
        console.log("Disconnecting socket");
      s.disconnect();
    } catch (e) {
      console.log("Error disconnecting socket", e);
    }finally{
        socketRef.current = null;
    }
  },[]);
console.log("MachineProvider mounted");
  useEffect(() => {
    const WS_URL = typeof window !== "undefined" && (process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001");
    if (!WS_URL) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const s = io(WS_URL, {
      transports: ["websocket", "polling"],
    });

    socketRef.current = s;

    s.on("connect", () => {
      console.log("Socket connected:");
    });
    s.on("machine.readings.updated", (payload:any) => {
       
        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine.id === payload.id ? { ...machine, ...payload } : machine
          )
        );
       });


    return () => {
      disconnect();
    };
  }, [disconnect]);

  



  const value = useMemo(() => ({ machines, loading, error }), [machines, loading, error]);

  return <MachineContext.Provider value={value}>{children}</MachineContext.Provider>;
}

export default MachineContextProvider;
