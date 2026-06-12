import { SectionCard } from "@/components/shared";
import { forecastNotes } from "@/data";

export function ForecastNotes() {
  return (
    <SectionCard title="Forecast Notes" description="Staged implementation notes for future impact modeling.">
      <ul className="space-y-2">
        {forecastNotes.map((note) => (
          <li key={note} className="text-sm leading-6 text-muted-foreground">{note}</li>
        ))}
      </ul>
    </SectionCard>
  );
}
