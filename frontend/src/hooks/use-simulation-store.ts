"use client";

import { useEffect, useState } from "react";
import { getStore, subscribeToStore, INITIAL_STATE, type SimulationStore } from "@/lib/simulation-store";

export function useSimulationStore(): SimulationStore {
  // Always initialize with server-safe initial state for first render
  const [state, setState] = useState<SimulationStore>(INITIAL_STATE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(getStore()); // Catch up to persisted state
    const unsub = subscribeToStore(() => setState(getStore()));
    return unsub;
  }, []);

  // Return initial state during SSR and hydration to prevent mismatch
  return mounted ? state : INITIAL_STATE;
}
