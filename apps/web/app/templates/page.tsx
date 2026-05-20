import { PageHeader } from "../../components/page-header";

const templates = [
  { name: "Lead Research Agent", description: "Research company + contacts and prepare outreach draft." },
  { name: "Support Triage Agent", description: "Classify tickets and draft responses for approval." },
  { name: "Meeting Follow-up Agent", description: "Summarize notes and create CRM follow-up tasks." },
];

export default function TemplatesPage() {
  return (
    <div className="grid">
      <PageHeader title="Templates" subtitle="Start fast with proven agent blueprints." />
      {templates.map((template) => (
        <article className="card" key={template.name}>
          <h3 style={{ marginTop: 0 }}>{template.name}</h3>
          <p style={{ marginBottom: 0 }}>{template.description}</p>
        </article>
      ))}
    </div>
  );
}
