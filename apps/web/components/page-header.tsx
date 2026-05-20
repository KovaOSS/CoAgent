export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p style={{ margin: "6px 0 0", color: "#4b5563" }}>{subtitle}</p>
    </header>
  );
}
