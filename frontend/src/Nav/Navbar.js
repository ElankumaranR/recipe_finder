import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './components/Navbar.css'; 



const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

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
            
            {user ? (
              <NavDropdown title={user.username} id="user-dropdown" className="nav-link-custom">
                <NavDropdown.Item href="/wishlist">WishList</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login" className="nav-link-custom">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
