import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useApi } from "../context/ApiContext";

export default function BranchPage() {
  const { slug } = useParams();
  const api = useApi();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/branches/${slug}`)
      .then(setBranch)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api, slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink">
        <p className="text-secondary-light">Loading branch details...</p>
      </main>
    );
  }

  if (error || !branch) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-6 text-center">
        <h1 className="font-display text-3xl font-medium text-surface">
          Branch not found
        </h1>
        <p className="text-secondary-light">
          This branch may have been removed or the link is incorrect.
        </p>
        <Link
          to="/"
          className="rounded-full bg-primary px-8 py-3 text-surface transition hover:bg-primary-dark"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-6 pt-32 pb-24 sm:px-12">
      <div className="mb-12 overflow-hidden rounded-3xl">
        <img
          src={branch.photoUrl}
          alt={branch.name}
          className="h-[360px] w-full object-cover sm:h-[480px]"
        />
      </div>

      <div className="mb-3 flex items-center gap-3">
        <h1 className="font-display text-4xl font-medium text-surface sm:text-5xl">
          {branch.name}
        </h1>
        {branch.isMain && (
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-surface">
            Main Branch
          </span>
        )}
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-secondary-light">
              Address
            </p>
            <p className="text-lg text-surface">{branch.address}</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-secondary-light">
              Phone
            </p>
            <a
              href={`tel:${branch.phone}`}
              className="text-lg text-surface hover:text-primary"
            >
              {branch.phone}
            </a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-secondary-light">
              Email
            </p>
            <a
              href={`mailto:${branch.email}`}
              className="text-lg text-surface hover:text-primary"
            >
              {branch.email}
            </a>
          </div>
          {branch.workingHours && (
            <div>
              <p className="text-sm uppercase tracking-wide text-secondary-light">
                Working Hours
              </p>
              <p className="text-lg text-surface">{branch.workingHours}</p>
            </div>
          )}
        </div>

        <div className="h-72 overflow-hidden rounded-3xl sm:h-full">
          <MapContainer
            center={[branch.latitude, branch.longitude]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[branch.latitude, branch.longitude]}>
              <Popup>{branch.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}