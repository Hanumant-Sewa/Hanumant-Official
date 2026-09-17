import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];

  const hideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Outlet />
    </>
  );
}

export default Layout;
