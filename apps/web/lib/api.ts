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

export async function listRuns(status = ""): Promise<RunItem[]> {
  const suffix = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await fetch(`${API_BASE}/runs${suffix}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch runs");
  const data = (await response.json()) as { items: RunItem[] };
  return data.items;
}

export async function createRun(agent_name: string, goal: string): Promise<RunItem> {
  const response = await fetch(`${API_BASE}/runs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent_name, goal }),
  });
  if (!response.ok) throw new Error("Failed to create run");
  return response.json();
}
