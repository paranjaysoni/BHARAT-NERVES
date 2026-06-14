# Digital Twin Map

## Purpose

The Digital Twin Map system gives Project Aegis a reusable real-world map foundation using Leaflet, React Leaflet, and OpenStreetMap. It replaces fake SVG/grid/network maps with a shared infrastructure layer for national-scale situational awareness.

This issue covers map infrastructure and visualization only. It does not implement simulation execution, route blocking, route recovery, GIS analysis, weather, traffic, or live external data.

## Architecture

Map components live in `src/components/maps`.

```text
src/components/maps/
├── AegisMap.tsx
├── NodeMarker.tsx
├── RouteLayer.tsx
├── MapLegend.tsx
├── MapControls.tsx
├── HeatmapLayer.tsx
├── types.ts
└── index.ts
```

`AegisMap` is the only reusable map engine. Product pages pass configuration into this component rather than creating separate Leaflet implementations.

## Data Flow

`AegisMap` fetches static backend data from Issue #55:

- `GET /api/nodes`
- `GET /api/routes`

The frontend API base defaults to `http://localhost:4000` and can be overridden with:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Node Model

Nodes use the backend static data shape:

- `id`
- `name`
- `type`
- `latitude`
- `longitude`
- `district`
- `state`
- `status`
- `importance`
- `capacity`
- `capacityUnit`
- `description`
- `tags`

Node status colors:

- `OPERATIONAL`: green
- `WARNING`: yellow
- `AT_RISK`: orange
- `DISRUPTED`: red
- `OFFLINE`: slate

Node popups show name, type, district, status, and importance.

## Route Model

Routes use the backend static data shape:

- `id`
- `name`
- `sourceNodeId`
- `destinationNodeId`
- `distanceKm`
- `travelTimeMinutes`
- `routeType`
- `status`
- `corridor`
- `riskLevel`

Routes render as Leaflet polylines between source and destination nodes.

Route type colors:

- `ROAD`: blue
- `RAIL`: violet
- `PORT_LINK`: cyan
- `EMERGENCY`: red

## Theme Support

The map uses the existing Project Aegis CSS variable theme system.

- Light theme keeps the standard OpenStreetMap appearance for a clean government dashboard look.
- Dark theme applies a CSS tile filter and dark Leaflet popups/controls to match the Bharat Nerves intelligence-center visual language.
- No paid map providers or API keys are required.

## Page Usage

Pages using `AegisMap`:

- Control Room: all backend nodes and routes on the India digital twin.
- Scenario Simulator: backend nodes/routes plus visual-only affected node and route highlighting.
- Trade Sentinel: ports, trade routes, road routes, rail routes, and port links.
- Impact Dashboard: backend nodes/routes plus static mock heat zones for low, medium, high, and critical intensity.

## Future Simulation Integration

Future scenario engine work can pass simulation output into `AegisMap` through existing props:

- `affectedNodeIds`
- `affectedRouteIds`
- `heatZones`
- `nodeTypes`
- `routeTypes`

This keeps simulation logic outside the map engine while allowing the map to visualize computed state.

## Future GIS Roadmap

Potential future layers:

- GeoJSON administrative boundaries
- True route geometries instead of straight-line polylines
- Route blocking and recovery overlays
- Live weather overlays
- Live traffic and port feeds
- Tile provider abstraction if offline or government map tiles are needed

These should remain additive layers around the shared map engine.

