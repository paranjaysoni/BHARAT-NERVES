"use client";

/**
 * Module-level simulation store — no Zustand, no Context.
 * Components subscribe via addEventListener / removeEventListener on the store's
 * event target, or use the `useSimulationStore` hook.
 */

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
}

const CHANGE_EVENT = "simulation-store-change";

let _state: SimulationStore = {
  phase: "idle",
  activeScenarioId: null,
  activeSimulationId: null,
  result: null,
  parliament: null,
  commanderPlan: null,
  error: null,
};

// Use a globally-shared EventTarget so all hook instances see the same changes.
// Fallback for SSR (EventTarget not available during server render).
const _emitter: EventTarget =
  typeof window !== "undefined" ? new EventTarget() : ({ dispatchEvent: () => false, addEventListener: () => {}, removeEventListener: () => {} } as unknown as EventTarget);

function _notify() {
  _emitter.dispatchEvent(new Event(CHANGE_EVENT));
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function setSimulationRunning(scenarioId: string) {
  _state = { ..._state, phase: "running", activeScenarioId: scenarioId, error: null, result: null, parliament: null, commanderPlan: null };
  _notify();
}

export function setSimulationDone(result: SimulationResult) {
  _state = { ..._state, phase: "done", result, activeSimulationId: result.simulationId, error: null };
  _notify();
}

export function setSimulationError(message: string) {
  _state = { ..._state, phase: "error", error: message };
  _notify();
}

export function setParliamentSession(session: AIParliamentSession) {
  _state = { ..._state, parliament: session };
  _notify();
}

export function setCommanderPlan(plan: CrisisCommanderPlan) {
  _state = { ..._state, commanderPlan: plan };
  _notify();
}

export function resetSimulation() {
  _state = { phase: "idle", activeScenarioId: null, activeSimulationId: null, result: null, parliament: null, commanderPlan: null, error: null };
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
