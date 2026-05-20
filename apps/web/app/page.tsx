import { PageHeader } from "../components/page-header";

export default function DashboardPage() {
  return (
    <div className="grid">
      <PageHeader title="Dashboard" subtitle="Track CoAgent usage, throughput, and approvals." />
      <div className="grid cols-3">
        <div className="card"><h3>Total Runs</h3><p>0</p></div>
        <div className="card"><h3>Approval Queue</h3><p>0</p></div>
        <div className="card"><h3>Success Rate</h3><p>0%</p></div>
      </div>
      <div className="card">
        <h3>Next step</h3>
        <p>Create your first agent and launch a run from the Runs page.</p>
      </div>
    </div>
  );
}
