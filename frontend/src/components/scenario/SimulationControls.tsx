import type { ReactNode } from "react";
import { RotateCcw, ShieldAlert, Sparkles } from "lucide-react";
import { SectionCard, StatusBadge } from "@/components/shared";

export type SimulationMode = "idle" | "activated" | "previewed";

export interface SimulationControlsProps {
  mode: SimulationMode;
  onActivate: () => void;
  onPreview: () => void;
  onReset: () => void;
}

export function SimulationControls({
  mode,
  onActivate,
  onPreview,
  onReset
}: SimulationControlsProps) {
  return (
    <SectionCard
      title="Simulation Controls"
      description="Visual controls only. No simulation engine is executed."
      action={<StatusBadge label={mode} variant={mode === "idle" ? "neutral" : "info"} />}
    >
      <div className="grid gap-3">
        <ControlButton
          label="Activate Scenario"
          description="Mark the selected scenario as locally activated."
          icon={<ShieldAlert className="h-4 w-4" aria-hidden="true" />}
          onClick={onActivate}
        />
        <ControlButton
          label="Preview Impact"
          description="Switch local UI state to preview mode."
          icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
          onClick={onPreview}
        />
        <ControlButton
          label="Reset Scenario"
          description="Return the simulator preview to idle state."
          icon={<RotateCcw className="h-4 w-4" aria-hidden="true" />}
          onClick={onReset}
        />
      </div>
    </SectionCard>
  );
}

function ControlButton({
  label,
  description,
  icon,
  onClick
}: {
  label: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="surface-card focus-ring rounded-md p-4 text-left hover:bg-secondary/35"
    >
      <span className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary shadow-sm">
          {icon}
        </span>
        <span>
          <span className="type-card-title block">{label}</span>
          <span className="type-caption mt-1 block">
            {description}
          </span>
        </span>
      </span>
    </button>
  );
}
