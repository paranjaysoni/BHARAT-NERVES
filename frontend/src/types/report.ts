export type ReportStatus = "draft" | "review" | "published" | "archived";
export type ReportPriority = "low" | "medium" | "high" | "critical";
export type ReportCategory =
  | "Crisis"
  | "Trade"
  | "Impact"
  | "AI Parliament"
  | "Carbon"
  | "Infrastructure"
  | "Logistics"
  | "Executive Briefing"
  | "Risk"
  | "Health"
  | "Policy"
  | "Environment"
  | "Operations"
  | "Technology"
  | "Baseline"
  | "Transport"
  | "Relief"
  | "Ports"
  | "Response";

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  author: string;
  createdDate: string;
  status: ReportStatus;
  priority: ReportPriority;
  version: string;
  executiveSummary: string;
  keyFindings: string[];
  recommendations: string[];
}

export interface ReportCategoryCard {
  id: string;
  title: string;
  count: number;
  description: string;
  status: "active" | "pending" | "review";
}

export interface ReportActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface FeaturedBrief {
  title: string;
  subtitle: string;
  summary: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  recommendation: string;
}

export interface FutureReportingItem {
  id: string;
  name: string;
  description: string;
  status: "planned";
}
