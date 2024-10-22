import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './components/Navbar.css'; // Import the custom CSS file

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="sticky-top custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand-custom">
          Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/search" className="nav-link-custom">Search</Nav.Link>
            <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
            <Nav.Link href="/signup" className="nav-link-custom">Signup</Nav.Link>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
