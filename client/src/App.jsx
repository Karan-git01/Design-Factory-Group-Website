import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { ApiProvider } from "./context/ApiContext";
import { LenisProvider } from "./context/LenisContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ScrollToTop from "./components/ScrollToTop";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import BranchPage from "./pages/BranchPage";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminBranches from "./pages/admin/AdminBranches";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminEnquiries from "./pages/admin/AdminEnquiries";

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

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

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
          </AdminAuthProvider>
        </LenisProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}
