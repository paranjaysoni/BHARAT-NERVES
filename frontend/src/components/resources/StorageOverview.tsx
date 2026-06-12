import { Database, FolderArchive, Layers, RefreshCw } from "lucide-react";

import { ProgressBar, SectionCard } from "@/components/shared";
import type { StorageOverview as StorageOverviewData } from "@/data";

interface StorageOverviewProps {
  overview: StorageOverviewData;
}

export function StorageOverview({ overview }: StorageOverviewProps) {
  return (
    <SectionCard title="Storage Overview" description="Mock repository capacity summary.">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Storage Used</span>
            <span className="font-medium text-foreground">
              {overview.storageUsed} / {overview.totalCapacity}
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar value={24} variant="info" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border bg-background p-3">
            <Database className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="mt-2 text-lg font-semibold text-foreground">
              {overview.datasetCount}
            </p>
            <p className="text-xs text-muted-foreground">Datasets</p>
          </div>
          <div className="rounded-md border border-border bg-background p-3">
            <FolderArchive className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="mt-2 text-lg font-semibold text-foreground">
              {overview.documentCount}
            </p>
            <p className="text-xs text-muted-foreground">Documents</p>
          </div>
          <div className="rounded-md border border-border bg-background p-3">
            <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="mt-2 text-lg font-semibold text-foreground">
              {overview.mapLayers}
            </p>
            <p className="text-xs text-muted-foreground">Map Layers</p>
          </div>
          <div className="rounded-md border border-border bg-background p-3">
            <RefreshCw className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold text-foreground">
              {overview.lastSync}
            </p>
            <p className="text-xs text-muted-foreground">Last Sync</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
