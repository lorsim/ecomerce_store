import { useEffect, useState } from "react";
import { getMetrics } from "../api";
import Metrics from "../components/Metrics";

export default function AdminPage() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMetrics() {
      setLoading(true);
      try {
        const data = await getMetrics();
        if (!cancelled) {
          setMetrics(data);
          setError("");
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMetrics();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading metrics…</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;
  if (!metrics) return null;

  return (
    <>
      <h3>Admin</h3>
      <Metrics data={metrics} />
    </>
  );
}
