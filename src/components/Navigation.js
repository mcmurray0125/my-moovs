import React, { useState } from "react"
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import smallLogo from "../assets/small-logo.png"
import smallLogoBlack from "../assets/small-logo-black.png"
import { DarkModeSwitch } from 'react-toggle-dark-mode';


export default function Navigation() {
  const { currentUser, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isDarkMode, setDarkMode] = useState(theme === 'dark' ? true : false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    toggleTheme();
  };

  async function handleLogout() {
    try {
        await logout()
        window.location.reload()
    } catch(error) {
        console.log(error)
    }
}

    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="w-100 top-0 py-3" sticky="top" id="navbar" style={{zIndex: "1000"}}>
      <Container>
        <Navbar.Brand href="/">
            <img
              src={isDarkMode ? smallLogo : smallLogoBlack}
              height="30"
              className="d-inline-block align-top"
              alt="MyMoovs logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/popular-movies"><i className="fa-solid fa-fire"></i> Popular Movies</Nav.Link>
            <NavDropdown title="Genres" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/action">Action</NavDropdown.Item>
              <NavDropdown.Item href="/comedy">Comedy</NavDropdown.Item>
              <NavDropdown.Item href="/drama">Drama</NavDropdown.Item>
              <NavDropdown.Item href="/family">Family</NavDropdown.Item>
              <NavDropdown.Item href="/science-fiction">Sci-Fi</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/upcoming-movies">Upcoming</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/search-movies">Search <i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link href="/saved-movies"><i className="fa-solid fa-cloud"></i> Saved</Nav.Link>
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey={2} href="/profile">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/saved-movies">Saved Movies</NavDropdown.Item>
              <NavDropdown.Divider />
              {currentUser ?
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item> :
              <div id="login-items-wrapper">
                <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
              </div>
            }
            </NavDropdown>
            <DarkModeSwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={20}
              sunColor="rgb(22, 25, 28)"
              moonColor="rgb(241, 241, 241)"
              aria-label="toggle dark theme"
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        )
}