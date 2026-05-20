"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Badge } from "../../components/badge";
import { PageHeader } from "../../components/page-header";
import { createRun, listRuns, type RunItem } from "../../lib/api";

export default function RunsPage() {
  const [runs, setRuns] = useState<RunItem[]>([]);
  const [status, setStatus] = useState("");
  const [agentName, setAgentName] = useState("Lead Research Agent");
  const [goal, setGoal] = useState("Research target account and draft intro email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function reload() {
    try {
      setLoading(true);
      setError("");
      setRuns(await listRuns(status));
    } catch {
      setError("Could not reach API. Start backend on port 8000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createRun(agentName, goal);
    await reload();
  }

  return (
    <div className="grid">
      <PageHeader title="Runs" subtitle="Launch and monitor agent execution runs." />
      <form className="card grid" onSubmit={onSubmit}>
        <h3 style={{ margin: 0 }}>Create Run</h3>
        <label>Agent name<input value={agentName} onChange={(e) => setAgentName(e.target.value)} required /></label>
        <label>Goal<textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} required /></label>
        <button className="primary" type="submit">Create Run</button>
      </form>
      <div className="card">
        <label>Filter by status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option><option value="pending_approval">pending_approval</option>
          <option value="approved">approved</option><option value="running">running</option>
          <option value="completed">completed</option><option value="canceled">canceled</option>
        </select>
      </div>
      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      {loading ? <p>Loading runs…</p> : null}
      <table className="table">
        <thead><tr><th>ID</th><th>Agent</th><th>Status</th><th>Goal</th><th>Created</th></tr></thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id}>
              <td>{run.id}</td>
              <td>{run.agent_name}</td>
              <td><Badge>{run.status}</Badge></td>
              <td>{run.goal}</td>
              <td>{new Date(run.created_at).toLocaleString()}</td>
            </tr>
          ))}
          {!runs.length && !loading ? <tr><td colSpan={5}>No runs yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}
