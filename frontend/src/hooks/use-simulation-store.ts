"use client";

import { useEffect, useState } from "react";
import { getStore, subscribeToStore, type SimulationStore } from "@/lib/simulation-store";

export function useSimulationStore(): SimulationStore {
  const [state, setState] = useState<SimulationStore>(getStore);

  useEffect(() => {
    // Sync on mount in case state changed between render and effect
    setState(getStore());
    const unsub = subscribeToStore(() => setState(getStore()));
    return unsub;
  }, []);

  return state;
}
