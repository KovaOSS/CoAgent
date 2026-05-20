import { PageHeader } from "../../components/page-header";

export default function SettingsPage() {
  return (
    <div className="grid">
      <PageHeader title="Settings" subtitle="Configure workspace and integrations." />
      <section className="card grid">
        <h3 style={{ margin: 0 }}>Workspace</h3>
        <label>
          Workspace name
          <input defaultValue="CoAgent Demo Workspace" />
        </label>
      </section>
      <section className="card grid">
        <h3 style={{ margin: 0 }}>Integrations</h3>
        <p style={{ margin: 0 }}>Coming next: Slack, Gmail, HubSpot, Notion.</p>
      </section>
    </div>
  );
}
