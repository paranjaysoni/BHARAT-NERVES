export type NavigationIconName =
  | "Home"
  | "Activity"
  | "Network"
  | "Brain"
  | "ShieldAlert"
  | "BarChart3"
  | "Database"
  | "FileText"
  | "Settings";

export interface NavigationItem {
  title: string;
  iconName: NavigationIconName;
  href: string;
  description: string;
  skeletonTitle: string;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Control Room",
    iconName: "Home",
    href: "/control-room",
    description:
      "Mission-control overview for national corridor resilience, operational readiness, and priority interventions.",
    skeletonTitle: "Control Room Skeleton"
  },
  {
    title: "Scenario Simulator",
    iconName: "Activity",
    href: "/scenario-simulator",
    description:
      "Future workspace for testing disruption scenarios and comparing corridor response options.",
    skeletonTitle: "Scenario Simulator Skeleton"
  },
  {
    title: "Trade Sentinel",
    iconName: "Network",
    href: "/trade-sentinel",
    description:
      "Future monitoring surface for trade, logistics, route stress, and corridor disruption signals.",
    skeletonTitle: "Trade Sentinel Skeleton"
  },
  {
    title: "AI Parliament",
    iconName: "Brain",
    href: "/ai-parliament",
    description:
      "Future structured debate area for policy, logistics, resilience, and response perspectives.",
    skeletonTitle: "AI Parliament Skeleton"
  },
  {
    title: "Crisis Commander",
    iconName: "ShieldAlert",
    href: "/crisis-commander",
    description:
      "Future command workspace for response actions, escalation paths, and operational recommendations.",
    skeletonTitle: "Crisis Commander Skeleton"
  },
  {
    title: "Impact Dashboard",
    iconName: "BarChart3",
    href: "/impact-dashboard",
    description:
      "Future analytics view for economic impact, carbon impact, and resilience indicators.",
    skeletonTitle: "Impact Dashboard Skeleton"
  },
  {
    title: "Resources",
    iconName: "Database",
    href: "/resources",
    description:
      "Future repository for corridor assets, facilities, response capacity, and reference material.",
    skeletonTitle: "Resources Skeleton"
  },
  {
    title: "Reports",
    iconName: "FileText",
    href: "/reports",
    description:
      "Future reporting area for scenario summaries, impact briefs, and executive-ready exports.",
    skeletonTitle: "Reports Skeleton"
  },
  {
    title: "Settings",
    iconName: "Settings",
    href: "/settings",
    description:
      "Future configuration area for platform preferences, corridor scope, and user-level options.",
    skeletonTitle: "Settings Skeleton"
  }
];

export const controlRoomPage = navigationItems[0];
export const scenarioSimulatorPage = navigationItems[1];
export const tradeSentinelPage = navigationItems[2];
export const aiParliamentPage = navigationItems[3];
export const crisisCommanderPage = navigationItems[4];
export const impactDashboardPage = navigationItems[5];
export const resourcesPage = navigationItems[6];
export const reportsPage = navigationItems[7];
export const settingsPage = navigationItems[8];
export const pageSkeletonMessage = "Page skeleton ready.";
