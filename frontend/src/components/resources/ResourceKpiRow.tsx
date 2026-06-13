import {
  Archive,
  Database,
  FileText,
  FolderOpen,
  Map,
  PlugZap
} from "lucide-react";

import { MetricCard } from "@/components/shared";
import type { Resource } from "@/types";

interface ResourceKpiRowProps {
  resources: Resource[];
  connectedSources: number;
}

export function ResourceKpiRow({
  resources,
  connectedSources
}: ResourceKpiRowProps) {
  const datasetCount = resources.filter((resource) => resource.type === "dataset").length;
  const documentCount = resources.filter((resource) =>
    ["document", "government-guideline", "research-paper"].includes(resource.type)
  ).length;
  const mapCount = resources.filter((resource) => resource.type === "map").length;
  const reportCount = resources.filter((resource) => resource.category === "Reports").length;

  return (
    <div className="app-kpi-grid md:grid-cols-2 xl:grid-cols-6">
      <MetricCard
        title="Total Resources"
        value={String(resources.length)}
        subtitle="Library items"
        icon={<Archive className="h-4 w-4" aria-hidden="true" />}
        status="info"
      />
      <MetricCard
        title="Datasets"
        value={String(datasetCount)}
        subtitle="Structured inputs"
        icon={<Database className="h-4 w-4" aria-hidden="true" />}
        status="success"
      />
      <MetricCard
        title="Documents"
        value={String(documentCount)}
        subtitle="Guides and references"
        icon={<FileText className="h-4 w-4" aria-hidden="true" />}
        status="neutral"
      />
      <MetricCard
        title="Maps"
        value={String(mapCount)}
        subtitle="Static layers"
        icon={<Map className="h-4 w-4" aria-hidden="true" />}
        status="warning"
      />
      <MetricCard
        title="Reports"
        value={String(reportCount)}
        subtitle="Research packs"
        icon={<FolderOpen className="h-4 w-4" aria-hidden="true" />}
        status="neutral"
      />
      <MetricCard
        title="Connected Sources"
        value={String(connectedSources)}
        subtitle="Mock or planned"
        icon={<PlugZap className="h-4 w-4" aria-hidden="true" />}
        status="info"
      />
    </div>
  );
}
