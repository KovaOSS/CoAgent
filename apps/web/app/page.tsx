"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type RunStatus =
  | "pending_approval"
  | "approved"
  | "running"
  | "completed"
  | "canceled";

type RunItem = {
  id: string;
  agent_name: string;
  goal: string;
  status: RunStatus;
  created_at: string;
  updated_at: string;
};

type RunListResponse = {
  items: RunItem[];
  count: number;
};

const API_BASE = process.env.NEXT_PUBLIC_COAGENT_API_URL ?? "http://localhost:8000";

async function fetchRuns(status: string): Promise<RunListResponse> {
  const suffix = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await fetch(`${API_BASE}/runs${suffix}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load runs");
  }
  return response.json();
}

export default function Home() {
  const [agentName, setAgentName] = useState("Lead Research Agent");
  const [goal, setGoal] = useState("Research a lead and prepare outreach draft.");
  const [statusFilter, setStatusFilter] = useState("");
  const [runs, setRuns] = useState<RunItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const visibleCount = useMemo(() => runs.length, [runs]);

  async function loadRuns() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchRuns(statusFilter);
      setRuns(data.items);
    } catch {
      setError("Could not load runs. Is the API running on port 8000?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRuns();
  }, [statusFilter]);

  async function onCreateRun(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch(`${API_BASE}/runs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent_name: agentName, goal }),
    });

    if (!response.ok) {
      setError("Failed to create run.");
      return;
    }

    await loadRuns();
  }

  return (
    <main style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1>CoAgent</h1>
      <p>AI teammates for operations workflows.</p>

      <section style={{ marginTop: 20 }}>
        <h2>Create Agent Run</h2>
        <form onSubmit={onCreateRun} style={{ display: "grid", gap: 8 }}>
          <input value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Agent name" required />
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} placeholder="Goal" required />
          <button type="submit" style={{ width: 180 }}>Create Run</button>
        </form>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Runs</h2>
        <label>
          Filter status:{" "}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="pending_approval">pending_approval</option>
            <option value="approved">approved</option>
            <option value="running">running</option>
            <option value="completed">completed</option>
            <option value="canceled">canceled</option>
          </select>
        </label>

        {loading && <p>Loading runs...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <p>Total visible runs: {visibleCount}</p>

        <table width="100%" cellPadding={8} style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr>
              <th align="left">Run ID</th>
              <th align="left">Agent</th>
              <th align="left">Status</th>
              <th align="left">Goal</th>
              <th align="left">Created</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id} style={{ borderTop: "1px solid #eee" }}>
                <td>{run.id}</td>
                <td>{run.agent_name}</td>
                <td>{run.status}</td>
                <td>{run.goal}</td>
                <td>{new Date(run.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!runs.length && !loading && (
              <tr>
                <td colSpan={5}>No runs yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
