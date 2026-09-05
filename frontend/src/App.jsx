import "./App.css";
import "./index.css";
import "./css/responsive.css";
import "./css/Volunteer.css";
import "./css/Dashboard.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Volunteers from "./components/Volunteers";
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
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerProfile from "./pages/VolunteerProfile";
import VolunteerEvents from "./pages/VolunteerEvents";
import EventDetails from "./pages/EventDetails";
import VolunteerTasks from "./pages/VolunteerTasks";
import VolunteerImpact from "./pages/VolunteerImpact";
import VolunteerCertificates from "./pages/VolunteerCertificates";

// =====================================================
// COMMUNITY
// =====================================================

import Community from "./pages/Community";
import JoinCommunity from "./pages/JoinCommunity";

// =====================================================
// TRANSPARENCY
// =====================================================

import Transparency from "./pages/Transparency";

// =====================================================
// MAIN DASHBOARD
// =====================================================

import Dashboard from "./pages/Dashboard";

import Admin from "./pages/Admin/Admin";
// =====================================================
// APP
// =====================================================

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
                  <Volunteers />
                  <FAQ />
                  <Contact />
                  <Footer />
                </>
              }
            />

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
                VOLUNTEER FLOW
            ================================================= */}

            {/* Volunteer Home */}

            <Route
              path="/volunteer"
              element={
                <ProtectedRoute>
                  <Volunteer />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Application */}

            <Route
              path="/volunteer/application"
              element={
                <ProtectedRoute>
                  <VolunteerApplication />
                </ProtectedRoute>
              }
            />

            {/* Application Status */}

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

            {/* Volunteer Dashboard */}

            <Route
              path="/volunteer/dashboard"
              element={
                <ProtectedRoute>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Profile */}

            <Route
              path="/volunteer/profile"
              element={
                <ProtectedRoute>
                  <VolunteerProfile />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Events */}

            <Route
              path="/volunteer/events"
              element={
                <ProtectedRoute>
                  <VolunteerEvents />
                </ProtectedRoute>
              }
            />

            {/* Event Details */}

            <Route
              path="/volunteer/events/:eventId"
              element={
                <ProtectedRoute>
                  <EventDetails />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Tasks */}

            <Route
              path="/volunteer/tasks"
              element={
                <ProtectedRoute>
                  <VolunteerTasks />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Impact */}

            <Route
              path="/volunteer/impact"
              element={
                <ProtectedRoute>
                  <VolunteerImpact />
                </ProtectedRoute>
              }
            />

            {/* Volunteer Certificates */}

            <Route
              path="/volunteer/certificates"
              element={
                <ProtectedRoute>
                  <VolunteerCertificates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
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
              PUBLIC PAGES
          ================================================= */}

          <Route path="/community" element={<Community />} />

          <Route path="/transparency" element={<Transparency />} />

          <Route path="/community/join" element={<JoinCommunity />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
