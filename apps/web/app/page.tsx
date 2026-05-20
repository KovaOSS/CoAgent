import { PageHeader } from "../components/page-header";
import { StatCard } from "../components/stat-card";

const recentEvents = [
  "Lead Research Agent template created",
  "Support Triage Agent draft updated",
  "Workspace setup completed",
];

export default function DashboardPage() {
  return (
    <div className="grid">
      <PageHeader title="Dashboard" subtitle="Track CoAgent usage, throughput, and approvals." />
      <div className="grid cols-3">
        <StatCard label="Total Runs (7d)" value="12" />
        <StatCard label="Pending Approvals" value="3" />
        <StatCard label="Successful Runs" value="9" />
      </div>
      <section className="card">
        <h3 style={{ marginTop: 0 }}>Recent events</h3>
        <ul style={{ marginBottom: 0 }}>
          {recentEvents.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
