export type AlertSeverity = "info" | "warning" | "danger" | "critical";

export interface AegisAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  timestamp: string;
  description: string;
  affectedArea: string;
}
