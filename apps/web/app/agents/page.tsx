"use client";

import { useMemo, useState } from "react";
import { Badge } from "../../components/badge";
import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";
import { createAgentFromTemplate, getAgents, saveAgents, TEMPLATE_CATALOG, type AgentRecord } from "../../lib/mock-data";

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentRecord[]>(() => getAgents());
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("Operations");
  const [objective, setObjective] = useState("");
  const [tools, setTools] = useState("Slack, Gmail");
  const activeCount = useMemo(() => agents.filter((a) => a.status === "active").length, [agents]);

  function createAgent() {
    if (!name.trim() || !objective.trim()) return;
    const next: AgentRecord = {
      id: `agt_${Date.now()}`,
      name: name.trim(),
      owner: owner.trim() || "Unassigned",
      status: "draft",
      tools: tools.split(",").map((item) => item.trim()).filter(Boolean),
      objective,
      approvalMode: "human_in_loop",
    };
    const updated = [next, ...agents];
    setAgents(updated);
    saveAgents(updated);
    setName("");
    setObjective("");
  }

  function quickImportTemplate() {
    const template = TEMPLATE_CATALOG[0];
    const next = [createAgentFromTemplate(template), ...agents];
    setAgents(next);
    saveAgents(next);
  }

  return (
    <div className="grid">
      <PageHeader title="Agents" subtitle="Create, edit, and track reusable AI teammates." />
      <div className="card grid cols-2">
        <div className="grid">
          <h3 style={{ margin: 0 }}>Create Agent</h3>
          <label>Agent Name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Renewal Risk Agent" /></label>
          <label>Owner<input value={owner} onChange={(e) => setOwner(e.target.value)} /></label>
          <label>Objective<textarea rows={3} value={objective} onChange={(e) => setObjective(e.target.value)} /></label>
          <label>Tools (comma separated)<input value={tools} onChange={(e) => setTools(e.target.value)} /></label>
          <div className="row"><button className="primary" type="button" onClick={createAgent}>Save Agent</button><button type="button" onClick={quickImportTemplate}>Import Sales Template</button></div>
        </div>
        <div className="card">
          <h4 style={{ marginTop: 0 }}>Agent Summary</h4>
          <p>Total Agents: {agents.length}</p>
          <p>Active: {activeCount}</p>
          <p>Drafts: {agents.length - activeCount}</p>
        </div>
      </div>

      {agents.length ? (
        <table className="table">
          <thead><tr><th>Name</th><th>Owner</th><th>Status</th><th>Tools</th><th>Objective</th></tr></thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.name}</td><td>{agent.owner}</td><td><Badge>{agent.status}</Badge></td><td>{agent.tools.join(", ")}</td><td>{agent.objective}</td>
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
