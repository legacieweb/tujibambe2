import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import EventPlanner from './pages/EventPlanner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import BookingDetails from './pages/BookingDetails';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
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
          <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
          <Route path="/event-planner" element={<MainLayout><EventPlanner /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
          
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/booking/:id" element={<BookingDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
