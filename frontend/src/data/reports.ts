import type {
  FeaturedBrief,
  FutureReportingItem,
  Report,
  ReportActivity,
  ReportCategoryCard
} from "@/types/report";

export const reports: Report[] = [
  {
    id: "report-odisha-cyclone-risk",
    title: "Odisha Cyclone Risk Assessment",
    category: "Crisis",
    author: "Risk Analyst",
    createdDate: "2024-11-28",
    status: "published",
    priority: "critical",
    version: "v2.1",
    executiveSummary:
      "Current cyclone trajectory projects landfall near Paradip within 36 hours. Coastal district exposure is high across Jagatsinghpur, Kendrapara, and Puri. Medical supply corridors and critical transport routes require immediate prioritization.",
    keyFindings: [
      "Cyclone Category 3 equivalent wind bands expected within 18 hours",
      "Paradip Port operations likely suspended for 48–72 hours post-landfall",
      "6 district hospitals within the direct impact zone have less than 48h medical supply buffer",
      "NH-16 and NH-53 face high flood risk at 4 critical junctions"
    ],
    recommendations: [
      "Activate alternate freight corridors via NH-16B bypass immediately",
      "Pre-position medical supplies to Bhubaneswar and Cuttack warehouses",
      "Coordinate with ODRAF for district-level evacuation readiness",
      "Place Paradip Port container operations in standby mode"
    ]
  },
  {
    id: "report-paradip-port-congestion",
    title: "Paradip Port Congestion Analysis",
    category: "Trade",
    author: "Economic Strategist",
    createdDate: "2024-11-27",
    status: "published",
    priority: "high",
    version: "v1.4",
    executiveSummary:
      "Paradip Port is experiencing elevated congestion driven by pre-cyclone freight surge and vessel queuing. Container dwell times have increased by 22% over the 7-day average. Immediate routing adjustments are recommended.",
    keyFindings: [
      "Container throughput down 18% versus baseline due to vessel queue buildup",
      "Average dwell time increased from 3.1 days to 3.8 days",
      "Fertilizer and petroleum bulk cargo most affected",
      "Berth utilization at 94% — approaching operational ceiling"
    ],
    recommendations: [
      "Divert 30% of non-critical cargo to Haldia and Vizag ports",
      "Extend gate hours to 24/7 to reduce yard congestion",
      "Suspend non-essential vessel arrivals for 72 hours",
      "Coordinate with customs for expedited clearance of medical cargo"
    ]
  },
  {
    id: "report-ai-parliament-summary",
    title: "AI Parliament Session Summary",
    category: "AI Parliament",
    author: "Policy Advisor",
    createdDate: "2024-11-27",
    status: "review",
    priority: "high",
    version: "v1.0",
    executiveSummary:
      "AI Parliament session convened under Cyclone Landfall scenario. Eight specialist agents reached 72% consensus on prioritized response posture. Infrastructure Guardian and Humanitarian Advocate registered strongest alignment; minor conflict observed between Economic Strategist and Environment Sentinel on rerouting trade-offs.",
    keyFindings: [
      "Consensus score: 72 / 100 across all agent positions",
      "Primary decision: Activate alternate logistics corridor with medical supply priority",
      "Economic Strategist flags ₹2.3 Cr exposure from port suspension",
      "Environment Sentinel recommends minimizing fuel-intensive backup routes"
    ],
    recommendations: [
      "Proceed with alternate corridor activation per Infrastructure Guardian recommendation",
      "Assign medical supply prioritization as non-negotiable constraint",
      "Schedule follow-up session after landfall with updated sensor data",
      "Escalate Economic Strategist vs. Environment Sentinel conflict to human review"
    ]
  },
  {
    id: "report-economic-impact-projection",
    title: "Economic Impact Projection",
    category: "Impact",
    author: "Economic Strategist",
    createdDate: "2024-11-26",
    status: "published",
    priority: "critical",
    version: "v3.0",
    executiveSummary:
      "Projected economic exposure across the active cyclone scenario stands at ₹12.4 Cr. Primary drivers include port operational disruption, supply chain delay costs, and agricultural export losses. Recovery trajectory improves significantly with alternate corridor activation.",
    keyFindings: [
      "Base case economic loss: ₹12.4 Cr over 72-hour disruption window",
      "Port suspension contributes 48% of total projected loss",
      "Agricultural commodity exports face ₹3.1 Cr delay exposure",
      "Alternate corridor activation reduces total loss by ₹8.1 Cr (65% reduction)"
    ],
    recommendations: [
      "Activate alternate freight corridors to reduce ₹8.1 Cr exposure",
      "Coordinate insurance pre-notification for vessel operator claims",
      "Issue trade advisory to major commodity exporters in affected zones",
      "Model 7-day and 14-day recovery scenarios for executive brief"
    ]
  },
  {
    id: "report-carbon-recovery-forecast",
    title: "Carbon Recovery Forecast",
    category: "Carbon",
    author: "Environment Sentinel",
    createdDate: "2024-11-26",
    status: "published",
    priority: "medium",
    version: "v1.2",
    executiveSummary:
      "Rerouting logistics corridors through inland NH-53 introduces an estimated 14% increase in fuel consumption and carbon emissions over the crisis period. Mitigation strategies can limit net increase to 6% with optimized load consolidation.",
    keyFindings: [
      "NH-53 alternate corridor adds 340 km average per heavy vehicle journey",
      "Estimated additional CO2 emission: 1,240 tonnes over 72-hour crisis window",
      "Rail corridor activation can offset 40% of road-based carbon increase",
      "Load consolidation at Bhubaneswar hub can reduce journeys by 28%"
    ],
    recommendations: [
      "Activate rail freight corridor as priority alternate to road rerouting",
      "Implement load consolidation mandate at Bhubaneswar staging hub",
      "Defer non-critical freight movements to post-crisis window",
      "Update carbon offset planning model with post-event actuals"
    ]
  },
  {
    id: "report-medical-corridor-protection",
    title: "Medical Corridor Protection Report",
    category: "Infrastructure",
    author: "Humanitarian Advocate",
    createdDate: "2024-11-26",
    status: "published",
    priority: "critical",
    version: "v2.0",
    executiveSummary:
      "Six district hospitals and two regional medical hubs within the Odisha cyclone impact zone have been assessed for supply continuity. Medical corridor protection requires immediate pre-positioning and route priority designation.",
    keyFindings: [
      "SCBMCH Cuttack and SUM Hospital Bhubaneswar are primary regional receiving centers",
      "4 district hospitals (Kendrapara, Jagatsinghpur, Puri, Khordha) have less than 36h supply buffer",
      "Medical route NH-16 to NH-55 junction is rated as high flood risk",
      "Relief center at Bhubaneswar has 48h capacity for approximately 8,200 patients"
    ],
    recommendations: [
      "Deploy emergency medical convoy to 4 at-risk district hospitals within 12 hours",
      "Designate NH-16 to NH-55 junction as priority maintenance corridor",
      "Pre-stage blood supply and surgical consumables at Cuttack hub",
      "Activate Bhubaneswar relief center for overflow capacity management"
    ]
  },
  {
    id: "report-crisis-commander-executive-brief",
    title: "Crisis Commander Executive Brief",
    category: "Executive Briefing",
    author: "Crisis Commander Cell",
    createdDate: "2024-11-28",
    status: "published",
    priority: "critical",
    version: "v1.0",
    executiveSummary:
      "Cyclone Landfall scenario is ACTIVE. Crisis Commander has prepared a 5-priority action plan. Human approval required for alternate corridor activation and medical convoy deployment. Response readiness stands at 74%.",
    keyFindings: [
      "Response readiness score: 74 / 100",
      "5 priority actions identified, 2 requiring immediate human approval",
      "AI Parliament consensus at 72% — decision quality is HIGH",
      "Economic exposure stands at ₹12.4 Cr; reducible by 65% with authorized actions"
    ],
    recommendations: [
      "Authorize alternate corridor activation — estimated 65% economic loss reduction",
      "Approve medical convoy deployment to 4 at-risk district hospitals",
      "Review and sign off on ODRAF coordination request within 2 hours",
      "Schedule next executive review at 6-hour post-landfall mark"
    ]
  },
  {
    id: "report-national-risk-assessment",
    title: "National Risk Assessment",
    category: "Risk",
    author: "Risk Analyst",
    createdDate: "2024-11-25",
    status: "published",
    priority: "high",
    version: "v4.2",
    executiveSummary:
      "Composite national resilience score stands at 78/100 for the Odisha Cyclone Corridor. Primary stress factors include coastal port exposure, medical supply chain fragility, and road network flood vulnerability. The corridor is rated WATCH status.",
    keyFindings: [
      "National resilience score: 78 / 100 (WATCH band)",
      "Port exposure index elevated at 82 — requires active monitoring",
      "Medical supply chain fragility score: 68 — critical threshold at 60",
      "3 of 5 primary freight corridors show elevated stress indicators"
    ],
    recommendations: [
      "Increase monitoring frequency on Paradip and Dhamra port approaches",
      "Initiate medical supply pre-positioning protocol across coastal districts",
      "Schedule road network flood-risk reassessment after monsoon season",
      "Review corridor redundancy options for NH-16 alternate routing"
    ]
  },
  {
    id: "report-infrastructure-impact",
    title: "Infrastructure Impact Report",
    category: "Infrastructure",
    author: "Infrastructure Guardian",
    createdDate: "2024-11-25",
    status: "published",
    priority: "high",
    version: "v2.3",
    executiveSummary:
      "Critical infrastructure nodes across the Odisha corridor have been assessed under the Cyclone Landfall scenario. Power grid exposure, port operational risk, and road junction flood risk are the top three infrastructure vulnerabilities.",
    keyFindings: [
      "14 critical infrastructure nodes are within the direct cyclone impact zone",
      "Paradip and Dhamra ports face operational shutdown risk within 24 hours",
      "Power supply grid to 3 coastal districts shows elevated vulnerability",
      "6 road junctions on primary freight routes are flood-risk rated HIGH"
    ],
    recommendations: [
      "Initiate generator deployment protocol for coastal district hospitals",
      "Activate port standby operations protocol for Paradip and Dhamra",
      "Coordinate ODISHA power utility for emergency grid load redistribution",
      "Deploy NDRF teams to 6 high-flood-risk road junctions"
    ]
  },
  {
    id: "report-trade-sentinel-risk",
    title: "Trade Sentinel Risk Assessment",
    category: "Trade",
    author: "Economic Strategist",
    createdDate: "2024-11-24",
    status: "published",
    priority: "high",
    version: "v1.6",
    executiveSummary:
      "Trade sentinel monitoring across 4 active corridors shows elevated risk concentration at Paradip Port and NH-16 junction. Commodity exposure includes fertilizer, petroleum, and agricultural goods. Trade risk index is rated HIGH.",
    keyFindings: [
      "Trade risk index: HIGH (68 / 100) across monitored corridors",
      "Fertilizer import exposure: ₹4.2 Cr at risk at Paradip berths",
      "Agricultural export queue building at Bhubaneswar inland depot",
      "NH-16 congestion is adding 4–6 hour transit delay to time-sensitive cargo"
    ],
    recommendations: [
      "Issue trade corridor advisory for all operators on NH-16",
      "Pre-clear fertilizer shipments before port standby mode activates",
      "Open inland container depot at Bhubaneswar for emergency cargo staging",
      "Activate Vizag Port as overflow destination for redirected shipments"
    ]
  },
  {
    id: "report-emergency-logistics-plan",
    title: "Emergency Logistics Plan",
    category: "Logistics",
    author: "Logistics Optimizer",
    createdDate: "2024-11-24",
    status: "review",
    priority: "critical",
    version: "v1.1",
    executiveSummary:
      "Emergency logistics plan for Cyclone Landfall scenario outlines alternate routing, pre-positioning strategy, and resource deployment sequencing. Plan covers 72-hour crisis window with 24-hour extension contingency.",
    keyFindings: [
      "Primary alternate route via NH-53 adds 340 km but avoids all flood-risk junctions",
      "Bhubaneswar hub can support staging for up to 1,200 metric tonnes",
      "Rail network between Bhubaneswar and Cuttack is rated OPERATIONAL",
      "Current NDRF vehicle fleet can cover 8 of 12 priority delivery zones within 6 hours"
    ],
    recommendations: [
      "Confirm NH-53 alternate route activation with state highway authority",
      "Reserve Bhubaneswar hub capacity for medical and relief cargo only",
      "Coordinate Indian Railways for emergency freight priority scheduling",
      "Deploy advance NDRF convoy to Kendrapara and Jagatsinghpur within 4 hours"
    ]
  },
  {
    id: "report-port-readiness-brief",
    title: "Port Readiness Brief",
    category: "Ports",
    author: "Infrastructure Guardian",
    createdDate: "2024-11-23",
    status: "published",
    priority: "high",
    version: "v1.3",
    executiveSummary:
      "Port readiness assessment covers Paradip, Dhamra, and Gopalpur ports. Paradip is rated HIGH RISK for operational disruption; Dhamra is rated WATCH; Gopalpur is rated STABLE. Vessel evacuation protocol is recommended for Paradip.",
    keyFindings: [
      "Paradip: 14 vessels currently berthed — evacuation protocol recommended",
      "Dhamra: Operating at 78% capacity — watchlist activated",
      "Gopalpur: Stable operations with no immediate cyclone exposure",
      "Combined cargo at risk across Paradip and Dhamra: ₹9.6 Cr"
    ],
    recommendations: [
      "Issue vessel evacuation advisory for all Paradip berths within 12 hours",
      "Activate ISPS Code Level 2 security at Paradip and Dhamra",
      "Pre-clear perishable cargo from Paradip cold storage facilities",
      "Establish emergency coordination link with Paradip Port Trust"
    ]
  },
  {
    id: "report-medical-capacity-snapshot",
    title: "Medical Capacity Snapshot",
    category: "Health",
    author: "Humanitarian Advocate",
    createdDate: "2024-11-22",
    status: "published",
    priority: "high",
    version: "v2.1",
    executiveSummary:
      "Medical facility capacity across 8 coastal district hospitals has been assessed. Aggregate bed availability is at 62% baseline capacity. Supply buffer for essential medicines averages 2.3 days for at-risk facilities.",
    keyFindings: [
      "8 district hospitals assessed with average 62% bed availability",
      "Essential medicine supply buffer: 2.3 days average (critical threshold: 3 days)",
      "SCBMCH Cuttack is primary surge hospital — 340 beds available",
      "Blood supply in Puri district hospital is at 1.8 days — below critical threshold"
    ],
    recommendations: [
      "Urgent blood supply resupply to Puri district hospital within 8 hours",
      "Activate mutual aid protocol with SCBMCH Cuttack for surge capacity",
      "Deploy mobile medical unit to Kendrapara (most isolated at-risk facility)",
      "Pre-stage critical medicines at Bhubaneswar hub for rapid forward deployment"
    ]
  },
  {
    id: "report-route-redundancy",
    title: "Route Redundancy Analysis",
    category: "Logistics",
    author: "Logistics Optimizer",
    createdDate: "2024-11-20",
    status: "published",
    priority: "medium",
    version: "v1.5",
    executiveSummary:
      "Route redundancy analysis covers 12 primary freight and relief corridors in the Odisha corridor network. 3 corridors have no viable alternate route; 9 corridors have at least one viable redundant path. Immediate action is required for the 3 single-point corridors.",
    keyFindings: [
      "3 of 12 corridors are single-point: Puri coastal access, Kendrapara relief route, Jagatsinghpur NH junction",
      "NH-16 has 2 alternate routes — strongest redundancy in the network",
      "Rail network covers 6 of 12 corridors as viable backup",
      "Helicopter access points identified for 3 highest-risk isolated nodes"
    ],
    recommendations: [
      "Prioritize pre-positioning for 3 single-point corridors before landfall",
      "Maintain NH-16 at full operational status as primary backup corridor",
      "Coordinate Indian Railways for emergency freight windows on 6 rail-backed corridors",
      "Register helicopter access coordinates with ODRAF for high-risk node coverage"
    ]
  },
  {
    id: "report-corridor-health-weekly",
    title: "Corridor Health Weekly",
    category: "Operations",
    author: "National Operations Commander",
    createdDate: "2024-11-18",
    status: "published",
    priority: "medium",
    version: "v6.4",
    executiveSummary:
      "Weekly corridor health report for Odisha Cyclone Corridor. Overall corridor health score is 72/100 — down 6 points from last week due to cyclone pre-event stress. Three corridors have moved from OPERATIONAL to WATCH status.",
    keyFindings: [
      "Overall corridor health: 72 / 100 (down 6 points week-over-week)",
      "3 corridors moved to WATCH: NH-16 coastal segment, Paradip approach, Kendrapara relief",
      "Bhubaneswar hub health remains OPERATIONAL at 91/100",
      "Night-shift staffing shortfall at Cuttack warehouse depot flagged as risk"
    ],
    recommendations: [
      "Increase monitoring cadence for 3 new WATCH-status corridors",
      "Resolve Cuttack warehouse staffing shortfall before pre-event preparations begin",
      "Confirm full operational status of Bhubaneswar hub staging capacity",
      "Schedule next weekly report update at T+24h from landfall"
    ]
  },
  {
    id: "report-state-coordination-policy",
    title: "State Coordination Policy Brief",
    category: "Policy",
    author: "Policy Advisor",
    createdDate: "2024-11-17",
    status: "published",
    priority: "medium",
    version: "v1.0",
    executiveSummary:
      "Policy brief outlining inter-agency coordination responsibilities for Cyclone Landfall response. Covers ODRAF, NDRF, State DMA, port authorities, and district collectors. Escalation protocol and authority matrix included.",
    keyFindings: [
      "ODRAF has primary operational authority for land-based response operations",
      "NDRF district deployment requires state DMA written authorization",
      "Port authorities have independent operational authority for vessel management",
      "District collectors hold final authority for civilian evacuation orders"
    ],
    recommendations: [
      "Pre-issue standing authorization letters to NDRF district commanders",
      "Establish joint coordination call schedule: ODRAF + DMA + Port Authority every 6 hours",
      "Confirm district collector contact roster and satellite communication backup",
      "Share policy brief with all agency principals within 4 hours"
    ]
  },
  {
    id: "report-supply-chain-exposure",
    title: "Supply Chain Exposure Register",
    category: "Logistics",
    author: "Logistics Optimizer",
    createdDate: "2024-11-15",
    status: "review",
    priority: "high",
    version: "v2.0",
    executiveSummary:
      "Supply chain exposure register documents commodity-level risk across 6 key supply chains operating through the Odisha corridor. Highest exposure is in fertilizer imports, pharmaceutical distribution, and fuel supply chains.",
    keyFindings: [
      "Fertilizer supply chain: ₹4.2 Cr at risk — Paradip Port dependent",
      "Pharmaceutical distribution: 3.2-day average supply buffer across coastal districts",
      "Fuel supply chain: 2 primary depots within direct cyclone path",
      "Food grain supply chain rated STABLE — Bhubaneswar FCI depot has 14-day buffer"
    ],
    recommendations: [
      "Immediately pre-clear fertilizer cargo from Paradip before port standby",
      "Activate pharmaceutical emergency distribution protocol via alternate routes",
      "Relocate 40% of coastal fuel depot inventory to inland staging sites",
      "Monitor food grain supply chain — activate only if post-cyclone road access is lost"
    ]
  },
  {
    id: "report-carbon-cost-rerouting",
    title: "Carbon Cost of Rerouting",
    category: "Carbon",
    author: "Environment Sentinel",
    createdDate: "2024-11-14",
    status: "draft",
    priority: "low",
    version: "v0.9",
    executiveSummary:
      "Draft analysis of carbon cost implications from emergency logistics rerouting during Cyclone Landfall scenario. Estimates are preliminary and subject to revision based on final rerouting volume and vehicle mix.",
    keyFindings: [
      "Estimated 14% increase in road freight emissions during 72-hour rerouting window",
      "Rail alternative reduces carbon impact by 40% compared to full road rerouting",
      "Consolidated load factors can reduce vehicle count by up to 28%",
      "Total estimated additional carbon: 1,240 tonnes CO2 equivalent"
    ],
    recommendations: [
      "Maximize rail corridor usage before authorizing full road rerouting",
      "Implement minimum load factor standards (>70%) for all emergency convoys",
      "Track and report carbon actuals versus estimates post-event",
      "Include carbon cost in future crisis response cost-benefit calculations"
    ]
  },
  {
    id: "report-power-dependency",
    title: "Power Dependency Review",
    category: "Infrastructure",
    author: "Infrastructure Guardian",
    createdDate: "2024-11-13",
    status: "review",
    priority: "high",
    version: "v1.4",
    executiveSummary:
      "Power dependency review covers 12 critical infrastructure nodes in the Odisha corridor. 5 nodes have no backup power capability; 7 have generator backup but with less than 24-hour fuel reserves. Emergency fuel pre-positioning is required.",
    keyFindings: [
      "5 critical nodes have zero backup power capability — high risk during outage",
      "7 nodes have generator backup with average fuel reserve of 18 hours",
      "Coastal power grid feeds 3 districts — single point of failure risk",
      "Bhubaneswar hub has 72-hour backup power — strongest in network"
    ],
    recommendations: [
      "Emergency fuel delivery to 7 generator-equipped nodes to bring reserves to 72 hours",
      "Deploy 5 mobile generator units to nodes with no backup power capability",
      "Coordinate with ODISHA power utility for emergency grid islanding protocol",
      "Maintain Bhubaneswar hub as primary backup power anchor for the network"
    ]
  },
  {
    id: "report-district-impact-brief",
    title: "District Impact Brief",
    category: "Impact",
    author: "Risk Analyst",
    createdDate: "2024-11-12",
    status: "published",
    priority: "high",
    version: "v1.0",
    executiveSummary:
      "District-level impact brief covering 5 highest-risk districts in the Odisha cyclone zone: Puri, Jagatsinghpur, Kendrapara, Khordha, and Cuttack. Population exposure, medical risk, logistics stress, and economic exposure are quantified for each district.",
    keyFindings: [
      "Puri: 360K population exposure — highest in corridor",
      "Jagatsinghpur: Highest logistics stress at 91% — direct port access risk",
      "Kendrapara: Most isolated district — single road access point rated CRITICAL",
      "Combined economic exposure across 5 districts: ₹8.8 Cr"
    ],
    recommendations: [
      "Pre-position ODRAF resources in Jagatsinghpur and Kendrapara by T-12h",
      "Activate Puri district emergency operations center",
      "Ensure Kendrapara alternate air/water access plan is confirmed",
      "Issue public advisory across all 5 districts within 6 hours"
    ]
  },
  {
    id: "report-evacuation-readiness",
    title: "Evacuation Readiness Note",
    category: "Response",
    author: "Humanitarian Advocate",
    createdDate: "2024-11-10",
    status: "published",
    priority: "high",
    version: "v1.2",
    executiveSummary:
      "Evacuation readiness assessment for coastal districts covers shelter capacity, transport fleet availability, and route clearance status. Current readiness is rated at 71% — acceptable but with 3 outstanding action items that require immediate attention.",
    keyFindings: [
      "Total available evacuation shelter capacity: 142,000 persons across 5 districts",
      "ODRAF transport fleet has 68 operational vehicles — 12 require maintenance",
      "NH-316 evacuation corridor has a junction blockage requiring clearance",
      "Coastal fishing community pre-registration for evacuation at 43% — below target"
    ],
    recommendations: [
      "Expedite maintenance for 12 ODRAF vehicles — required for full fleet availability",
      "Clear NH-316 junction blockage as priority action before T-6h",
      "Activate fishing community outreach protocol through local gram panchayat network",
      "Confirm shelter activation and registration at all 12 primary sites"
    ]
  },
  {
    id: "report-odisha-cyclone-baseline",
    title: "Odisha Cyclone Baseline",
    category: "Baseline",
    author: "Bharat Nerves Platform",
    createdDate: "2024-11-08",
    status: "published",
    priority: "medium",
    version: "v1.0",
    executiveSummary:
      "Comprehensive baseline assessment of the Odisha Cyclone Corridor as of the platform initialization date. Documents all node positions, route configurations, and baseline health scores. Serves as the reference state for all scenario comparisons.",
    keyFindings: [
      "47 infrastructure nodes catalogued across the corridor",
      "12 primary freight and relief routes mapped with full attribute data",
      "Baseline corridor health score: 84/100 (pre-event state)",
      "Data sources: government datasets, Project Aegis demo data, static map layers"
    ],
    recommendations: [
      "Update baseline quarterly or immediately following any major corridor event",
      "Integrate live sensor data feeds as they become available",
      "Use baseline as reference state for all scenario impact delta calculations",
      "Schedule next baseline audit for Q1 2025"
    ]
  },
  {
    id: "report-data-readiness",
    title: "Data Readiness Assessment",
    category: "Technology",
    author: "Tech Innovator",
    createdDate: "2024-11-05",
    status: "draft",
    priority: "low",
    version: "v0.7",
    executiveSummary:
      "Assessment of data readiness for live integration across the Bharat Nerves Platform. Current data layer is fully mocked for demonstration purposes. Priority data integrations for production are identified and sequenced.",
    keyFindings: [
      "100% of current data is mocked — no live data integrations active",
      "Priority live integrations: IMD weather feed, port AIS data, NDRF deployment tracker",
      "Data schema is production-ready — no structural changes required for integration",
      "Estimated integration timeline: 8–12 weeks for priority 1 integrations"
    ],
    recommendations: [
      "Initiate IMD weather API integration as first live data feed",
      "Engage Paradip Port Trust for AIS data sharing agreement",
      "Develop NDRF deployment tracker API endpoint specification",
      "Document all mock-to-live migration paths for each data entity"
    ]
  }
];

export const reportCategories: ReportCategoryCard[] = [
  {
    id: "cat-crisis",
    title: "Crisis Reports",
    count: 9,
    description: "Active crisis assessments, situational briefs, and post-event after-action reports.",
    status: "active"
  },
  {
    id: "cat-trade",
    title: "Trade Reports",
    count: 12,
    description: "Port risk analysis, commodity exposure registers, and trade corridor health reports.",
    status: "active"
  },
  {
    id: "cat-impact",
    title: "Impact Reports",
    count: 11,
    description: "Economic impact projections, district-level exposure briefs, and resilience assessments.",
    status: "active"
  },
  {
    id: "cat-parliament",
    title: "AI Parliament Reports",
    count: 8,
    description: "Agent consensus summaries, multi-agent session records, and policy debate outputs.",
    status: "active"
  },
  {
    id: "cat-carbon",
    title: "Carbon Reports",
    count: 6,
    description: "Carbon cost analysis, rerouting emissions estimates, and recovery forecasts.",
    status: "review"
  },
  {
    id: "cat-infrastructure",
    title: "Infrastructure Reports",
    count: 14,
    description: "Node status reports, power dependency reviews, port readiness briefs.",
    status: "active"
  },
  {
    id: "cat-logistics",
    title: "Logistics Reports",
    count: 18,
    description: "Route redundancy, supply chain exposure, warehouse capacity, and emergency logistics.",
    status: "active"
  },
  {
    id: "cat-executive",
    title: "Executive Briefings",
    count: 7,
    description: "Decision-ready summaries for senior leadership and government stakeholders.",
    status: "active"
  }
];

export const recentReportActivities: ReportActivity[] = [
  {
    id: "activity-exec-brief-generated",
    title: "Executive Brief Generated",
    description: "Crisis Commander Executive Brief published for Cyclone Landfall scenario.",
    timestamp: "09:00",
    status: "success"
  },
  {
    id: "activity-trade-risk-updated",
    title: "Trade Risk Analysis Updated",
    description: "Paradip Port Congestion Analysis updated to v1.4 with vessel queue data.",
    timestamp: "08:45",
    status: "warning"
  },
  {
    id: "activity-carbon-impact-created",
    title: "Carbon Impact Report Created",
    description: "Carbon Recovery Forecast v1.2 published with rerouting emissions estimate.",
    timestamp: "08:20",
    status: "info"
  },
  {
    id: "activity-crisis-summary-updated",
    title: "Crisis Summary Updated",
    description: "Odisha Cyclone Risk Assessment elevated to v2.1 — cyclone track confirmed.",
    timestamp: "08:00",
    status: "danger"
  },
  {
    id: "activity-medical-report-review",
    title: "Medical Capacity Snapshot in Review",
    description: "Medical Capacity Snapshot entered review queue — awaiting lead analyst sign-off.",
    timestamp: "07:40",
    status: "neutral"
  }
];

export const reportActivityTimeline: ReportActivity[] = [
  {
    id: "timeline-risk-assessment",
    title: "Risk Assessment Generated",
    description: "Odisha Cyclone Risk Assessment v2.1 generated and published.",
    timestamp: "08:00",
    status: "success"
  },
  {
    id: "timeline-trade-updated",
    title: "Trade Analysis Updated",
    description: "Trade Sentinel Risk Assessment updated with latest port congestion data.",
    timestamp: "08:20",
    status: "info"
  },
  {
    id: "timeline-parliament-summary",
    title: "AI Parliament Summary Prepared",
    description: "AI Parliament session summary v1.0 entered review queue.",
    timestamp: "08:45",
    status: "warning"
  },
  {
    id: "timeline-exec-brief-published",
    title: "Executive Brief Published",
    description: "Crisis Commander Executive Brief cleared for senior leadership distribution.",
    timestamp: "09:00",
    status: "success"
  }
];

export const featuredIntelligenceBrief: FeaturedBrief = {
  title: "Odisha Cyclone Preparedness Assessment",
  subtitle: "Executive Intelligence Brief — Bharat Nerves Platform",
  summary:
    "Current corridor resilience remains moderate at 78/100. Medical supply routes to coastal districts require immediate prioritization before landfall. Alternate freight corridors should be activated to reduce economic exposure from ₹12.4 Cr to an estimated ₹4.3 Cr. AI Parliament consensus at 72% supports corridor activation as the highest-priority response action.",
  riskLevel: "critical",
  recommendation:
    "Authorize alternate corridor activation and medical supply convoy deployment within the next 4 hours to maximize economic loss reduction and ensure humanitarian supply continuity."
};

export const scenarioReports: { id: string; title: string; category: string; status: string }[] = [
  {
    id: "scenario-report-crisis-brief",
    title: "Crisis Commander Brief",
    category: "Executive Briefing",
    status: "published"
  },
  {
    id: "scenario-report-trade-risk",
    title: "Trade Sentinel Risk Assessment",
    category: "Trade",
    status: "published"
  },
  {
    id: "scenario-report-infra-impact",
    title: "Infrastructure Impact Report",
    category: "Infrastructure",
    status: "published"
  },
  {
    id: "scenario-report-logistics-plan",
    title: "Emergency Logistics Plan",
    category: "Logistics",
    status: "review"
  },
  {
    id: "scenario-report-medical-corridor",
    title: "Medical Corridor Protection Report",
    category: "Infrastructure",
    status: "published"
  }
];

export const futureReportingPipeline: FutureReportingItem[] = [
  {
    id: "future-pdf-export",
    name: "PDF Export",
    description: "One-click PDF generation for any report with government-grade formatting.",
    status: "planned"
  },
  {
    id: "future-scheduled-reports",
    name: "Scheduled Reports",
    description: "Automated report generation on user-defined schedules (daily, weekly, event-triggered).",
    status: "planned"
  },
  {
    id: "future-email-delivery",
    name: "Email Delivery",
    description: "Direct email dispatch of executive briefs to registered decision-maker mailing lists.",
    status: "planned"
  },
  {
    id: "future-govt-templates",
    name: "Government Briefing Templates",
    description: "Pre-formatted report templates for Ministry of Shipping, NDMA, and state DMA submissions.",
    status: "planned"
  },
  {
    id: "future-multilanguage",
    name: "Multi-language Reports",
    description: "Regional language support for Odia, Hindi, and other state languages.",
    status: "planned"
  },
  {
    id: "future-ai-narrative",
    name: "AI Narrative Generation",
    description: "AI-generated narrative summaries from structured data, ready for executive consumption.",
    status: "planned"
  },
  {
    id: "future-auto-executive-summaries",
    name: "Automated Executive Summaries",
    description: "Real-time executive summary generation triggered by scenario state changes.",
    status: "planned"
  }
];

export const reportStatistics = {
  reportsThisWeek: 14,
  reportsThisMonth: 47,
  avgReviewTimeHours: 3.2,
  criticalFindings: 9
};

export const reportsPageMeta = {
  title: "Reports",
  description:
    "Centralized intelligence and reporting hub for Project Aegis operational summaries, crisis briefs, trade analysis, and executive decision support."
};
