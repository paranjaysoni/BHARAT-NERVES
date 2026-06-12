export type ImpactRiskLevel = "low" | "medium" | "high" | "critical";

export interface ImpactKpi {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface ImpactTrendPoint {
  period: string;
  expectedImpact: number;
  recoveredImpact: number;
}

export interface RecoveryComparisonPoint {
  category: string;
  before: number;
  after: number;
}

export interface SectorImpactPoint {
  sector: string;
  value: number;
}

export interface ImpactSummary {
  summary: string;
  recoveryReduction: string;
  resilienceBefore: number;
  resilienceAfter: number;
  improvement: number;
}

export interface ImpactRiskItem {
  id: string;
  label: string;
  value: number;
  riskLevel: ImpactRiskLevel;
}

export interface ImpactInsight {
  id: string;
  title: string;
  description: string;
  status: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface DistrictImpact {
  district: string;
  populationRisk: string;
  medicalRisk: ImpactRiskLevel;
  logisticsStress: string;
  economicExposure: string;
  status: "stable" | "watch" | "stressed" | "critical";
}

export interface RecoveryBenefit {
  intervention: string;
  before: string;
  after: string;
  benefit: string;
  confidence: string;
}

export interface GeographicImpact {
  title: string;
  description: string;
  affectedDistricts: string[];
  highRiskZones: string[];
  stressClusters: string[];
}
