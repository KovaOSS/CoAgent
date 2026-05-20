export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <h3 style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>{label}</h3>
      <p style={{ margin: "10px 0 0", fontSize: 28, fontWeight: 700 }}>{value}</p>
    </div>
  );
}
