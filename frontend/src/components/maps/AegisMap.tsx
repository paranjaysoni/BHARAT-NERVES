"use client";

import dynamic from "next/dynamic";
import type { AegisMapProps } from "./AegisMapClient";

export type { AegisMapProps } from "./AegisMapClient";

export const AegisMap = dynamic<AegisMapProps>(
  () => import("./AegisMapClient").then((mod) => mod.AegisMap),
  {
    loading: () => (
      <div className="grid min-h-[320px] place-items-center rounded-md border border-border bg-slate-950 text-xs font-medium text-slate-100">
        Loading map
      </div>
    ),
    ssr: false
  }
);
