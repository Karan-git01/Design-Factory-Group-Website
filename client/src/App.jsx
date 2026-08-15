import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { useScrollToHash } from "./hooks/useScrollToHash";
import { ThemeProvider } from "./context/ThemeContext";
import { ApiProvider } from "./context/ApiContext";
import { LenisProvider } from "./context/LenisContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Route-level code splitting — each page is only downloaded when the user
// actually navigates to it, instead of all being bundled into the initial
// load. Header/Footer/SplashScreen/ProtectedRoute stay as regular imports
// above since they're needed immediately on every route.
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BranchPage = lazy(() => import("./pages/BranchPage"));
const Careers = lazy(() => import("./pages/Careers"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminBranches = lazy(() => import("./pages/admin/AdminBranches"));
const AdminCareers = lazy(() => import("./pages/admin/AdminCareers"));
const AdminEnquiries = lazy(() => import("./pages/admin/AdminEnquiries"));

// Sitewide structured data — helps search engines and AI answer engines
// identify the business as a single, consistent entity. Update the "url"
// once the real domain is live.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Design Factory Group",
  description: "High-end residential and commercial design and build studio.",
  url: "https://designfactorygroup.com",
};

// Shown briefly while a lazy-loaded route chunk is being fetched. Kept
// minimal and on-brand so it doesn't look like a broken/empty page on
// slower connections.
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="label-caps text-muted-foreground">Loading…</span>
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Requires this component to render inside <BrowserRouter> (it does,
  // via main.jsx) since it relies on useLocation() internally. Wired in
  // once here so every /#anchor link across Header/Footer/etc. works
  // consistently, including when already on the page the anchor lives on.
  useScrollToHash();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <ApiProvider>
        <LenisProvider>
          <AdminAuthProvider>
            <script type="application/ld+json">
              {JSON.stringify(organizationSchema)}
            </script>

            <SplashScreen show={showSplash} />
            <ScrollToTop />

            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicLayout>
                      <Home />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PublicLayout>
                      <About />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PublicLayout>
                      <Projects />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <PublicLayout>
                      <ProjectDetail />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/branches/:slug"
                  element={
                    <PublicLayout>
                      <BranchPage />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/careers"
                  element={
                    <PublicLayout>
                      <Careers />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PublicLayout>
                      <Contact />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <PublicLayout>
                      <PrivacyPolicy />
                    </PublicLayout>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <PublicLayout>
                      <TermsOfUse />
                    </PublicLayout>
                  }
                />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/projects"
                  element={
                    <ProtectedRoute>
                      <AdminProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/branches"
                  element={
                    <ProtectedRoute>
                      <AdminBranches />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/careers"
                  element={
                    <ProtectedRoute>
                      <AdminCareers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/enquiries"
                  element={
                    <ProtectedRoute>
                      <AdminEnquiries />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="*"
                  element={
                    <PublicLayout>
                      <NotFound />
                    </PublicLayout>
                  }
                />
              </Routes>
            </Suspense>
          </AdminAuthProvider>
        </LenisProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}