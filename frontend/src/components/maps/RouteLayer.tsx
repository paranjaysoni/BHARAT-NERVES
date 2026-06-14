"use client";

import { Polyline, Popup, Tooltip } from "react-leaflet";
import type { LatLngExpression, PathOptions } from "leaflet";
import type { MapNode, MapRoute } from "./types";

export interface RouteLayerProps {
  routes: MapRoute[];
  nodesById: Map<string, MapNode>;
  highlightedRouteIds?: Set<string>;
  routeTypes?: Set<MapRoute["routeType"]>;
}

const routeTypeStyle: Record<MapRoute["routeType"], PathOptions> = {
  EMERGENCY: {
    color: "#ef4444"
  },
  PORT_LINK: {
    color: "#38bdf8"
  },
  RAIL: {
    color: "#a78bfa"
  },
  ROAD: {
    color: "#60a5fa"
  }
};

const routeStatusStyle: Partial<Record<MapRoute["status"], PathOptions>> = {
  AT_RISK: {
    color: "#f97316",
    dashArray: "8 8"
  },
  BLOCKED: {
    color: "#dc2626",
    dashArray: "5 7"
  },
  DELAYED: {
    color: "#facc15",
    dashArray: "10 8"
  }
};

export function RouteLayer({
  routes,
  nodesById,
  highlightedRouteIds = new Set(),
  routeTypes
}: RouteLayerProps) {
  return (
    <>
      {routes.map((route) => {
        if (routeTypes && !routeTypes.has(route.routeType)) return null;

        const source = nodesById.get(route.sourceNodeId);
        const destination = nodesById.get(route.destinationNodeId);
        if (!source || !destination) return null;

        const isHighlighted = highlightedRouteIds.has(route.id);
        const positions: LatLngExpression[] = [
          [source.latitude, source.longitude],
          [destination.latitude, destination.longitude]
        ];
        const baseStyle = routeStatusStyle[route.status] ?? routeTypeStyle[route.routeType];

        return (
          <Polyline
            key={route.id}
            positions={positions}
            pathOptions={{
              ...baseStyle,
              opacity: isHighlighted ? 0.98 : 0.74,
              weight: isHighlighted ? 6 : 3
            }}
          >
            <Tooltip sticky opacity={0.96}>
              <span>{route.name}</span>
            </Tooltip>
            <Popup>
              <div className="aegis-map-popup">
                <p className="aegis-map-popup-title">{route.name}</p>
                <dl>
                  <div>
                    <dt>Type</dt>
                    <dd>{formatLabel(route.routeType)}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{formatLabel(route.status)}</dd>
                  </div>
                  <div>
                    <dt>Corridor</dt>
                    <dd>{route.corridor}</dd>
                  </div>
                  <div>
                    <dt>Distance</dt>
                    <dd>{route.distanceKm} km</dd>
                  </div>
                </dl>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

