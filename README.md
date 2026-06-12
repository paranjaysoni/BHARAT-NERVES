# Project Aegis / Bharat Nerves

Project Aegis is a self-healing digital nervous system for trade, logistics, and disaster resilience.

## Product Overview

Project Aegis, also called Bharat Nerves, is planned as a simulation and decision-support platform for critical supply chains and emergency response networks. The MVP will focus on an Odisha Cyclone Corridor scenario where ports, warehouses, hospitals, relief centers, routes, and regional stress indicators can be modeled to support resilient planning.

The product will later combine geospatial visualization, network analysis, economic impact estimates, carbon impact estimates, AI-assisted policy debate, and crisis command workflows.

## MVP Scope

The planned MVP will simulate:

- Odisha Cyclone Corridor infrastructure nodes
- Ports, warehouses, hospitals, and relief centers
- Route stress and disruption signals
- Economic and carbon impact indicators
- AI Parliament for structured scenario debate
- Crisis Commander for decision recommendations

This repository currently contains only the foundation structure. No UI, backend APIs, business logic, AI logic, routing logic, or simulation logic has been implemented.

## Planned Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Leaflet
- Recharts
- Framer Motion

### Backend

- Python
- FastAPI
- Pydantic
- NetworkX

### AI

- Gemini API or OpenAI API
- Structured JSON output

### Data

- JSON files for MVP
- PostgreSQL/PostGIS later

### Deployment

- Vercel for frontend
- Render/Railway for backend

## Repository Structure

```text
project-aegis/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── dashboard/
│   │   │   ├── map/
│   │   │   ├── scenario/
│   │   │   ├── agents/
│   │   │   ├── commander/
│   │   │   └── shared/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── data/
│   │   ├── types/
│   │   ├── constants/
│   │   ├── styles/
│   │   └── utils/
│   └── README.md
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── core/
│   │   ├── graph/
│   │   ├── ai/
│   │   ├── simulations/
│   │   ├── calculations/
│   │   └── utils/
│   ├── data/
│   ├── tests/
│   ├── requirements.txt
│   └── README.md
├── docs/
│   ├── architecture/
│   ├── product/
│   ├── api/
│   ├── diagrams/
│   └── meeting-notes/
├── assets/
├── .github/
│   └── ISSUE_TEMPLATE/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## Development Phases

1. Foundation setup
2. Frontend project initialization
3. Backend project initialization
4. MVP data model definition
5. Odisha Cyclone Corridor sample dataset
6. Map and dashboard shell
7. Simulation and graph logic
8. AI Parliament and Crisis Commander workflows
9. Testing, polish, and deployment

## Current Status

Foundation setup only.
