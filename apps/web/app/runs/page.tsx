"use client";

import { useEffect, useState, type FormEvent } from "react";
import { PageHeader } from "../../components/page-header";
import { createRun, listRuns, type RunItem } from "../../lib/api";

export default function RunsPage() {
  const [runs, setRuns] = useState<RunItem[]>([]);
  const [status, setStatus] = useState("");
  const [agentName, setAgentName] = useState("Lead Research Agent");
  const [goal, setGoal] = useState("Research target account and draft intro email");
  const [error, setError] = useState("");

  async function reload() {
    try {
      setError("");
      setRuns(await listRuns(status));
    } catch {
      setError("Could not reach API. Start backend on port 8000.");
    }
  }

  useEffect(() => { void reload(); }, [status]);

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
        <input value={agentName} onChange={(e) => setAgentName(e.target.value)} required />
        <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} required />
        <button type="submit">Create Run</button>
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
      <table className="table">
        <thead><tr><th>ID</th><th>Agent</th><th>Status</th><th>Goal</th><th>Created</th></tr></thead>
        <tbody>
          {runs.map((run) => (<tr key={run.id}><td>{run.id}</td><td>{run.agent_name}</td><td>{run.status}</td><td>{run.goal}</td><td>{new Date(run.created_at).toLocaleString()}</td></tr>))}
          {!runs.length ? <tr><td colSpan={5}>No runs yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}
