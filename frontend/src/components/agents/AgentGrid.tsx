import { AgentCard } from "@/components/shared";
import { agentRecommendations, agents } from "@/data";

export function AgentGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {agents.map((agent) => {
        const recommendation = agentRecommendations.find(
          (item) => item.agentId === agent.id
        );

        return (
          <AgentCard
            key={agent.id}
            name={agent.name}
            role={agent.role}
            priority={agent.priority}
            description={recommendation?.recommendation ?? agent.description}
            confidence={recommendation?.confidence}
            status={recommendation?.status ?? "prepared"}
          />
        );
      })}
    </section>
  );
}
