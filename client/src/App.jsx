import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import CarHire from './pages/CarHire';
import EventPlanner from './pages/EventPlanner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import BookingDetails from './pages/BookingDetails';
import BookingPage from './pages/BookingPage';
import TicketBookingPage from './pages/TicketBookingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminTourForm from './pages/AdminTourForm';
import AdminBookingDetails from './pages/AdminBookingDetails';
import Adventures from './pages/Adventures_New';
import EpicFunTimes from './pages/EpicFunTimes_New';
import CorporateRetreats from './pages/CorporateRetreats';
import WildBushWeddings from './pages/WildBushWeddings';
import PrivateParties from './pages/PrivateParties';
import Navbar from './components/Navbar_New';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CurrencyPopup from './components/CurrencyPopup';
import Preloader from './components/Preloader';
import './styles/global.css';
import './styles/Currency.css';

const MainLayout = ({ children }) => (
  <>
    <Preloader />
    <Navbar />
    <CurrencyPopup />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/tours" element={<MainLayout><Tours /></MainLayout>} />
          <Route path="/tours/:id" element={<MainLayout><TourDetails /></MainLayout>} />
          <Route path="/book/:id" element={<MainLayout><BookingPage /></MainLayout>} />
          <Route path="/book-ticket/:type" element={<MainLayout><TicketBookingPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/car-hire" element={<MainLayout><CarHire /></MainLayout>} />
          <Route path="/event-planner" element={<MainLayout><EventPlanner /></MainLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adventures" element={<MainLayout><Adventures /></MainLayout>} />
          <Route path="/epic-fun-times" element={<MainLayout><EpicFunTimes /></MainLayout>} />
          <Route path="/event-planner/corporate" element={<MainLayout><CorporateRetreats /></MainLayout>} />
          <Route path="/event-planner/weddings" element={<MainLayout><WildBushWeddings /></MainLayout>} />
          <Route path="/event-planner/parties" element={<MainLayout><PrivateParties /></MainLayout>} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/booking/:id" element={<BookingDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-tour" element={<AdminTourForm />} />
          <Route path="/admin/edit-tour/:id" element={<AdminTourForm />} />
          <Route path="/admin/booking/:id" element={<AdminBookingDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;