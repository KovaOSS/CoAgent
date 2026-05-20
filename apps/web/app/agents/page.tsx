import { PageHeader } from "../../components/page-header";

const agents = [
  { name: "Lead Research Agent", owner: "Sales Ops", status: "active" },
  { name: "Support Triage Agent", owner: "Support", status: "draft" },
];

export default function AgentsPage() {
  return (
    <div className="grid">
      <PageHeader title="Agents" subtitle="Create and manage reusable AI teammates." />
      <table className="table">
        <thead><tr><th>Name</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.name}><td>{agent.name}</td><td>{agent.owner}</td><td>{agent.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
