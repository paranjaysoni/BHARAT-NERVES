export type ResourceType =
  | "dataset"
  | "document"
  | "map"
  | "research-paper"
  | "government-guideline";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  source: string;
  updatedDate: string;
  format: string;
}
