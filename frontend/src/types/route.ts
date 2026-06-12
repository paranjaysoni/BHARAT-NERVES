export type AegisRouteStatus =
  | "clear"
  | "watch"
  | "congested"
  | "blocked"
  | "rerouted";

export interface AegisRoute {
  id: string;
  source: string;
  destination: string;
  distance: string;
  estimatedTime: string;
  status: AegisRouteStatus;
}
