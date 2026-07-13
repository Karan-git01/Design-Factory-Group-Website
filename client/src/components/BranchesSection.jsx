import { useEffect, useState } from "react";
import { useApi } from "../context/ApiContext";
import BranchCard from "./BranchCard";

export default function BranchesSection() {
  const api = useApi();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/branches")
      .then(setBranches)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api]);

  return (
    <section id="branches" className="bg-ink px-6 py-24 sm:px-12">
      <h2 className="font-display mb-12 text-4xl font-medium text-surface sm:text-5xl">
        Our Branches
      </h2>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl bg-secondary/20" />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-secondary-light">Couldn't load branches right now.</p>
      )}

      {!loading && !error && branches.length === 0 && (
        <p className="text-secondary-light">Branch information coming soon.</p>
      )}

      {!loading && !error && branches.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {branches.map((branch) => (
            <BranchCard key={branch._id} branch={branch} />
          ))}
        </div>
      )}
    </section>
  );
}