"use client";

import { useState } from "react";
import { PageHeader } from "../../components/page-header";
import { getSettings, saveSettings } from "../../lib/mock-data";

export default function SettingsPage() {
  const seed = getSettings();
  const [workspaceName, setWorkspaceName] = useState(seed.workspaceName);
  const [approvalMode, setApprovalMode] = useState(seed.approvalMode);
  const [notice, setNotice] = useState("");

  function persistSettings() {
    saveSettings(workspaceName, approvalMode);
    setNotice("Settings saved locally.");
  }

import { PageHeader } from "../../components/page-header";

export default function SettingsPage() {
  return (
    <div className="grid">
      <PageHeader title="Settings" subtitle="Configure workspace and integrations." />
      <section className="card grid">
        <h3 style={{ margin: 0 }}>Workspace</h3>
        <label>Workspace name<input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} /></label>
        <label>Default approval mode
          <select value={approvalMode} onChange={(e) => setApprovalMode(e.target.value)}>
        <label>
          Workspace name
          <input defaultValue="CoAgent Demo Workspace" />
        </label>
        <label>
          Default approval mode
          <select defaultValue="human_in_loop">
            <option value="human_in_loop">Human in the loop</option>
            <option value="auto_for_low_risk">Auto approve low risk</option>
          </select>
        </label>
        <div><button className="primary" type="button" onClick={persistSettings}>Save Settings</button></div>
        {notice ? <small>{notice}</small> : null}
      </section>
      <section className="card grid">
        <h3 style={{ margin: 0 }}>Integrations</h3>
        <div className="row"><button type="button">Connect Slack</button><button type="button">Connect Gmail</button><button type="button">Connect HubSpot</button></div>
      </section>
    </div>
  );
}
