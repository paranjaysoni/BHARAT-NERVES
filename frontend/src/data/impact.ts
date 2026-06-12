import type {
  DistrictImpact,
  GeographicImpact,
  ImpactInsight,
  ImpactKpi,
  ImpactRiskItem,
  ImpactSummary,
  ImpactTrendPoint,
  RecoveryBenefit,
  RecoveryComparisonPoint,
  SectorImpactPoint
} from "@/types";

export const impactKpis: ImpactKpi[] = [
  { id: "impact-economic", title: "Economic Impact", value: "₹12.4 Cr", subtitle: "Projected disruption exposure", status: "warning" },
  { id: "impact-population", title: "Population Affected", value: "1.24M", subtitle: "People under corridor risk", status: "danger" },
  { id: "impact-infrastructure", title: "Infrastructure Damage", value: "High", subtitle: "Coastal and logistics nodes", status: "danger" },
  { id: "impact-trade", title: "Trade Disruption", value: "₹5.7 Cr", subtitle: "Delayed or rerouted value", status: "warning" },
  { id: "impact-carbon", title: "Carbon Impact", value: "8.7K tCO2", subtitle: "Rerouting emissions exposure", status: "info" },
  { id: "impact-recovery-savings", title: "Recovery Savings", value: "₹8.1 Cr", subtitle: "Avoided loss from actions", status: "success" }
];

export const impactOverTime: ImpactTrendPoint[] = [
  { period: "0h", expectedImpact: 2.1, recoveredImpact: 1.8 },
  { period: "6h", expectedImpact: 4.4, recoveredImpact: 3.1 },
  { period: "12h", expectedImpact: 7.2, recoveredImpact: 4.2 },
  { period: "24h", expectedImpact: 10.6, recoveredImpact: 5.3 },
  { period: "36h", expectedImpact: 12.4, recoveredImpact: 5.8 },
  { period: "48h", expectedImpact: 14.1, recoveredImpact: 6.4 }
];

export const recoveryComparison: RecoveryComparisonPoint[] = [
  { category: "Economic Loss", before: 12.4, after: 4.3 },
  { category: "Delay Hours", before: 18, after: 6 },
  { category: "Population Risk", before: 12.4, after: 5.1 },
  { category: "Carbon Impact", before: 8.7, after: 7.5 }
];

export const sectorImpactBreakdown: SectorImpactPoint[] = [
  { sector: "Healthcare", value: 26 },
  { sector: "Logistics", value: 28 },
  { sector: "Trade", value: 22 },
  { sector: "Environment", value: 10 },
  { sector: "Infrastructure", value: 14 }
];

export const geographicImpact: GeographicImpact = {
  title: "Odisha Corridor Impact View",
  description: "Mock geographic placeholder for affected districts, high-risk zones, and stress clusters.",
  affectedDistricts: ["Puri", "Balasore", "Cuttack", "Bhubaneswar", "Kendrapara"],
  highRiskZones: ["Coastal freight belt", "Hospital supply lane", "Port staging zone"],
  stressClusters: ["Paradip congestion", "Puri relief access", "Cuttack warehouse pressure"]
};

export const impactSummary: ImpactSummary = {
  summary:
    "The current cyclone scenario is projected to create major disruption across coastal logistics routes. Recovery actions reduce expected loss by 65%, protect critical hospital supply chains and improve corridor resilience from 42 to 76.",
  recoveryReduction: "65%",
  resilienceBefore: 42,
  resilienceAfter: 76,
  improvement: 34
};

export const impactRiskDistribution: ImpactRiskItem[] = [
  { id: "risk-medical", label: "Medical Risk", value: 72, riskLevel: "high" },
  { id: "risk-logistics", label: "Logistics Risk", value: 78, riskLevel: "high" },
  { id: "risk-trade", label: "Trade Risk", value: 64, riskLevel: "medium" },
  { id: "risk-infrastructure", label: "Infrastructure Risk", value: 69, riskLevel: "high" },
  { id: "risk-environment", label: "Environmental Risk", value: 48, riskLevel: "medium" }
];

export const impactInsights: ImpactInsight[] = [
  { id: "insight-routing-savings", title: "Alternate routing avoids ₹8.1 Cr loss", description: "Recovery routing preserves high-priority freight and medical lanes.", status: "success" },
  { id: "insight-medical-protection", title: "Medical corridor protection improves by 38%", description: "Hospital supply continuity improves under the proposed response plan.", status: "success" },
  { id: "insight-carbon-reduction", title: "Carbon impact reduced by 14%", description: "Lower-emission inland route choices reduce rerouting burden.", status: "info" },
  { id: "insight-relief-coverage", title: "Relief coverage improves to 81%", description: "Relief center readiness increases after staged deployment.", status: "info" },
  { id: "insight-delay-reduction", title: "Delay reduced from 18h to 6h", description: "Freight delay improves after route balancing and cargo prioritization.", status: "warning" }
];

export const districtImpacts: DistrictImpact[] = [
  { district: "Puri", populationRisk: "360K", medicalRisk: "high", logisticsStress: "82%", economicExposure: "₹2.8 Cr", status: "critical" },
  { district: "Balasore", populationRisk: "240K", medicalRisk: "medium", logisticsStress: "61%", economicExposure: "₹1.9 Cr", status: "stressed" },
  { district: "Cuttack", populationRisk: "210K", medicalRisk: "high", logisticsStress: "74%", economicExposure: "₹2.2 Cr", status: "stressed" },
  { district: "Bhubaneswar", populationRisk: "280K", medicalRisk: "medium", logisticsStress: "58%", economicExposure: "₹3.1 Cr", status: "watch" },
  { district: "Kendrapara", populationRisk: "150K", medicalRisk: "medium", logisticsStress: "69%", economicExposure: "₹1.4 Cr", status: "watch" }
];

export const recoveryBenefits: RecoveryBenefit[] = [
  { intervention: "Alternate route activation", before: "18h delay", after: "6h delay", benefit: "12h saved", confidence: "86%" },
  { intervention: "Medical supply prioritization", before: "High risk", after: "Moderate risk", benefit: "38% protection gain", confidence: "91%" },
  { intervention: "Port load balancing", before: "₹5.7 Cr disruption", after: "₹2.1 Cr disruption", benefit: "₹3.6 Cr avoided", confidence: "78%" },
  { intervention: "Relief center activation", before: "54% coverage", after: "81% coverage", benefit: "27 pts improved", confidence: "84%" },
  { intervention: "Freight delay management", before: "5 bottlenecks", after: "2 bottlenecks", benefit: "3 bottlenecks reduced", confidence: "82%" }
];

export const forecastNotes = [
  "Forecast values are static mock estimates for frontend demonstration.",
  "Future versions should connect live scenario outputs and validated impact models.",
  "Recovery benefits should be recalculated when route, port, or incident data changes."
];
