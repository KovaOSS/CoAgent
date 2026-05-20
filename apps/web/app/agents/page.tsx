import { Badge } from "../../components/badge";
import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";

const agents = [
  { name: "Lead Research Agent", owner: "Sales Ops", status: "active", tools: "LinkedIn, Web, CRM" },
  { name: "Support Triage Agent", owner: "Support", status: "draft", tools: "Helpdesk, Knowledge Base" },
];

export default function AgentsPage() {
  return (
    <div className="grid">
      <PageHeader title="Agents" subtitle="Create and manage reusable AI teammates." />
      <div className="row">
        <button className="primary" type="button">Create Agent</button>
        <button type="button">Import Template</button>
      </div>
      {agents.length ? (
        <table className="table">
          <thead><tr><th>Name</th><th>Owner</th><th>Status</th><th>Tools</th></tr></thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.name}>
                <td>{agent.name}</td><td>{agent.owner}</td><td><Badge>{agent.status}</Badge></td><td>{agent.tools}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState title="No agents yet" description="Create your first agent to automate operational workflows." />
      )}
    </div>
  );
}
