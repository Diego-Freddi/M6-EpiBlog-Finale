import { Navbar, Container, Nav, NavDropdown, Image, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

// Usa l'immagine profilo dell'utente se disponibile, altrimenti usa l'immagine di default
const profileImage = user?.profileImage || 
`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`;


  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Cerca per titolo o autore..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-primary" type="submit">Cerca</Button>
          </Form>
          <Nav>
            {user ? (
              <>
                <div className="d-flex align-items-center">
                  <Image 
                    src={profileImage} 
                    roundedCircle 
                    width={40} 
                    height={40} 
                    className="me-2"
                  />
                  <NavDropdown 
                    title={`Ciao, ${user.firstName} ${user.lastName}`}
                    id="basic-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item as={Link} to="/posts/create">
                      Crea Post
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/my-posts">
                      I Miei Post
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/profile">
                      Gestisci Profilo
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item 
                      onClick={handleLogout}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;