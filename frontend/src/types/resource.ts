export type ResourceType =
  | "dataset"
  | "document"
  | "map"
  | "research-paper"
  | "government-guideline";

export type ResourceStatus = "ready" | "mocked" | "planned" | "static" | "review";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  category: string;
  owner: string;
  source: string;
  updatedDate: string;
  format: string;
  status: ResourceStatus;
  description: string;
  featured?: boolean;
}
