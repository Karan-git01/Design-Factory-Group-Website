import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useApi } from "../context/ApiContext";
import { usePageMeta } from "../hooks/usePageMeta";

export default function BranchPage() {
  const { slug } = useParams();
  const api = useApi();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageMeta(branch?.name, branch ? `${branch.name} — ${branch.address}` : undefined);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/branches/${slug}`)
      .then(setBranch)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api, slug]);

  const branchSchema = branch
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `Design Factory Group — ${branch.name}`,
        address: branch.address,
        telephone: branch.phone,
        email: branch.email,
        geo: {
          "@type": "GeoCoordinates",
          latitude: branch.latitude,
          longitude: branch.longitude,
        },
      }
    : null;

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
    <main className="min-h-screen border-t border-secondary/20 bg-ink pt-28 pb-20">
      {branchSchema && (
        <script type="application/ld+json">{JSON.stringify(branchSchema)}</script>
      )}

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-[10px] uppercase tracking-[0.45em] text-secondary-light">
            Our Branch
          </span>
        </div>

        <div className="mb-14 overflow-hidden rounded-[1.75rem] border border-secondary/20">
          <img
            src={branch.photoUrl}
            alt={branch.name}
            loading="lazy"
            className="h-[260px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[360px] lg:h-[470px]"
          />
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            {branch.isMain && (
              <span className="mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-primary">
                Main Branch
              </span>
            )}
            <h1 className="font-display text-4xl font-light leading-[0.94] tracking-[-0.05em] text-surface sm:text-5xl lg:text-6xl">
              {branch.name}
            </h1>
          </div>

          <p className="text-sm leading-7 text-secondary-light">
            Visit our office to discuss your residential or commercial project
            with our architecture and construction team.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="rounded-[1.75rem] border border-secondary/20 bg-ink-light p-7">
            <div className="space-y-7">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-secondary">
                  Address
                </p>
                <p className="text-[15px] leading-7 text-surface/90">{branch.address}</p>
              </div>

              <div className="border-t border-secondary/20 pt-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-secondary">
                  Phone
                </p>
                <a
                  href={`tel:${branch.phone}`}
                  className="text-[15px] text-surface/90 transition hover:text-primary"
                >
                  {branch.phone}
                </a>
              </div>

              <div className="border-t border-secondary/20 pt-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-secondary">
                  Email
                </p>
                <a
                  href={`mailto:${branch.email}`}
                  className="break-all text-[15px] text-surface/90 transition hover:text-primary"
                >
                  {branch.email}
                </a>
              </div>

              {branch.workingHours && (
                <div className="border-t border-secondary/20 pt-6">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-secondary">
                    Working Hours
                  </p>
                  <p className="text-[15px] text-surface/90">{branch.workingHours}</p>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-secondary/20">
            <div className="h-[320px] lg:h-full lg:min-h-[430px]">
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
        </div>
      </div>
    </main>
  );
}