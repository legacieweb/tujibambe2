import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import BookingPage from './pages/BookingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Adventures from './pages/Adventures';
import CarHire from './pages/CarHire';
import CorporateRetreats from './pages/CorporateRetreats';
import EpicFunTimes from './pages/EpicFunTimes';
import EventPlanner from './pages/EventPlanner';
import PrivateParties from './pages/PrivateParties';
import WildBushWeddings from './pages/WildBushWeddings';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminTourForm from './pages/AdminTourForm';
import AdminBookingDetails from './pages/AdminBookingDetails';
import BookingDetails from './pages/BookingDetails';
import TicketBookingPage from './pages/TicketBookingPage';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Sitemap from './pages/Sitemap';
import Preloader from './components/Preloader';
import CurrencyPopup from './components/CurrencyPopup';
import { useLoading } from './context/LoadingContext';

const Layout = ({ children }) => {
  const { isLoading } = useLoading();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  return (
    <div className="app">
      {isLoading && <Preloader />}
      <CurrencyPopup />
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adventures" element={<Adventures />} />
          <Route path="/car-hire" element={<CarHire />} />
          <Route path="/corporate-retreats" element={<CorporateRetreats />} />
          <Route path="/epic-fun-times" element={<EpicFunTimes />} />
          <Route path="/event-planner" element={<EventPlanner />} />
          <Route path="/private-parties" element={<PrivateParties />} />
          <Route path="/wild-bush-weddings" element={<WildBushWeddings />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/tours/new" element={<AdminTourForm />} />
          <Route path="/admin/tours/edit/:id" element={<AdminTourForm />} />
          <Route path="/admin/bookings/:id" element={<AdminBookingDetails />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
          <Route path="/tickets/:id" element={<TicketBookingPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
