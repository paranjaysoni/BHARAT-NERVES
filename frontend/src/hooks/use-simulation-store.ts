"use client";

import { useEffect, useState } from "react";
import { getStore, subscribeToStore, type SimulationStore } from "@/lib/simulation-store";

export function useSimulationStore(): SimulationStore {
  // Initialize from the module-level store (already hydrated from localStorage on client)
  const [state, setState] = useState<SimulationStore>(getStore);

  useEffect(() => {
    const unsub = subscribeToStore(() => setState(getStore()));
    return unsub;
  }, []);

  return state;
}
