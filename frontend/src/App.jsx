import "./App.css";
import "./index.css";
import "./css/responsive.css";
import "./css/Volunteer.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Landing Page Sections
import Hero from "./components/Hero";
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

// Authentication
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

// Donation
import Donate from "./components/Donate";
import DonationCheckout from "./components/DonationCheckout";
import DonationReceipt from "./components/DonationReceipt";

// Volunteer Pages
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

//community page
import Community from "./pages/Community";
//transparency
import Transparency from "./pages/Transparency";

import JoinCommunity from "./pages/JoinCommunity";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================================
            PAGES WITH NAVBAR
        ================================================= */}

        <Route element={<Layout />}>
          {/* =========================
              HOME / LANDING PAGE
          ========================== */}

          <Route
            path="/"
            element={
              <>
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

          {/* =========================
              DONATION
          ========================== */}

          <Route path="/donate" element={<Donate />} />

          <Route path="/donate/checkout" element={<DonationCheckout />} />

          <Route path="/donate/receipt/:id" element={<DonationReceipt />} />

          {/* =================================================
              VOLUNTEER FLOW
          ================================================= */}

          {/* Volunteer Home */}

          <Route path="/volunteer" element={<Volunteer />} />

          {/* Volunteer Application */}

          <Route
            path="/volunteer/application"
            element={<VolunteerApplication />}
          />

          {/* Application Status */}

          <Route
            path="/volunteer/application-status"
            element={<ApplicationStatus />}
          />

          <Route path="/volunteer/status" element={<ApplicationStatus />} />

          {/* Volunteer Dashboard */}

          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />

          {/* Volunteer Profile */}

          <Route path="/volunteer/profile" element={<VolunteerProfile />} />

          {/* Volunteer Events */}

          <Route path="/volunteer/events" element={<VolunteerEvents />} />

          {/* Event Details */}

          <Route path="/volunteer/events/:eventId" element={<EventDetails />} />

          {/* Volunteer Tasks */}

          <Route path="/volunteer/tasks" element={<VolunteerTasks />} />

          {/* Volunteer Impact */}

          <Route path="/volunteer/impact" element={<VolunteerImpact />} />

          {/* Volunteer Certificates */}

          <Route
            path="/volunteer/certificates"
            element={<VolunteerCertificates />}
          />
        </Route>

        {/* =================================================
            AUTHENTICATION PAGES
            NO NAVBAR
        ================================================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/community" element={<Community />} />

        <Route path="/transparency" element={<Transparency />} />

        <Route path="/community/join" element={<JoinCommunity />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
