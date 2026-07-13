import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { ApiProvider } from "./context/ApiContext";
import SmoothScroll from "./components/SmoothScroll";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import BranchPage from "./pages/BranchPage";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <ApiProvider>
        <SmoothScroll>
          <SplashScreen show={showSplash} />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/branches/:slug" element={<BranchPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </SmoothScroll>
      </ApiProvider>
    </ThemeProvider>
  );
}