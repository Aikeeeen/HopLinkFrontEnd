import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import RootLayout from "./layouts/RootLayout";
import { trackPageView } from "./lib/tracking";
import CookieConsent from "./components/ui/CookieConsent";
import CookieSettings from "./components/ui/CookieSettings";

// Demo app pages
import Home from "./pages/demo/Home";
import About from "./pages/demo/About";
import Contact from "./pages/demo/Contact";
import Explore from "./pages/demo/Explore";
import History from "./pages/demo/History";
import Inbox from "./pages/demo/Inbox";
import MyRides from "./pages/demo/MyRides";
import MyCar from "./pages/demo/MyCar";
import Settings from "./pages/demo/Settings";
import Support from "./pages/demo/Support";
import Login from "./pages/demo/Login";
import Register from "./pages/demo/Register";
import NotFound from "./pages/demo/NotFound";
import Requests from "./pages/demo/Requests";
import RequireAuth from "./routes/RequireAuth";

// NEW: ride detail + chat
import RideDetail from "./pages/demo/RideDetail";
import RideChat from "./pages/demo/RideChat";

// Landing page
import LandingPage from "./pages/landingpage/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return (
    <>
      <CookieConsent />
      <CookieSettings />
      <Routes>
        {/* Public marketing site */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Demo application (shell + navbar + footer etc.) */}
        <Route path="/demo" element={<RootLayout />}>
          {/* Public demo pages */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="explore" element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Auth-protected demo pages */}
          <Route element={<RequireAuth />}>
            <Route path="history" element={<History />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="requests" element={<Requests />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="my-rides" element={<MyRides />} />
            <Route path="my-car" element={<MyCar />} />

            {/* 🔹 New ride routes */}
            <Route path="rides/:rideId" element={<RideDetail />} />
            <Route path="rides/:rideId/chat" element={<RideChat />} />
          </Route>
        </Route>

        {/* Global fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
