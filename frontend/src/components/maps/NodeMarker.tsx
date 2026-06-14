"use client";

import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import type { PathOptions } from "leaflet";
import type { MapNode } from "./types";

export interface NodeMarkerProps {
  node: MapNode;
  highlighted?: boolean;
  compact?: boolean;
}

const statusStyle: Record<MapNode["status"], PathOptions> = {
  AT_RISK: {
    color: "#f97316",
    fillColor: "#f97316"
  },
  DISRUPTED: {
    color: "#dc2626",
    fillColor: "#dc2626"
  },
  OFFLINE: {
    color: "#64748b",
    fillColor: "#64748b"
  },
  OPERATIONAL: {
    color: "#16a34a",
    fillColor: "#16a34a"
  },
  WARNING: {
    color: "#facc15",
    fillColor: "#facc15"
  }
};

export function NodeMarker({ node, highlighted = false, compact = false }: NodeMarkerProps) {
  const style = statusStyle[node.status];
  const radius = highlighted ? 11 : compact ? 6 : 8;

  return (
    <CircleMarker
      center={[node.latitude, node.longitude]}
      radius={radius}
      pathOptions={{
        ...style,
        fillOpacity: highlighted ? 0.95 : 0.86,
        opacity: 1,
        weight: highlighted ? 4 : 2
      }}
    >
      <Tooltip direction="top" offset={[0, -6]} opacity={0.96}>
        <span>{node.name}</span>
      </Tooltip>
      <Popup>
        <div className="aegis-map-popup">
          <p className="aegis-map-popup-title">{node.name}</p>
          <dl>
            <div>
              <dt>Type</dt>
              <dd>{formatLabel(node.type)}</dd>
            </div>
            <div>
              <dt>District</dt>
              <dd>{node.district}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{formatLabel(node.status)}</dd>
            </div>
            <div>
              <dt>Importance</dt>
              <dd>{formatLabel(node.importance)}</dd>
            </div>
          </dl>
        </div>
      </Popup>
    </CircleMarker>
  );
}

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

