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

      <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,330px)]">
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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

      <div className="mt-3 overflow-x-auto">
        <div className="min-w-[600px]">
        <div className="grid grid-cols-[minmax(0,1.6fr)_100px_100px_120px_80px_60px] border-b border-border/70 pb-2 text-[0.68rem] text-muted-foreground">
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
              className="grid grid-cols-[minmax(0,1.6fr)_100px_100px_120px_80px_60px] items-center py-2.5 text-xs"
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
      </div>
      <PanelLink label="View All Resources" />
    </Panel>
  );
}

function RecentlyAdded() {
  return (
    <Panel title="RECENTLY ADDED RESOURCES">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
    <div className="relative h-[104px] overflow-hidden">
      {visual === "heatmap" ? <HeatmapPreview /> : null}
      {visual === "cyclone" ? <CyclonePreview /> : null}
      {visual === "network" ? <NetworkPreview /> : null}
      {visual === "port" ? <PortPreview /> : null}
      {visual === "globe" ? <GlobePreview /> : null}
    </div>
  );
}

/* Air Quality Index — bar chart with gradient columns */
function HeatmapPreview() {
  const bars = [62, 45, 78, 55, 90, 38, 72, 84, 50, 66, 43, 80];
  const colors = [
    "hsl(var(--success))", "hsl(var(--success))", "hsl(var(--warning))",
    "hsl(var(--success))", "hsl(var(--danger))", "hsl(var(--success))",
    "hsl(var(--warning))", "hsl(var(--danger))", "hsl(var(--success))",
    "hsl(var(--warning))", "hsl(var(--success))", "hsl(var(--danger))"
  ];
  const w = 220 / bars.length;
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="aqiBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
          <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect width="220" height="104" fill="url(#aqiBg)" />
      {/* Horizontal grid lines */}
      {[20, 52, 84].map(y => (
        <line key={y} x1="8" x2="212" y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" />
      ))}
      {/* Bars */}
      {bars.map((val, i) => {
        const barH = (val / 100) * 72;
        return (
          <rect
            key={i}
            x={i * w + 2}
            y={96 - barH}
            width={w - 4}
            height={barH}
            rx="2"
            fill={colors[i]}
            fillOpacity="0.75"
          />
        );
      })}
      {/* AQI label */}
      <text x="10" y="15" fill="hsl(var(--muted-foreground))" fontSize="7" fontWeight="600" letterSpacing="0.08em">AIR QUALITY INDEX</text>
    </svg>
  );
}

/* Cyclone Landfall Tracker — spiral + path + wind bands */
function CyclonePreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <defs>
        <radialGradient id="cycloneBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--info))" stopOpacity="0.18" />
          <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.07" />
          <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--danger))" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <rect width="220" height="104" fill="hsl(var(--background))" fillOpacity="0.85" />
      {/* Outer wind bands */}
      <ellipse cx="110" cy="52" rx="96" ry="46" fill="none" stroke="hsl(var(--info))" strokeWidth="0.6" strokeOpacity="0.18" />
      <ellipse cx="110" cy="52" rx="74" ry="34" fill="none" stroke="hsl(var(--info))" strokeWidth="0.8" strokeOpacity="0.25" />
      <ellipse cx="110" cy="52" rx="52" ry="24" fill="none" stroke="hsl(var(--warning))" strokeWidth="1" strokeOpacity="0.35" />
      <ellipse cx="110" cy="52" rx="33" ry="15" fill="none" stroke="hsl(var(--warning))" strokeWidth="1.2" strokeOpacity="0.5" />
      <ellipse cx="110" cy="52" rx="16" ry="8" fill="none" stroke="hsl(var(--danger))" strokeWidth="1.5" strokeOpacity="0.7" />
      {/* Central background */}
      <circle cx="110" cy="52" r="96" fill="url(#cycloneBg)" />
      {/* Spiral arms */}
      <path d="M110 52 C118 44 134 34 148 28 C162 22 176 24 188 30" fill="none" stroke="hsl(var(--info))" strokeWidth="1.8" strokeOpacity="0.55" strokeLinecap="round" />
      <path d="M110 52 C102 60 88 72 76 80 C64 88 50 88 38 82" fill="none" stroke="hsl(var(--info))" strokeWidth="1.8" strokeOpacity="0.55" strokeLinecap="round" />
      <path d="M110 52 C120 58 136 68 148 76 C160 84 170 88 182 86" fill="none" stroke="hsl(var(--warning))" strokeWidth="1.4" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M110 52 C100 46 84 36 72 30 C60 24 48 22 36 28" fill="none" stroke="hsl(var(--warning))" strokeWidth="1.4" strokeOpacity="0.45" strokeLinecap="round" />
      {/* Eye wall */}
      <circle cx="110" cy="52" r="7" fill="url(#eyeGrad)" stroke="hsl(var(--danger))" strokeWidth="1.5" strokeOpacity="0.8" />
      {/* Eye centre dot */}
      <circle cx="110" cy="52" r="2.5" fill="hsl(var(--danger))" fillOpacity="0.9" />
      {/* Track path */}
      <path d="M36 86 C54 78 72 68 90 60 C102 54 108 52 110 52" fill="none" stroke="hsl(var(--danger))" strokeWidth="1.8" strokeDasharray="4 2" strokeOpacity="0.7" />
      {/* Track dots */}
      {[[36,86],[54,78],[72,68],[90,60]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="hsl(var(--danger))" fillOpacity="0.5" />
      ))}
      {/* Label */}
      <text x="10" y="14" fill="hsl(var(--muted-foreground))" fontSize="7" fontWeight="600" letterSpacing="0.08em">CYCLONE TRACKER</text>
    </svg>
  );
}

/* NH-16 Corridor Analysis — road/route network map */
function NetworkPreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <defs>
        <linearGradient id="netBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--card))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="220" height="104" fill="url(#netBg)" />
      {/* Grid lines — map feel */}
      {[26, 52, 78].map(y => (
        <line key={y} x1="0" x2="220" y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth="0.4" />
      ))}
      {[44, 88, 132, 176].map(x => (
        <line key={x} x1={x} x2={x} y1="0" y2="104" stroke="hsl(var(--border))" strokeWidth="0.4" />
      ))}
      {/* Secondary roads */}
      <path d="M0 78 L44 70 L88 80 L132 68" fill="none" stroke="hsl(var(--border-strong))" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M44 26 L44 70" fill="none" stroke="hsl(var(--border-strong))" strokeWidth="1" strokeLinecap="round" />
      <path d="M132 26 L132 68" fill="none" stroke="hsl(var(--border-strong))" strokeWidth="1" strokeLinecap="round" />
      {/* NH-16 main highway — highlighted */}
      <path d="M0 52 C32 48 64 44 88 46 C112 48 130 50 160 44 L220 38" fill="none" stroke="hsl(var(--warning))" strokeWidth="2.5" strokeLinecap="round" />
      {/* Blockage zone */}
      <rect x="134" y="36" width="26" height="14" rx="3" fill="hsl(var(--danger))" fillOpacity="0.18" stroke="hsl(var(--danger))" strokeWidth="1" strokeDasharray="3 2" />
      <text x="137" y="46" fill="hsl(var(--danger))" fontSize="5.5" fontWeight="700">BLOCK</text>
      {/* Node dots */}
      {[[0,52],[44,46],[88,46],[160,44],[220,38]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="hsl(var(--warning))" stroke="hsl(var(--card))" strokeWidth="1.2" />
      ))}
      {/* City labels */}
      <text x="34" y="43" fill="hsl(var(--muted-foreground))" fontSize="5.5" fontWeight="600">Bhubaneswar</text>
      <text x="78" y="43" fill="hsl(var(--muted-foreground))" fontSize="5.5" fontWeight="600">Cuttack</text>
      <text x="148" y="41" fill="hsl(var(--muted-foreground))" fontSize="5.5" fontWeight="600">Balasore</text>
      {/* Label */}
      <text x="10" y="14" fill="hsl(var(--muted-foreground))" fontSize="7" fontWeight="600" letterSpacing="0.08em">NH-16 CORRIDOR</text>
    </svg>
  );
}

/* Port Capacity Utilization — vertical bar chart with berth indicators */
function PortPreview() {
  const berths = [
    { label: "B1", pct: 92, tone: "hsl(var(--danger))" },
    { label: "B2", pct: 78, tone: "hsl(var(--warning))" },
    { label: "B3", pct: 55, tone: "hsl(var(--success))" },
    { label: "B4", pct: 88, tone: "hsl(var(--danger))" },
    { label: "B5", pct: 45, tone: "hsl(var(--success))" },
    { label: "B6", pct: 70, tone: "hsl(var(--warning))" },
    { label: "B7", pct: 95, tone: "hsl(var(--danger))" },
  ];
  const bw = 220 / berths.length;
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <linearGradient id="portBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--info))" stopOpacity="0.06" />
          <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="220" height="104" fill="url(#portBg)" />
      {/* Water horizon */}
      <path d="M0 94 C30 90 60 96 90 92 C120 88 150 94 180 90 L220 88 L220 104 L0 104 Z" fill="hsl(var(--info))" fillOpacity="0.12" />
      {/* 80% capacity line */}
      <line x1="8" x2="212" y1="30" y2="30" stroke="hsl(var(--warning))" strokeWidth="0.8" strokeDasharray="4 3" strokeOpacity="0.7" />
      <text x="175" y="27" fill="hsl(var(--warning))" fontSize="5.5" fontWeight="600">80% CAP</text>
      {/* Bars */}
      {berths.map((b, i) => {
        const barH = (b.pct / 100) * 65;
        return (
          <g key={b.label}>
            <rect x={i * bw + 3} y={88 - barH} width={bw - 6} height={barH} rx="2" fill={b.tone} fillOpacity="0.7" />
            <text x={i * bw + bw / 2} y="100" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="5.5" fontWeight="600">{b.label}</text>
          </g>
        );
      })}
      {/* Label */}
      <text x="10" y="14" fill="hsl(var(--muted-foreground))" fontSize="7" fontWeight="600" letterSpacing="0.08em">PORT CAPACITY</text>
    </svg>
  );
}

/* Global Economic Outlook — world map outline + GDP trend line */
function GlobePreview() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 104" aria-hidden="true">
      <defs>
        <linearGradient id="globeBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--success))" />
          <stop offset="100%" stopColor="hsl(var(--info))" />
        </linearGradient>
      </defs>
      <rect width="220" height="104" fill="url(#globeBg)" />
      {/* Latitude lines */}
      {[26, 52, 78].map(y => (
        <line key={y} x1="0" x2="220" y1={y} y2={y} stroke="hsl(var(--border))" strokeWidth="0.4" strokeOpacity="0.6" />
      ))}
      {/* Longitude lines */}
      {[44, 88, 132, 176].map(x => (
        <ellipse key={x} cx="110" cy="52" rx={Math.abs(x - 110)} ry="46" fill="none" stroke="hsl(var(--border))" strokeWidth="0.4" strokeOpacity="0.5" />
      ))}
      {/* Simplified continent blobs */}
      {/* Americas */}
      <path d="M18 22 C22 18 32 18 36 24 C40 30 38 40 36 48 C34 56 30 62 26 68 C22 74 18 76 16 72 C12 64 12 52 14 40 Z" fill="hsl(var(--primary))" fillOpacity="0.18" stroke="hsl(var(--primary))" strokeWidth="0.6" strokeOpacity="0.4" />
      {/* Europe/Africa */}
      <path d="M76 18 C84 16 96 18 100 26 C104 34 100 44 96 50 C100 52 102 62 98 72 C94 82 84 86 78 80 C72 74 70 64 72 54 C68 50 66 40 68 30 Z" fill="hsl(var(--success))" fillOpacity="0.15" stroke="hsl(var(--success))" strokeWidth="0.6" strokeOpacity="0.4" />
      {/* Asia */}
      <path d="M112 16 C124 14 148 18 158 28 C168 36 166 46 158 52 C150 58 136 58 124 54 C116 62 112 72 108 80 C102 72 104 60 110 52 C104 44 104 32 112 22 Z" fill="hsl(var(--info))" fillOpacity="0.15" stroke="hsl(var(--info))" strokeWidth="0.6" strokeOpacity="0.4" />
      {/* India highlight */}
      <path d="M134 46 C138 44 142 48 140 56 C138 62 132 64 130 58 C128 52 130 48 134 46 Z" fill="hsl(var(--warning))" fillOpacity="0.7" stroke="hsl(var(--warning))" strokeWidth="0.8" />
      {/* GDP trend line — bottom strip */}
      <rect x="0" y="82" width="220" height="22" fill="hsl(var(--card))" fillOpacity="0.7" />
      <polyline points="8,100 30,94 54,96 78,90 102,86 126,88 150,83 174,85 198,80 212,78" fill="none" stroke="url(#trendLine)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="212" cy="78" r="2.5" fill="hsl(var(--success))" />
      {/* Key economy dots */}
      {[[22,46,"US"],[88,38,"EU"],[134,50,"IN"],[154,34,"CN"]].map(([x,y,label]) => (
        <g key={label as string}>
          <circle cx={x as number} cy={y as number} r="3" fill="hsl(var(--warning))" fillOpacity="0.8" />
          <text x={(x as number) + 4} y={(y as number) - 3} fill="hsl(var(--warning))" fontSize="5" fontWeight="700">{label}</text>
        </g>
      ))}
      {/* Label */}
      <text x="10" y="14" fill="hsl(var(--muted-foreground))" fontSize="7" fontWeight="600" letterSpacing="0.08em">GLOBAL OUTLOOK</text>
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
