"use client";

import { Circle, Popup, Tooltip } from "react-leaflet";
import type { HeatZone } from "./types";

export interface HeatmapLayerProps {
  zones: HeatZone[];
}

const heatStyle: Record<HeatZone["level"], { color: string; fillOpacity: number }> = {
  CRITICAL: {
    color: "#dc2626",
    fillOpacity: 0.32
  },
  HIGH: {
    color: "#f97316",
    fillOpacity: 0.28
  },
  LOW: {
    color: "#38bdf8",
    fillOpacity: 0.18
  },
  MEDIUM: {
    color: "#facc15",
    fillOpacity: 0.22
  }
};

export function HeatmapLayer({ zones }: HeatmapLayerProps) {
  return (
    <>
      {zones.map((zone) => {
        const style = heatStyle[zone.level];

        return (
          <Circle
            key={zone.id}
            center={[zone.latitude, zone.longitude]}
            radius={zone.radiusKm * 1000}
            pathOptions={{
              color: style.color,
              fillColor: style.color,
              fillOpacity: style.fillOpacity,
              opacity: 0.62,
              weight: 1.5
            }}
          >
            <Tooltip sticky opacity={0.96}>
              <span>{zone.name} · {zone.level}</span>
            </Tooltip>
            <Popup>
              <div className="aegis-map-popup">
                <p className="aegis-map-popup-title">{zone.name}</p>
                <dl>
                  <div>
                    <dt>Impact</dt>
                    <dd>{zone.level}</dd>
                  </div>
                  <div>
                    <dt>Radius</dt>
                    <dd>{zone.radiusKm} km</dd>
                  </div>
                </dl>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}

