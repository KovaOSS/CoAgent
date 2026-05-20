export type AgentRecord = {
  id: string;
  name: string;
  owner: string;
  status: "active" | "draft";
  tools: string[];
  objective: string;
  approvalMode: "human_in_loop" | "auto_for_low_risk";
};

export type TemplateRecord = {
  id: string;
  name: string;
  category: string;
  description: string;
  recommendedTools: string[];
};

const LS_AGENTS_KEY = "coagent.frontend.agents.v1";
const LS_SETTINGS_KEY = "coagent.frontend.settings.v1";

const DEFAULT_AGENTS: AgentRecord[] = [
  {
    id: "agt_001",
    name: "Lead Research Agent",
    owner: "Sales Ops",
    status: "active",
    tools: ["LinkedIn", "Web", "CRM"],
    objective: "Research company + contacts and prepare outreach draft.",
    approvalMode: "human_in_loop",
  },
  {
    id: "agt_002",
    name: "Support Triage Agent",
    owner: "Support",
    status: "draft",
    tools: ["Helpdesk", "Knowledge Base"],
    objective: "Classify support tickets and draft responses for approval.",
    approvalMode: "human_in_loop",
  },
];

export const TEMPLATE_CATALOG: TemplateRecord[] = [
  {
    id: "tpl_001",
    name: "Lead Research Agent",
    category: "Sales",
    description: "Research company + contacts and prepare outreach draft.",
    recommendedTools: ["LinkedIn", "Web", "CRM"],
  },
  {
    id: "tpl_002",
    name: "Support Triage Agent",
    category: "Support",
    description: "Classify tickets and draft responses for approval.",
    recommendedTools: ["Helpdesk", "Knowledge Base", "Slack"],
  },
  {
    id: "tpl_003",
    name: "Meeting Follow-up Agent",
    category: "Operations",
    description: "Summarize meeting notes and generate follow-up tasks.",
    recommendedTools: ["Calendar", "CRM", "Slack"],
  },
];

export function getAgents(): AgentRecord[] {
  if (typeof window === "undefined") return DEFAULT_AGENTS;
  const raw = window.localStorage.getItem(LS_AGENTS_KEY);
  if (!raw) {
    window.localStorage.setItem(LS_AGENTS_KEY, JSON.stringify(DEFAULT_AGENTS));
    return DEFAULT_AGENTS;
  }
  try {
    return JSON.parse(raw) as AgentRecord[];
  } catch {
    return DEFAULT_AGENTS;
  }
}

export function saveAgents(agents: AgentRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_AGENTS_KEY, JSON.stringify(agents));
}

export function createAgentFromTemplate(template: TemplateRecord): AgentRecord {
  return {
    id: `agt_${Date.now()}`,
    name: template.name,
    owner: "Unassigned",
    status: "draft",
    tools: template.recommendedTools,
    objective: template.description,
    approvalMode: "human_in_loop",
  };
}

export function getSettings(): { workspaceName: string; approvalMode: string } {
  if (typeof window === "undefined") return { workspaceName: "CoAgent Demo Workspace", approvalMode: "human_in_loop" };
  const raw = window.localStorage.getItem(LS_SETTINGS_KEY);
  if (!raw) return { workspaceName: "CoAgent Demo Workspace", approvalMode: "human_in_loop" };
  try {
    return JSON.parse(raw) as { workspaceName: string; approvalMode: string };
  } catch {
    return { workspaceName: "CoAgent Demo Workspace", approvalMode: "human_in_loop" };
  }
}

export function saveSettings(workspaceName: string, approvalMode: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify({ workspaceName, approvalMode }));
}
