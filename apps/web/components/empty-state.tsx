export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ marginBottom: 0, color: "#6b7280" }}>{description}</p>
    </div>
  );
}
