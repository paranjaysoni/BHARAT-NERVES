import { ExternalLink } from "lucide-react";
import { SectionCard } from "@/components/shared";

const ports = [
  { efficiency: "92%", name: "Jawaharlal Nehru Port", ships: 24, status: "normal", turnaround: "1.2 Days" },
  { efficiency: "68%", name: "Paradip Port", ships: 18, status: "congested", turnaround: "2.1 Days" },
  { efficiency: "85%", name: "Visakhapatnam Port", ships: 14, status: "normal", turnaround: "1.4 Days" },
  { efficiency: "72%", name: "Kolkata Port", ships: 16, status: "watch", turnaround: "1.9 Days" },
  { efficiency: "90%", name: "Chennai Port", ships: 22, status: "normal", turnaround: "1.3 Days" }
];

const statusClass = {
  congested: "bg-warning",
  normal: "bg-success",
  watch: "bg-warning"
};

const efficiencyClass = {
  congested: "text-danger",
  normal: "text-success",
  watch: "text-warning"
};

export function PortStatusPanel() {
  return (
    <SectionCard
      title="Port Performance"
      action={<span className="type-caption">Today</span>}
      className="h-full"
    >
      <div className="overflow-hidden rounded-md border border-border/70">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/70 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-semibold">Port</th>
              <th className="px-2 py-2 font-semibold">Status</th>
              <th className="px-2 py-2 font-semibold">Ships</th>
              <th className="px-2 py-2 font-semibold">Turnaround</th>
              <th className="px-3 py-2 text-right font-semibold">Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {ports.map((port) => (
              <tr key={port.name} className="transition duration-150 hover:bg-muted/45">
                <td className="max-w-32 truncate px-3 py-2 font-medium text-card-foreground">{port.name}</td>
                <td className="px-2 py-2">
                  <span className={`block h-2 w-2 rounded-full ${statusClass[port.status as keyof typeof statusClass]}`} />
                </td>
                <td className="px-2 py-2 text-muted-foreground">{port.ships}</td>
                <td className="px-2 py-2 text-muted-foreground">{port.turnaround}</td>
                <td className={`px-3 py-2 text-right font-semibold ${efficiencyClass[port.status as keyof typeof efficiencyClass]}`}>
                  {port.efficiency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-secondary mt-4 w-full justify-center">
        View All Ports
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </SectionCard>
  );
}
