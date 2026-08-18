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
        {/* FIX: was https://{s}.tile.openstreetmap.org/... — OSM's own
            usage policy reserves that endpoint for low-volume/dev use and
            explicitly asks production sites to use a dedicated tile
            provider. Swapped to CARTO's free Voyager basemap, which is
            built for production traffic and needs no API key. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
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
    branch?.name,
    branch ? `${branch.name} — ${branch.address}` : undefined,
    branch ? `/branches/${slug}` : undefined
  );

  useEffect(() => {
    // FIX: this component stays mounted across `/branches/:slug` ->
    // `/branches/:otherSlug` navigations (only `slug` changes), so a slow
    // first request could resolve after a second one and overwrite the
    // correct branch with stale data — plus a setState-after-unmount
    // warning if the user navigates away entirely before it resolves.
    // Same guard already used in Careers.jsx.
    let ignore = false;

    setLoading(true);
    setError(null);

    api
      .get(`/branches/${slug}`)
      .then((data) => {
        if (!ignore) setBranch(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [api, slug]);

  // FIX: guard against a branch record missing (or having non-numeric)
  // coordinates. Previously MapContainer received center={[undefined,
  // undefined]} in that case, which throws and crashes the whole page —
  // and the JSON-LD below would have emitted an invalid GeoCoordinates
  // block. Now both fall back gracefully instead.
  const lat = branch ? Number(branch.latitude) : NaN;
  const lng = branch ? Number(branch.longitude) : NaN;
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);

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
        ...(hasCoords && {
          geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
        }),
        parentOrganization: {
          "@type": "Organization",
          name: "Design Factory Group",
          // FIX: was "https://www.designfactorygroup.in/" — every other
          // file (Header.jsx JSON-LD, index.html canonical/OG) uses
          // designfactorygroup.com. Flagging per the conflict-reporting
          // rule rather than silently picking one — please confirm .com
          // is correct; reverting this is a one-line change if not.
          url: "https://www.designfactorygroup.com/",
        },
      }
    : null;

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center" role="status" aria-live="polite">
        <p className="text-muted-foreground">Loading branch details...</p>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center" role="alert">
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
          <div className="img-zoom relative overflow-hidden rounded-sm border border-border">
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
            {/* FIX: only render the map when we have valid coordinates;
                otherwise show a plain fallback instead of crashing. */}
            {hasCoords ? (
              <BranchMap branch={{ ...branch, latitude: lat, longitude: lng }} />
            ) : (
              <div className="grid h-full min-h-[320px] place-items-center p-8 text-center text-sm text-muted-foreground">
                Map unavailable for this branch.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}