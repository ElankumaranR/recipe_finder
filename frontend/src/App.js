import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search/search';
import Home from './home/home';
import Signup from './logins/signup';
import Login from './logins/login';
import Nav from './Nav/Navbar'; 
import ProtectedRoute from './Nav/components/ProtectedRoute'; // Import ProtectedRoute
import OTP from './logins/components/otp'
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container">
          <Nav /> {/* Add Logout button here */}
        </div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} /> {/* Route for Home */}
          <Route path="/otp" element={<OTP />} /> 
          <Route path="/search" element={
            <ProtectedRoute>
              <Search /> {/* Protected Search Route */}
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
