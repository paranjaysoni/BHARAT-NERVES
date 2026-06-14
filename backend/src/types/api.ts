export interface HealthData {
  status: "ok" | "degraded" | "down";
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}
