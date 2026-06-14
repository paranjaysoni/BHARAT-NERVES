"use client";

import type { SimulationResult } from "@/types/simulation.types";
import type { AIParliamentSession } from "@/types/ai-parliament.types";
import type { CrisisCommanderPlan } from "@/types/crisis-commander.types";

export type SimulationPhase = "idle" | "running" | "done" | "error";

export interface SimulationStore {
  phase: SimulationPhase;
  activeScenarioId: string | null;
  activeSimulationId: string | null;
  result: SimulationResult | null;
  parliament: AIParliamentSession | null;
  commanderPlan: CrisisCommanderPlan | null;
  error: string | null;
  isParliamentLoading: boolean;
  isCommanderLoading: boolean;
  lastUpdatedAt: string | null;
}

const CHANGE_EVENT = "simulation-store-change";
const LS_KEY = "project-aegis-simulation-state";

const INITIAL_STATE: SimulationStore = {
  phase: "idle",
  activeScenarioId: null,
  activeSimulationId: null,
  result: null,
  parliament: null,
  commanderPlan: null,
  error: null,
  isParliamentLoading: false,
  isCommanderLoading: false,
  lastUpdatedAt: null,
};

// ── localStorage helpers ──────────────────────────────────────────────────────

type PersistedSlice = Pick<
  SimulationStore,
  | "phase"
  | "activeScenarioId"
  | "activeSimulationId"
  | "result"
  | "parliament"
  | "commanderPlan"
  | "lastUpdatedAt"
>;

function loadFromStorage(): SimulationStore {
  if (typeof window === "undefined") return { ...INITIAL_STATE };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { ...INITIAL_STATE };
    const persisted = JSON.parse(raw) as PersistedSlice;
    // Rehydrate — loading flags always start false after a refresh
    return {
      ...INITIAL_STATE,
      phase: persisted.phase === "running" ? "idle" : persisted.phase,
      activeScenarioId: persisted.activeScenarioId ?? null,
      activeSimulationId: persisted.activeSimulationId ?? null,
      result: persisted.result ?? null,
      parliament: persisted.parliament ?? null,
      commanderPlan: persisted.commanderPlan ?? null,
      lastUpdatedAt: persisted.lastUpdatedAt ?? null,
    };
  } catch {
    return { ...INITIAL_STATE };
  }
}

function saveToStorage(state: SimulationStore) {
  if (typeof window === "undefined") return;
  try {
    const persisted: PersistedSlice = {
      phase: state.phase,
      activeScenarioId: state.activeScenarioId,
      activeSimulationId: state.activeSimulationId,
      result: state.result,
      parliament: state.parliament,
      commanderPlan: state.commanderPlan,
      lastUpdatedAt: state.lastUpdatedAt,
    };
    window.localStorage.setItem(LS_KEY, JSON.stringify(persisted));
  } catch {
    // Storage quota exceeded or unavailable — silently ignore
  }
}

function clearStorage() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}

// ── Singleton state ───────────────────────────────────────────────────────────

let _state: SimulationStore = { ...INITIAL_STATE };

// Hydrate from localStorage on module load (client only)
if (typeof window !== "undefined") {
  _state = loadFromStorage();
}

// ── EventTarget emitter ───────────────────────────────────────────────────────

const _emitter: EventTarget =
  typeof window !== "undefined"
    ? new EventTarget()
    : ({
        dispatchEvent: () => false,
        addEventListener: () => {},
        removeEventListener: () => {},
      } as unknown as EventTarget);

function _notify() {
  _emitter.dispatchEvent(new Event(CHANGE_EVENT));
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function setSimulationRunning(scenarioId: string) {
  _state = {
    ..._state,
    phase: "running",
    activeScenarioId: scenarioId,
    error: null,
    result: null,
    parliament: null,
    commanderPlan: null,
    isParliamentLoading: false,
    isCommanderLoading: false,
    lastUpdatedAt: new Date().toISOString(),
  };
  saveToStorage(_state);
  _notify();
}

export function setSimulationDone(result: SimulationResult) {
  _state = {
    ..._state,
    phase: "done",
    result,
    activeSimulationId: result.simulationId,
    error: null,
    lastUpdatedAt: new Date().toISOString(),
  };
  saveToStorage(_state);
  _notify();
}

export function setSimulationError(message: string) {
  _state = {
    ..._state,
    phase: "error",
    error: message,
    lastUpdatedAt: new Date().toISOString(),
  };
  saveToStorage(_state);
  _notify();
}

export function setParliamentLoading(loading: boolean) {
  _state = { ..._state, isParliamentLoading: loading };
  _notify();
}

export function setCommanderLoading(loading: boolean) {
  _state = { ..._state, isCommanderLoading: loading };
  _notify();
}

export function setParliamentSession(session: AIParliamentSession) {
  _state = {
    ..._state,
    parliament: session,
    isParliamentLoading: false,
    lastUpdatedAt: new Date().toISOString(),
  };
  saveToStorage(_state);
  _notify();
}

export function setCommanderPlan(plan: CrisisCommanderPlan) {
  _state = {
    ..._state,
    commanderPlan: plan,
    isCommanderLoading: false,
    lastUpdatedAt: new Date().toISOString(),
  };
  saveToStorage(_state);
  _notify();
}

export function resetSimulation() {
  _state = { ...INITIAL_STATE };
  clearStorage();
  _notify();
}

// ── Read ──────────────────────────────────────────────────────────────────────

export function getStore(): Readonly<SimulationStore> {
  return _state;
}

export function subscribeToStore(listener: () => void): () => void {
  _emitter.addEventListener(CHANGE_EVENT, listener);
  return () => _emitter.removeEventListener(CHANGE_EVENT, listener);
}
