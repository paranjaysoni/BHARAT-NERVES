import { SectionCard } from "@/components/shared";

export function IntegrationNotes() {
  return (
    <SectionCard title="Integration Notes">
      <p>
        Current MVP uses structured mock resources to keep the demo coherent and
        reviewable. Future versions can connect this library to real datasets,
        APIs, government sources, weather feeds, port systems, railway systems
        and logistics providers through a validated ingestion pipeline.
      </p>
    </SectionCard>
  );
}
