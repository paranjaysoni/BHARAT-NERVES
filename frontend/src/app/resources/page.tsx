import {
  DataSourceHealth,
  FeaturedResources,
  FutureResourcePipeline,
  IntegrationNotes,
  MvpDataPack,
  RecentResourceUpdates,
  ResourceCategoryGrid,
  ResourceKpiRow,
  ResourcesTable,
  StorageOverview
} from "@/components/resources";
import { PageHeader, StatusBadge } from "@/components/shared";
import {
  dataSourceHealth,
  futureResourcePipeline,
  mvpDataPackItems,
  recentResourceUpdates,
  resourceCategories,
  resources,
  resourcesPage,
  storageOverview
} from "@/data";

export default function ResourcesPage() {
  return (
    <div className="app-page-stack">
      <PageHeader
        title={resourcesPage.title}
        description={resourcesPage.description}
        actions={<StatusBadge label="Resource Library Ready" variant="success" />}
      />
      <ResourceKpiRow
        resources={resources}
        connectedSources={dataSourceHealth.length}
      />

      <div className="app-section-grid xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="app-column-stack">
          <ResourceCategoryGrid
            categories={resourceCategories}
            resources={resources}
          />
          <FeaturedResources resources={resources} />
          <ResourcesTable resources={resources} />
        </div>

        <aside className="app-column-stack">
          <StorageOverview overview={storageOverview} />
          <RecentResourceUpdates updates={recentResourceUpdates} />
          <DataSourceHealth sources={dataSourceHealth} />
          <MvpDataPack items={mvpDataPackItems} />
        </aside>
      </div>

      <div className="app-section-grid xl:grid-cols-[0.85fr_1.15fr]">
        <IntegrationNotes />
        <FutureResourcePipeline integrations={futureResourcePipeline} />
      </div>
    </div>
  );
}
