import "./App.css";
import "./index.css";
import "./css/responsive.css";
import "./css/Volunteer.css";
import "./css/Dashboard.css";
import GoogleTranslate from "./components/GoogleTranslate";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// =====================================================
// LAYOUT
// =====================================================

import Layout from "./components/Layout";

// =====================================================
// LANDING PAGE SECTIONS
// =====================================================

import Hero from "./components/Hero";
import UpcomingEvent from "./components/UpcomingEvent";
import About from "./components/About";
import Programs from "./components/Programs";
import Campaigns from "./components/Campaigns";
import Impact from "./components/Impact";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import DonateSection from "./components/DonateSection";

import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// =====================================================
// AUTHENTICATION
// =====================================================

import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

// =====================================================
// PROTECTED ROUTE
// =====================================================

import ProtectedRoute from "./components/ProtectedRoute";

// =====================================================
// DONATION
// =====================================================

import Donate from "./components/Donate";
import DonationCheckout from "./components/DonationCheckout";
import DonationReceipt from "./components/DonationReceipt";

// =====================================================
// VOLUNTEER PAGES
// =====================================================

import Volunteer from "./pages/Volunteer";
import VolunteerApplication from "./pages/VolunteerApplication";
import ApplicationStatus from "./pages/ApplicationStatus";
import VolunteerProfile from "./pages/VolunteerProfile";
import EventDetails from "./pages/EventDetails";
import VolunteerTasks from "./pages/VolunteerTasks";
import VolunteerImpact from "./pages/VolunteerImpact";
import VolunteerCertificates from "./pages/VolunteerCertificates";

// =====================================================
// COMMUNITY
// =====================================================

import Community from "./pages/Community";
import JoinCommunity from "./pages/JoinCommunity";
import CommunityInvitation from "./pages/CommunityInvitation";

// =====================================================
// TRANSPARENCY
// =====================================================

import Transparency from "./pages/Transparency";

// =====================================================
// MAIN DASHBOARD
// =====================================================

import Dashboard from "./pages/Dashboard";

// =====================================================
// ADMIN
// =====================================================

import Admin from "./pages/Admin/Admin";

import ScrollToTop from "./components/ScrollToTop";
// =====================================================
// APP CONTENT
// =====================================================

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/volunteer/certificates";

  return (
    <Routes>
      {/* =================================================
          PAGES WITH NAVBAR / LAYOUT
      ================================================= */}

      <Route element={<Layout hideNavbar={hideNavbar} />}>
        {/* =================================================
            HOME / LANDING PAGE
        ================================================= */}

        <Route
          path="/"
          element={
            <>
              <UpcomingEvent />
              <Hero />
              <About />
              <Programs />
              <Impact />
              <Campaigns />
              <Gallery />
              <Events />
              <Testimonials />
              <DonateSection />
              <Volunteers />
              <FAQ />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* =================================================
            COMMUNITY
        ================================================= */}

        <Route path="/community" element={<Community />} />

        <Route path="/community/join" element={<JoinCommunity />} />

        {/* =================================================
            TRANSPARENCY
        ================================================= */}

        <Route path="/transparency" element={<Transparency />} />

        {/* =================================================
            DONATION
        ================================================= */}

        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate/checkout"
          element={
            <ProtectedRoute>
              <DonationCheckout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donate/receipt/:id"
          element={
            <ProtectedRoute>
              <DonationReceipt />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            MAIN USER DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            VOLUNTEER MAIN PAGE
        ================================================= */}

        <Route
          path="/volunteer"
          element={
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            VOLUNTEER APPLICATION
        ================================================= */}

        <Route
          path="/volunteer/application"
          element={
            <ProtectedRoute>
              <VolunteerApplication />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            APPLICATION STATUS
        ================================================= */}

        <Route
          path="/volunteer/application-status"
          element={
            <ProtectedRoute>
              <ApplicationStatus />
            </ProtectedRoute>
          }
        />

        {/* Short URL for Application Status */}

        <Route
          path="/volunteer/status"
          element={
            <ProtectedRoute>
              <ApplicationStatus />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            VOLUNTEER PROFILE
        ================================================= */}

        <Route
          path="/volunteer/profile"
          element={
            <ProtectedRoute>
              <VolunteerProfile />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            EVENT DETAILS
        ================================================= */}

        <Route
          path="/volunteer/events/:eventId"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            VOLUNTEER TASKS
        ================================================= */}

        <Route
          path="/volunteer/tasks"
          element={
            <ProtectedRoute>
              <VolunteerTasks />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            VOLUNTEER IMPACT
        ================================================= */}

        <Route
          path="/volunteer/impact"
          element={
            <ProtectedRoute>
              <VolunteerImpact />
            </ProtectedRoute>
          }
        />

        {/* =================================================
            VOLUNTEER CERTIFICATES
            NAVBAR HIDDEN ON THIS PAGE
        ================================================= */}

        <Route
          path="/volunteer/certificates"
          element={
            <ProtectedRoute>
              <VolunteerCertificates />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* =================================================
          AUTHENTICATION PAGES
          NO NAVBAR
      ================================================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* =================================================
          ADMIN
      ================================================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* =================================================
              PUBLIC PAGES WITH NAVBAR
          ================================================= */}

          <Route element={<Layout />}>
            {/* =================================================
                HOME / LANDING PAGE
            ================================================= */}

            <Route
              path="/"
              element={
                <>
                  <UpcomingEvent />
                  <Hero />
                  <About />
                  <Programs />
                  <Impact />
                  <Campaigns />
                  <Gallery />
                  <Events />
                  <Testimonials />
                  <DonateSection />
                  <FAQ />
                  <Contact />
                  <Footer />
                </>
              }
            />

            {/* =================================================
                PUBLIC INFORMATION PAGES
            ================================================= */}

            <Route path="/community" element={<Community />} />

            <Route path="/transparency" element={<Transparency />} />

            <Route
              path="/community/invite/:token"
              element={<CommunityInvitation />}
            />

            {/* =================================================
                COMMUNITY JOIN
                USER / VOLUNTEER ONLY
            ================================================= */}

            <Route
              path="/community/join"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <JoinCommunity />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                DONATION
                USER / VOLUNTEER ONLY
            ================================================= */}

            <Route
              path="/donate"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <Donate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/donate/checkout"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <DonationCheckout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/donate/receipt/:id"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <DonationReceipt />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                MAIN USER DASHBOARD
                USER / VOLUNTEER ONLY
            ================================================= */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                VOLUNTEER FLOW
                USER / VOLUNTEER ONLY
            ================================================= */}

            {/* Volunteer Home */}

            <Route
              path="/volunteer"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <Volunteer />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Application */}

            <Route
              path="/volunteer/application"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <VolunteerApplication />
                </ProtectedRoute>
              }
            />

            {/* Application Status */}

            <Route
              path="/volunteer/application-status"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <ApplicationStatus />
                </ProtectedRoute>
              }
            />

            {/* Short URL for Application Status */}

            <Route
              path="/volunteer/status"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <ApplicationStatus />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Profile */}

            <Route
              path="/volunteer/profile"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <VolunteerProfile />
                </ProtectedRoute>
              }
            />

            {/* Event Details */}

            <Route
              path="/volunteer/events/:eventId"
              element={
                <ProtectedRoute allowedRoles={["USER", "VOLUNTEER"]}>
                  <EventDetails />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Tasks */}

            <Route
              path="/volunteer/tasks"
              element={
                <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
                  <VolunteerTasks />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Impact */}

            <Route
              path="/volunteer/impact"
              element={
                <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
                  <VolunteerImpact />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Certificates */}

            <Route
              path="/volunteer/certificates"
              element={
                <ProtectedRoute allowedRoles={["VOLUNTEER"]}>
                  <VolunteerCertificates />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* =================================================
              AUTHENTICATION PAGES
              NO NAVBAR
          ================================================= */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* =================================================
              ADMIN
              ADMIN ONLY
          ================================================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
