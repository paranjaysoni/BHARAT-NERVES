import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  ChevronRight,
  Database,
  Download,
  FileArchive,
  FileBarChart,
  FileText,
  Filter,
  Globe2,
  MapPinned,
  MoreVertical,
  ShieldCheck
} from "lucide-react";
import clsx from "clsx";
import { PageHeader, SearchField, Tooltip } from "@/components/shared";

const categories = [
  {
    icon: Database,
    label: "Datasets",
    count: "1,248",
    sublabel: "Datasets",
    status: "Updated today",
    tone: "info"
  },
  {
    icon: FileText,
    label: "Documents",
    count: "3,562",
    sublabel: "Documents",
    status: "Updated today",
    tone: "success"
  },
  {
    icon: FileBarChart,
    label: "Reports & Briefs",
    count: "842",
    sublabel: "Reports",
    status: "Updated yesterday",
    tone: "purple"
  },
  {
    icon: MapPinned,
    label: "Maps & Geospatial",
    count: "426",
    sublabel: "Layers",
    status: "Updated today",
    tone: "cyan"
  },
  {
    icon: Box,
    label: "Models & Tools",
    count: "128",
    sublabel: "Models",
    status: "Updated 3 days ago",
    tone: "warning"
  }
] as const;

const quickAccess = [
  {
    icon: FileArchive,
    title: "National Data Repository",
    description: "Centralized government datasets",
    tone: "info"
  },
  {
    icon: Globe2,
    title: "Global Indicators",
    description: "World Bank, IMF, UN & More",
    tone: "success"
  },
  {
    icon: MapPinned,
    title: "Geospatial Library",
    description: "Maps, Layers & Satellite Data",
    tone: "info"
  },
  {
    icon: BookOpen,
    title: "Policy Documents",
    description: "National Policies & Guidelines",
    tone: "warning"
  },
  {
    icon: FileText,
    title: "Research Papers",
    description: "Journals & Whitepapers",
    tone: "purple"
  }
] as const;

const featuredResources = [
  {
    name: "India Infrastructure Dataset 2024",
    description: "Roads, Railways, Ports, Airports & Utilities",
    category: "Dataset",
    source: "MoRTH",
    updated: "28 Nov 2024",
    size: "245 MB",
    tone: "info"
  },
  {
    name: "Coastal Vulnerability Index Report",
    description: "Risk assessment for all coastal districts",
    category: "Report",
    source: "NIOT",
    updated: "27 Nov 2024",
    size: "18.6 MB",
    tone: "purple"
  },
  {
    name: "Trade Flow Data - Oct 2024",
    description: "Import, Export & Transit Data",
    category: "Dataset",
    source: "DGFT",
    updated: "26 Nov 2024",
    size: "312 MB",
    tone: "info"
  },
  {
    name: "Monsoon Impact Analysis 2024",
    description: "State-wise rainfall & impact assessment",
    category: "Report",
    source: "IMD",
    updated: "25 Nov 2024",
    size: "21.4 MB",
    tone: "purple"
  },
  {
    name: "India Administrative Boundaries",
    description: "State, District, Tehsil & Village Boundaries",
    category: "Geospatial",
    source: "Survey of India",
    updated: "24 Nov 2024",
    size: "89.7 MB",
    tone: "cyan"
  }
] as const;

const recentResources = [
  {
    title: "Air Quality Index - Nov 2024",
    type: "Dataset",
    date: "28 Nov 2024",
    size: "156 MB",
    visual: "heatmap"
  },
  {
    title: "Cyclone Landfall Tracker",
    type: "Tool",
    date: "27 Nov 2024",
    size: "42 MB",
    visual: "cyclone"
  },
  {
    title: "NH-16 Corridor Analysis",
    type: "Report",
    date: "27 Nov 2024",
    size: "12.3 MB",
    visual: "network"
  },
  {
    title: "Port Capacity Utilization",
    type: "Dataset",
    date: "26 Nov 2024",
    size: "98 MB",
    visual: "port"
  },
  {
    title: "Global Economic Outlook",
    type: "Report",
    date: "25 Nov 2024",
    size: "8.7 MB",
    visual: "globe"
  }
] as const;

const storageBreakdown = [
  ["Datasets", "1.12 TB", "bg-primary"],
  ["Documents", "680 GB", "bg-violet-500"],
  ["Maps & Geospatial", "420 GB", "bg-info"],
  ["Models & Tools", "260 GB", "bg-warning"]
] as const;

const sources = ["IMD", "DGFT", "World Bank", "UN"] as const;
const tabs = ["Recent", "Popular", "Recommended", "Shared With Me"] as const;

const panelClass = "surface-card rounded-md p-3.5 text-card-foreground";

export default function ResourcesPage() {
  return (
    <div className="space-y-3.5">
      <PageHeader
        title="RESOURCES"
        description="Access critical data, documents, datasets and knowledge assets"
      />

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-3.5">
          <SearchAndFilters />
          <ResourceCategories />
          <FeaturedResources />
          <RecentlyAdded />
        </div>

        <aside className="space-y-3.5">
          <QuickAccess />
          <StorageOverview />
          <DataSources />
        </aside>
      </section>
    </div>
  );
}

function SearchAndFilters() {
  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_104px]">
      <SearchField
        placeholder="Search resources, documents, datasets..."
        ariaLabel="Search resources"
      />
      <button className="btn btn-outline h-11 justify-start px-4">
        <Filter className="h-4 w-4" />
        Filters
      </button>
    </div>
  );
}

function ResourceCategories() {
  return (
    <Panel title="RESOURCE CATEGORIES">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <article
              key={category.label}
              className="rounded-md border border-border bg-background/55 p-4 shadow-inner shadow-slate-950/10"
            >
              <div className="flex items-start gap-3">
                <div className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-md border", toneClasses[category.tone])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold leading-5 text-foreground">
                    {category.label}
                  </h3>
                  <p className={clsx("mt-2 text-2xl font-semibold leading-7", textClasses[category.tone])}>
                    {category.count}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{category.sublabel}</p>
                  <p className="mt-2 text-[0.68rem] text-muted-foreground">{category.status}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}

function QuickAccess() {
  return (
    <Panel title="QUICK ACCESS">
      <div className="divide-y divide-border/70 rounded-md border border-border bg-background/45 px-3">
        {quickAccess.map((item) => {
          const Icon = item.icon;

          return (
            <button key={item.title} className="grid w-full grid-cols-[36px_1fr_16px] items-center gap-3 py-3 text-left">
              <span className={clsx("flex h-8 w-8 items-center justify-center rounded-md border", toneClasses[item.tone])}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold leading-5 text-foreground">
                  {item.title}
                </span>
                <span className="block truncate text-xs leading-4 text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>
      <PanelLink label="View All Resources" />
    </Panel>
  );
}

function FeaturedResources() {
  return (
    <Panel title="FEATURED RESOURCES">
      <div className="flex gap-8 border-b border-border/70 text-xs">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={clsx(
              "h-8 border-b-2 px-0.5 font-medium",
              index === 0
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-3 overflow-hidden">
        <div className="grid grid-cols-[minmax(260px,1.6fr)_120px_120px_140px_90px_72px] border-b border-border/70 pb-2 text-[0.68rem] text-muted-foreground">
          <span>Name</span>
          <span>Category</span>
          <span>Source</span>
          <span>Last Updated</span>
          <span>Size</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-border/60">
          {featuredResources.map((resource) => (
            <div
              key={resource.name}
              className="grid grid-cols-[minmax(260px,1.6fr)_120px_120px_140px_90px_72px] items-center py-2.5 text-xs"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 text-muted-foreground">
                  {resource.category === "Geospatial" ? <MapPinned className="h-4 w-4" /> : <Database className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium leading-5 text-foreground">
                    {resource.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {resource.description}
                  </span>
                </span>
              </div>
              <span>
                <span className={clsx("inline-flex rounded-md border px-2 py-0.5 text-[0.68rem] font-medium", toneClasses[resource.tone])}>
                  {resource.category}
                </span>
              </span>
              <span className="text-foreground">{resource.source}</span>
              <span className="text-muted-foreground">{resource.updated}</span>
              <span className="text-muted-foreground">{resource.size}</span>
              <span className="flex items-center gap-3 text-muted-foreground">
                <Tooltip label="Download resource">
                  <button className="focus-ring rounded-md p-1 hover:bg-secondary" aria-label={`Download ${resource.name}`}>
                    <Download className="h-4 w-4" />
                  </button>
                </Tooltip>
                <Tooltip label="More actions">
                  <button className="focus-ring rounded-md p-1 hover:bg-secondary" aria-label={`More actions for ${resource.name}`}>
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </Tooltip>
              </span>
            </div>
          ))}
        </div>
      </div>
      <PanelLink label="View All Resources" />
    </Panel>
  );
}

function RecentlyAdded() {
  return (
    <Panel title="RECENTLY ADDED RESOURCES">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {recentResources.map((resource) => (
          <article key={resource.title} className="overflow-hidden rounded-md border border-border bg-background/55">
            <ResourcePreview visual={resource.visual} />
            <div className="p-3">
              <h3 className="truncate text-sm font-semibold leading-5 text-foreground">
                {resource.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-primary">{resource.type}</p>
              <div className="mt-2 flex items-center justify-between gap-2 text-[0.68rem] text-muted-foreground">
                <span>{resource.date}</span>
                <span>{resource.size}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <PanelLink label="View All Recent Resources" />
    </Panel>
  );
}

function StorageOverview() {
  return (
    <Panel title="STORAGE OVERVIEW">
      <p className="text-xs text-muted-foreground">Total Used</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold leading-7 text-foreground">
          2.48 TB <span className="text-sm font-normal text-muted-foreground">/ 10 TB</span>
        </p>
        <p className="text-[0.68rem] text-muted-foreground">24.8%</p>
      </div>
      <div className="mt-3 h-2 rounded-full bg-secondary">
        <div className="h-full w-[24.8%] rounded-full bg-primary" />
      </div>
      <div className="mt-5 space-y-3">
        {storageBreakdown.map(([label, value, color]) => (
          <div key={label} className="flex items-center gap-3 text-xs">
            <span className={clsx("h-2.5 w-2.5 rounded-full", color)} />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{label}</span>
            <span className="font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <PanelLink label="Manage Storage" />
    </Panel>
  );
}

function DataSources() {
  return (
    <Panel title="DATA SOURCES">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Connected Sources</p>
        <p className="text-sm font-semibold text-foreground">28 / 45</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        {sources.map((source, index) => (
          <div key={source} className="flex flex-col items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary/70 text-primary">
              {index === 0 ? <ShieldCheck className="h-5 w-5" /> : index === 1 ? <BarChart3 className="h-5 w-5" /> : <Globe2 className="h-5 w-5" />}
            </div>
            <span className="text-[0.68rem] text-muted-foreground">{source}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground">
            +24
          </div>
          <span className="text-[0.68rem] text-transparent">More</span>
        </div>
      </div>
      <PanelLink label="View All Sources" />
    </Panel>
  );
}

function Panel({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={panelClass}>
      <div className="mb-3 flex min-h-7 items-center justify-between border-b border-border/70 pb-3">
        <h2 className="text-sm font-semibold uppercase leading-5 text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function PanelLink({ label }: { label: string }) {
  return (
    <button className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-md border border-border bg-background/60 text-xs font-medium text-primary hover:bg-secondary">
      {label}
      <ArrowRight className="h-3.5 w-3.5" />
    </button>
  );
}

function ResourcePreview({ visual }: { visual: (typeof recentResources)[number]["visual"] }) {
  return (
    <div className="relative h-[104px] overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))]" />
      {visual === "heatmap" ? <HeatmapPreview /> : null}
      {visual === "cyclone" ? <CyclonePreview /> : null}
      {visual === "network" ? <NetworkPreview /> : null}
      {visual === "port" ? <PortPreview /> : null}
      {visual === "globe" ? <GlobePreview /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
    </div>
  );
}

function HeatmapPreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <path d="M62 14 L92 8 L126 18 L154 36 L170 66 L138 88 L100 96 L72 76 L48 44 Z" fill="hsl(var(--primary)/0.22)" stroke="hsl(var(--info)/0.55)" />
      <circle cx="95" cy="62" r="28" fill="hsl(var(--warning))" opacity="0.32" />
      <circle cx="116" cy="74" r="24" fill="hsl(var(--danger))" opacity="0.42" />
      <circle cx="62" cy="48" r="18" fill="hsl(var(--success))" opacity="0.28" />
    </svg>
  );
}

function CyclonePreview() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_50%,white_0_3px,hsl(var(--foreground)/0.6)_4px_8px,transparent_9px),conic-gradient(from_40deg,hsl(var(--foreground)/0.05),hsl(var(--foreground)/0.42),hsl(var(--foreground)/0.06),hsl(var(--foreground)/0.36),hsl(var(--foreground)/0.04))] opacity-80" />
  );
}

function NetworkPreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <path d="M0 78 C40 36 88 84 125 42 S190 50 220 20" fill="none" stroke="hsl(var(--warning))" strokeWidth="1.5" />
      <path d="M0 52 C54 60 88 26 134 64 S194 80 220 46" fill="none" stroke="hsl(var(--danger))" strokeWidth="1.5" />
      {[36, 70, 112, 148, 184].map((x, index) => (
        <circle key={x} cx={x} cy={[58, 42, 68, 38, 60][index]} r="4" fill="hsl(var(--warning))" />
      ))}
    </svg>
  );
}

function PortPreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <path d="M0 74 L82 48 L150 58 L220 34 L220 104 L0 104 Z" fill="hsl(var(--info)/0.22)" />
      <path d="M62 0 L98 104 M112 0 L146 104 M158 0 L200 104" stroke="hsl(var(--foreground)/0.22)" />
      <rect x="112" y="48" width="52" height="10" fill="hsl(var(--warning)/0.72)" />
    </svg>
  );
}

function GlobePreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <circle cx="112" cy="52" r="45" fill="hsl(var(--primary)/0.16)" stroke="hsl(var(--info)/0.5)" />
      <path d="M68 52 H156 M112 8 C88 26 88 78 112 96 M112 8 C136 26 136 78 112 96" fill="none" stroke="hsl(var(--info)/0.35)" />
      {[82, 104, 128, 144, 96].map((x, index) => (
        <circle key={x} cx={x} cy={[44, 62, 36, 70, 28][index]} r="2.5" fill="hsl(var(--warning))" />
      ))}
    </svg>
  );
}

const toneClasses = {
  info: "border-primary/30 bg-primary/15 text-primary",
  cyan: "border-info/30 bg-info/15 text-info",
  success: "border-success/30 bg-success/15 text-success",
  warning: "border-warning/30 bg-warning/15 text-warning",
  purple: "border-violet-500/30 bg-violet-500/15 text-violet-300"
} as const;

const textClasses = {
  info: "text-primary",
  cyan: "text-info",
  success: "text-success",
  warning: "text-warning",
  purple: "text-violet-300"
} as const;
