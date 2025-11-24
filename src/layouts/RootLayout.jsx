// src/layouts/RootLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import MobileTaskbar from "../components/navigation/MobileTaskbar";

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isChatRoute =
    pathname.startsWith("/demo/rides/") && pathname.endsWith("/chat");

  // Always use hl-page so your index.css tokens control colors
  // (bg-gray-50 / dark:bg-slate-950, etc.)
  const rootClassName = "min-h-screen hl-page flex flex-col";

  // Only change layout (padding / max-width) for chat vs normal pages
  const mainClassName = isChatRoute
    ? // Chat: full width & height, no max-width, no padding
      "flex-1 flex w-full"
    : // Normal pages: your existing centered layout with padding
      "mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8 md:pb-8 pb-24";

  return (
    <div className={rootClassName}>
      <Navbar />

      <main className={mainClassName}>
        <Outlet />
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <MobileTaskbar />
    </div>
  );
}
