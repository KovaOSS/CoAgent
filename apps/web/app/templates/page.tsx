"use client";

import { useState } from "react";
import { PageHeader } from "../../components/page-header";
import { createAgentFromTemplate, getAgents, saveAgents, TEMPLATE_CATALOG } from "../../lib/mock-data";

export default function TemplatesPage() {
  const [message, setMessage] = useState("");

  function useTemplate(templateId: string) {
    const template = TEMPLATE_CATALOG.find((item) => item.id === templateId);
    if (!template) return;
    const existing = getAgents();
    const next = [createAgentFromTemplate(template), ...existing];
    saveAgents(next);
    setMessage(`Template '${template.name}' added to Agents as draft.`);
  }

  return (
    <div className="grid">
      <PageHeader title="Templates" subtitle="Start fast with proven agent blueprints." />
      {message ? <p className="card">{message}</p> : null}
      <div className="grid cols-2">
        {TEMPLATE_CATALOG.map((template) => (
          <article className="card" key={template.id}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ marginTop: 0 }}>{template.name}</h3>
              <small>{template.category}</small>
            </div>
            <p>{template.description}</p>
            <p><strong>Recommended tools:</strong> {template.recommendedTools.join(", ")}</p>
            <button type="button" onClick={() => useTemplate(template.id)}>Use Template</button>
          </article>
        ))}
      </div>
    </div>
  );
}
