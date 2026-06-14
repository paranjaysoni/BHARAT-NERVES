"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import { HeatmapLayer } from "./HeatmapLayer";
import { MapControls } from "./MapControls";
import { MapLegend } from "./MapLegend";
import { NodeMarker } from "./NodeMarker";
import { RouteLayer } from "./RouteLayer";
import type { ApiResponse, HeatZone, MapNode, MapRoute } from "./types";

export interface AegisMapProps {
  title?: string;
  description?: string;
  className?: string;
  mapClassName?: string;
  heightClassName?: string;
  affectedNodeIds?: string[];
  affectedRouteIds?: string[];
  nodeTypes?: MapNode["type"][];
  routeTypes?: MapRoute["routeType"][];
  heatZones?: HeatZone[];
  showRoutes?: boolean;
  showLegend?: boolean;
  showImpactLegend?: boolean;
  compactMarkers?: boolean;
  stats?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
const INDIA_BOUNDS: LatLngBoundsExpression = [
  [6.4, 67.0],
  [37.6, 98.5]
];

export function AegisMap({
  title,
  description,
  className,
  mapClassName,
  heightClassName = "min-h-[430px]",
  affectedNodeIds = [],
  affectedRouteIds = [],
  nodeTypes,
  routeTypes,
  heatZones = [],
  showRoutes = true,
  showLegend = true,
  showImpactLegend = false,
  compactMarkers = false,
  stats = true
}: AegisMapProps) {
  const [nodes, setNodes] = useState<MapNode[]>([]);
  const [routes, setRoutes] = useState<MapRoute[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMapData() {
      try {
        setStatus("loading");
        const [nodesResponse, routesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/nodes`),
          fetch(`${API_BASE_URL}/api/routes`)
        ]);

        if (!nodesResponse.ok || !routesResponse.ok) {
          throw new Error("Backend map APIs returned an error");
        }

        const [nodesBody, routesBody] = await Promise.all([
          nodesResponse.json() as Promise<ApiResponse<MapNode[]>>,
          routesResponse.json() as Promise<ApiResponse<MapRoute[]>>
        ]);

        if (!nodesBody.success || !routesBody.success) {
          throw new Error("Backend map API response was not successful");
        }

        if (!cancelled) {
          setNodes(nodesBody.data);
          setRoutes(routesBody.data);
          setStatus("ready");
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setError(err instanceof Error ? err.message : "Unable to load map data");
        }
      }
    }

    loadMapData();

    return () => {
      cancelled = true;
    };
  }, []);

  const affectedNodeSet = useMemo(() => new Set(affectedNodeIds), [affectedNodeIds]);
  const affectedRouteSet = useMemo(() => new Set(affectedRouteIds), [affectedRouteIds]);
  const nodeTypeSet = useMemo(() => nodeTypes ? new Set(nodeTypes) : null, [nodeTypes]);
  const routeTypeSet = useMemo(() => routeTypes ? new Set(routeTypes) : undefined, [routeTypes]);

  const visibleNodes = useMemo(
    () => nodes.filter((node) => !nodeTypeSet || nodeTypeSet.has(node.type)),
    [nodeTypeSet, nodes]
  );
  const nodesById = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);
  const visibleRoutes = useMemo(
    () =>
      routes.filter((route) => {
        if (routeTypeSet && !routeTypeSet.has(route.routeType)) return false;
        return nodesById.has(route.sourceNodeId) && nodesById.has(route.destinationNodeId);
      }),
    [nodesById, routeTypeSet, routes]
  );

  return (
    <div className={clsx("relative overflow-hidden rounded-md border border-border bg-slate-950", className)}>
      {title || description ? (
        <div className="absolute left-14 right-3 top-3 z-[500] max-w-[calc(100%-5rem)] rounded-md border border-white/10 bg-slate-950/75 px-3 py-2 text-white shadow-lg backdrop-blur-md">
          {title ? (
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-sky-200">
              {title}
            </p>
          ) : null}
          {description ? <p className="mt-1 text-xs text-slate-300">{description}</p> : null}
        </div>
      ) : null}

      <div className={clsx("aegis-map relative", heightClassName, mapClassName)}>
        <MapContainer
          center={[22.8, 82.6]}
          zoom={5}
          minZoom={4}
          maxZoom={12}
          bounds={INDIA_BOUNDS}
          boundsOptions={{ padding: [28, 28] }}
          zoomControl={false}
          attributionControl
          className="absolute inset-0 z-0 h-full min-h-full w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitToBounds bounds={INDIA_BOUNDS} />
          {heatZones.length > 0 ? <HeatmapLayer zones={heatZones} /> : null}
          {showRoutes ? (
            <RouteLayer
              routes={visibleRoutes}
              nodesById={nodesById}
              highlightedRouteIds={affectedRouteSet}
              routeTypes={routeTypeSet}
            />
          ) : null}
          {visibleNodes.map((node) => (
            <NodeMarker
              key={node.id}
              node={node}
              highlighted={affectedNodeSet.has(node.id)}
              compact={compactMarkers}
            />
          ))}
          <MapControls fitBounds={INDIA_BOUNDS} />
        </MapContainer>

        {showLegend ? (
          <MapLegend
            showRouteTypes={showRoutes}
            showImpact={showImpactLegend}
            compact={false}
          />
        ) : null}

        {stats && status === "ready" ? (
          <div className="pointer-events-none absolute bottom-3 right-3 z-[500] grid grid-cols-2 gap-2 rounded-md border border-white/10 bg-slate-950/80 p-3 text-xs text-white shadow-lg backdrop-blur-md">
            <MapStat label="Nodes" value={String(visibleNodes.length).padStart(2, "0")} />
            <MapStat label="Routes" value={String(visibleRoutes.length).padStart(2, "0")} />
            <MapStat label="At Risk" value={String(nodes.filter((node) => node.status === "AT_RISK").length).padStart(2, "0")} />
            <MapStat label="Disrupted" value={String(nodes.filter((node) => node.status === "DISRUPTED").length).padStart(2, "0")} />
          </div>
        ) : null}

        {status === "loading" ? <MapState label="Loading backend map data" /> : null}
        {status === "error" ? <MapState label={error ?? "Map data unavailable"} tone="error" /> : null}
      </div>
    </div>
  );
}

function FitToBounds({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [28, 28] });
  }, [bounds, map]);

  return null;
}

function MapStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-0.5 font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function MapState({ label, tone = "loading" }: { label: string; tone?: "loading" | "error" }) {
  return (
    <div className="absolute inset-0 z-[600] grid place-items-center bg-slate-950/35 backdrop-blur-[1px]">
      <div
        className={clsx(
          "rounded-md border px-3 py-2 text-xs font-medium shadow-lg",
          tone === "error"
            ? "border-red-400/35 bg-red-950/85 text-red-100"
            : "border-white/10 bg-slate-950/85 text-slate-100"
        )}
      >
        {label}
      </div>
    </div>
  );
}
