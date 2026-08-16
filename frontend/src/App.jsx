import "./App.css";
import "./index.css";
import "./Volunteer.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";

// Router
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import Campaigns from "./components/Campaigns";
import Impact from "./components/Impact";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Testimonials from "./components/Testimonials";
import DonateSection from "./components/DonateSection";
import Volunteer from "./components/Volunteer";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// ADDED
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    // ADDED
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME - YOUR EXISTING COMPONENTS */}
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
              <Volunteer />
              <FAQ />
              <Contact />
              <Footer />
            </>
          }
        />


        {/* =========================
            LOGIN
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            REGISTER
        ========================== */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            FORGOT PASSWORD
        ========================== */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================
            DONATION
        ========================== */}

        <Route
          path="/donate"
          element={<Donate />}
        />
        {/* INTERNAL PAGES - ADDED */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/donate" element={<Donate />} />

        <Route path="/donate/checkout" element={<DonationCheckout />} />


        {/* =================================================
            VOLUNTEER FLOW
        ================================================= */}


        {/* Volunteer Home */}

        <Route
          path="/volunteer"
          element={<Volunteer />}
        />


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


        {/* Volunteer Dashboard */}

        <Route
          path="/volunteer/dashboard"
          element={<VolunteerDashboard />}
        />
         
        <Route
          path="/volunteer/status"
          element={<ApplicationStatus />}
        />

        {/* Volunteer Profile */}

        <Route
          path="/volunteer/profile"
          element={<VolunteerProfile />}
        />


        {/* Volunteer Events */}

        <Route
          path="/volunteer/events"
          element={<VolunteerEvents />}
        />


        {/* Event Details */}

        <Route
          path="/volunteer/events/:eventId"
          element={<EventDetails />}
        />


        {/* Volunteer Tasks */}

        <Route
          path="/volunteer/tasks"
          element={<VolunteerTasks />}
        />


        {/* Volunteer Impact */}

        <Route
          path="/volunteer/impact"
          element={<VolunteerImpact />}
        />


        {/* Volunteer Certificates */}

        <Route
          path="/volunteer/certificates"
          element={<VolunteerCertificates />}
        />

        <Route path="/donate/receipt/:id" element={<DonationReceipt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

