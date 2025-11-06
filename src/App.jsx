import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Inbox from "./pages/Inbox";
import MyRides from "./pages/MyRides";
import MyCar from "./pages/MyCar";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import RequireAuth from "./routes/RequireAuth";
import Requests from "./pages/Requests";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* ---------- Public routes ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<Explore />} />

        {/* ---------- Protected routes ---------- */}
        <Route element={<RequireAuth />}>
          {/* General logged-in routes */}
          <Route path="/history" element={<History />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />

          {/* Driver-only pages */}
          <Route path="/my-rides" element={<MyRides />} />
          <Route path="/my-car" element={<MyCar />} />
        </Route>

        {/* ---------- Auth routes ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ---------- 404 fallback ---------- */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
