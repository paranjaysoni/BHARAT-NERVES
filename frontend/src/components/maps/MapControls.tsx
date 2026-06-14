"use client";

import { LocateFixed, Minus, Plus } from "lucide-react";
import { useMap } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";

export interface MapControlsProps {
  fitBounds?: LatLngBoundsExpression;
}

export function MapControls({ fitBounds }: MapControlsProps) {
  const map = useMap();

  return (
    <div className="pointer-events-auto absolute left-3 top-3 z-[500] overflow-hidden rounded-md border border-white/10 bg-slate-950/80 text-white shadow-lg backdrop-blur-md">
      <button
        type="button"
        className="grid h-9 w-9 place-items-center border-b border-white/10 hover:bg-white/10"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="grid h-9 w-9 place-items-center border-b border-white/10 hover:bg-white/10"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="grid h-9 w-9 place-items-center hover:bg-white/10"
        aria-label="Fit map to India"
        onClick={() => {
          if (fitBounds) map.fitBounds(fitBounds, { padding: [28, 28] });
        }}
      >
        <LocateFixed className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

