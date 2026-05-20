"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Badge } from "../../components/badge";
import { PageHeader } from "../../components/page-header";
import { approveRun, cancelRun, completeRun, createRun, listRuns, type RunItem } from "../../lib/api";
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
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedRun = useMemo(() => runs[0], [runs]);

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
    setNotice("Run created.");
    await reload();
  }

  async function runAction(action: "approve" | "cancel" | "complete", runId: string) {
    try {
      setError("");
      if (action === "approve") await approveRun(runId);
      if (action === "cancel") await cancelRun(runId);
      if (action === "complete") await completeRun(runId);
      setNotice(`Run ${action} action completed.`);
      await reload();
    } catch {
      setError(`Failed to ${action} run.`);
    }
  }

  return (
    <div className="grid">
      <PageHeader title="Runs" subtitle="Launch and monitor agent execution runs." />
      {notice ? <p className="card">{notice}</p> : null}
      <div className="grid cols-2">
        <form className="card grid" onSubmit={onSubmit}>
          <h3 style={{ margin: 0 }}>Create Run</h3>
          <label>Agent name<input value={agentName} onChange={(e) => setAgentName(e.target.value)} required /></label>
          <label>Goal<textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={3} required /></label>
          <button className="primary" type="submit">Create Run</button>
        </form>

        <section className="card grid">
          <h3 style={{ margin: 0 }}>Run Detail</h3>
          {selectedRun ? (
            <>
              <p><strong>ID:</strong> {selectedRun.id}</p>
              <p><strong>Agent:</strong> {selectedRun.agent_name}</p>
              <p><strong>Status:</strong> <Badge>{selectedRun.status}</Badge></p>
              <div className="row">
                <button type="button" onClick={() => runAction("approve", selectedRun.id)}>Approve</button>
                <button type="button" onClick={() => runAction("complete", selectedRun.id)}>Complete</button>
                <button type="button" onClick={() => runAction("cancel", selectedRun.id)}>Cancel</button>
              </div>
            </>
          ) : (
            <p>No runs yet.</p>
          )}
        </section>
      </div>

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
        <thead><tr><th>ID</th><th>Agent</th><th>Status</th><th>Goal</th><th>Created</th><th>Actions</th></tr></thead>
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
              <td className="row">
                <button type="button" onClick={() => runAction("approve", run.id)}>Approve</button>
                <button type="button" onClick={() => runAction("complete", run.id)}>Complete</button>
                <button type="button" onClick={() => runAction("cancel", run.id)}>Cancel</button>
              </td>
            </tr>
          ))}
          {!runs.length && !loading ? <tr><td colSpan={6}>No runs yet.</td></tr> : null}
            </tr>
          ))}
          {!runs.length && !loading ? <tr><td colSpan={5}>No runs yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}
