import { PageHeader } from "../../components/page-header";

const templates = [
  { name: "Lead Research Agent", category: "Sales", description: "Research company + contacts and prepare outreach draft." },
  { name: "Support Triage Agent", category: "Support", description: "Classify tickets and draft responses for approval." },
  { name: "Meeting Follow-up Agent", category: "Operations", description: "Summarize notes and create CRM follow-up tasks." },
];

export default function TemplatesPage() {
  return (
    <div className="grid">
      <PageHeader title="Templates" subtitle="Start fast with proven agent blueprints." />
      <div className="grid cols-2">
        {templates.map((template) => (
          <article className="card" key={template.name}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h3 style={{ marginTop: 0 }}>{template.name}</h3>
              <small>{template.category}</small>
            </div>
            <p>{template.description}</p>
            <button type="button">Use Template</button>
          </article>
        ))}
      </div>
    </div>
  );
}
