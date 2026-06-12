export type ReportStatus = "draft" | "review" | "published" | "archived";

export interface Report {
  id: string;
  title: string;
  category: string;
  createdDate: string;
  author: string;
  status: ReportStatus;
  fileSize: string;
}
