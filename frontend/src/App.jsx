import "./App.css";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Impact from "./components/Impact";

// ADDED
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ADDED
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Donate from "./components/Donate";
import DonationCheckout from "./components/DonationCheckout";
import DonationReceipt from "./components/DonationReceipt";

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
              <Services />
              <Impact />
            </>
          }
        />

        {/* INTERNAL PAGES - ADDED */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/donate" element={<Donate />} />

        <Route path="/donate/checkout" element={<DonationCheckout />} />

        <Route path="/donate/receipt/:id" element={<DonationReceipt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
