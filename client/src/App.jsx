import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Search from './search/Search';
import Home from './home/home';
import Signup from './logins/signup';
import Login from './logins/login';
import Nav from './Nav/Navbar';
import ProtectedRoute from './Nav/components/ProtectedRoute';
import AdminLogin from './admin/AdminLogin';
import AdminSignup from './admin/AdminSignup';
import Dashboard from './admin/dashboard';
import Wishlist from './Wishlist';

function App() {
  const location = useLocation();

  // Routes where Nav should be hidden
  const noNavRoutes = ['/admin', '/admin/signup', '/dash'];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <>
      {/* Container with Tailwind padding & max-width */}
      <div className="container mx-auto px-4">
        {!hideNav && <Nav />}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/dash" element={<Dashboard />} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
