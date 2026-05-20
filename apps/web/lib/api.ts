export type RunStatus = "pending_approval" | "approved" | "running" | "completed" | "canceled";

export type RunItem = {
  id: string;
  agent_name: string;
  goal: string;
  status: RunStatus;
  created_at: string;
  updated_at: string;
};

const API_BASE = process.env.NEXT_PUBLIC_COAGENT_API_URL ?? "http://localhost:8000";

async function asJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }
  return response.json() as Promise<T>;
}

export async function listRuns(status = ""): Promise<RunItem[]> {
  const suffix = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await fetch(`${API_BASE}/runs${suffix}`, { cache: "no-store" });
  const data = await asJson<{ items: RunItem[] }>(response);
  return data.items;
}

export async function createRun(agent_name: string, goal: string): Promise<RunItem> {
  const response = await fetch(`${API_BASE}/runs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent_name, goal }),
  });
  return asJson<RunItem>(response);
}

export async function approveRun(runId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/runs/${runId}/approve`, { method: "POST" });
  await asJson(response);
}

export async function cancelRun(runId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/runs/${runId}/cancel`, { method: "POST" });
  await asJson(response);
}

export async function completeRun(runId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/runs/${runId}/simulate-complete`, { method: "POST" });
  await asJson(response);
}
