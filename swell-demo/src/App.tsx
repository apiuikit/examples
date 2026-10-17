import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import SurfCheckGuide from "./pages/SurfCheckGuide";
import ApiReference from "./pages/ApiReference";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/developers" element={<Introduction />} />
        <Route path="/developers/guides/surf-check" element={<SurfCheckGuide />} />
        <Route path="/developers/reference/:api" element={<ApiReference />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </>
  );
}
