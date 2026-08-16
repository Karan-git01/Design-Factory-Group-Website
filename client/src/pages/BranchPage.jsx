import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ArrowLeft, Phone, Mail, Clock, MapPin } from "lucide-react";
import { useApi } from "../context/ApiContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { Reveal } from "../components/Reveal";

function Row({ icon, label, value, as: Tag = "p" }) {
  return (
    <li className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-border pb-5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="label-caps text-muted-foreground">{label}</p>
        <Tag className="mt-1 text-base not-italic text-foreground">{value}</Tag>
      </div>
    </li>
  );
}

function BranchMap({ branch }) {
  return (
    <div
      className="h-[320px] md:h-full md:min-h-[430px]"
      role="group"
      aria-label={`Map showing the location of ${branch.name}`}
    >
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
  );
}

export default function BranchPage() {
  const { slug } = useParams();
  const api = useApi();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageMeta(
    branch?.name ? `${branch.name} | Design Factory Group` : undefined,
    branch ? `${branch.name} — ${branch.address}` : undefined
  );

  useEffect(() => {
    setLoading(true);
    api
      .get(`/branches/${slug}`)
      .then(setBranch)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [api, slug]);

  // LocalBusiness structured data for this branch — each office gets its
  // own entry, linked back to the parent organization, so search engines
  // (and Google Maps / local pack results) can surface the right branch
  // for "near me" style queries.
  const branchSchema = branch
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `Design Factory Group — ${branch.name}`,
        address: branch.address,
        telephone: branch.phone,
        email: branch.email,
        ...(branch.photoUrl && { image: branch.photoUrl }),
        ...(typeof window !== "undefined" && { url: window.location.href }),
        geo: {
          "@type": "GeoCoordinates",
          latitude: branch.latitude,
          longitude: branch.longitude,
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Design Factory Group",
          url: "https://www.designfactorygroup.in/",
        },
      }
    : null;

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <p className="text-muted-foreground">Loading branch details...</p>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl">Branch not found</h1>
        <p className="mt-4 text-muted-foreground">
          This branch may have been removed or the link is incorrect.
        </p>
        <Link
          to="/"
          className="btn-arrow mt-8 inline-flex items-center gap-2 label-caps text-copper"
        >
          <ArrowLeft size={14} /> Back home
        </Link>
      </div>
    );
  }

  const imageAlt = `${branch.name} office — Design Factory Group${
    branch.isMain ? " (Main Branch)" : ""
  }`;

  return (
    <article className="pb-24">
      {branchSchema && (
        // eslint-disable-next-line react/no-danger
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(branchSchema) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Link
          to="/#branches"
          className="btn-arrow inline-flex items-center gap-2 label-caps text-copper"
        >
          <ArrowLeft size={14} /> All branches
        </Link>
      </div>

      <Reveal>
        <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
          <div className="img-zoom relative overflow-hidden rounded-[2rem] border border-border">
            <img
              src={branch.photoUrl}
              alt={imageAlt}
              loading="lazy"
              className="aspect-[16/9] max-h-[420px] w-full object-cover sm:max-h-[460px] md:max-h-[520px]"
            />
            {branch.isMain && (
              <span className="absolute left-5 top-5 label-caps rounded-full bg-copper px-3 py-1.5 text-primary-foreground">
                Main Branch
              </span>
            )}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <Reveal>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            {branch.name}
          </h1>
          <ul className="mt-10 space-y-5">
            <Row
              icon={<MapPin size={16} />}
              label="Address"
              value={branch.address}
              as="address"
            />
            <Row
              icon={<Phone size={16} />}
              label="Phone"
              value={
                <a href={`tel:${branch.phone}`} className="link-underline">
                  {branch.phone}
                </a>
              }
            />
            <Row
              icon={<Mail size={16} />}
              label="Email"
              value={
                <a href={`mailto:${branch.email}`} className="link-underline">
                  {branch.email}
                </a>
              }
            />
            {branch.workingHours && (
              <Row icon={<Clock size={16} />} label="Hours" value={branch.workingHours} />
            )}
          </ul>
        </Reveal>

        <Reveal delay={100} className="h-full">
          <div className="h-full overflow-hidden rounded-3xl border border-border">
            <BranchMap branch={branch} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}