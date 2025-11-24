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

  return (
    <div className="min-h-screen hl-page flex flex-col">
      <Navbar />
      <main
        className="
          mx-auto w-full max-w-7xl flex-1
          px-4 sm:px-6 lg:px-8 py-8
          md:pb-8 pb-24
        "
      >
        <Outlet />
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <MobileTaskbar />
    </div>
  );
}
