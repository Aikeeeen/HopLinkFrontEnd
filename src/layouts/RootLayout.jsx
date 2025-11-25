import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import MobileTaskbar from "../components/navigation/MobileTaskbar";
import DemoWarning from "../components/demo/DemoWarning";

export default function RootLayout() {
  const { pathname } = useLocation();
  const isChatRoute =
    pathname.startsWith("/demo/rides/") && pathname.endsWith("/chat");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const rootClassName =
    "min-h-screen h-screen overflow-hidden hl-page flex flex-col";

  const mainClassName = isChatRoute
    ? "flex-1 flex w-full h-full overflow-hidden"
    : "mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8 md:pb-8 pb-24";

  return (
    <div className={rootClassName}>
      {!isChatRoute && <DemoWarning />}

      {/* Always visible */}
      <Navbar />

      <main className={mainClassName}>
        <Outlet />
      </main>

      {!isChatRoute && (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}

      {/* Always visible at bottom on mobile */}
      <MobileTaskbar />
    </div>
  );
}
