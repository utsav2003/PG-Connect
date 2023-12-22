import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const AppNavbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  let location = useLocation();
  useEffect(() => {
    console.log(location.state);
    setIsLogin(location.state?.login || false);
  }, [location.state]);

  const handleLogout = async () => {
    try {
      // Simulate the logout by sending a request to your server
      await axios.get("http://localhost:8000/userReg/unset");
      setIsLogin(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="px-4 py-2"
    >
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <Navbar.Brand
          style={{ fontWeight: "bold", fontSize: "2rem", marginRight: "auto" }}
        >
          PGConnect
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className="ml-auto">
          <Nav.Link
            style={{
              color: "black",
              fontSize: "1.2rem",
              marginRight: "1.2rem",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link
            style={{
              color: "black",
              fontSize: "1.2rem",
              marginRight: "1.2rem",
            }}
          >
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              About Us
            </Link>
          </Nav.Link>
          <Nav.Link
            style={{
              color: "black",
              fontSize: "1.2rem",
              marginRight: "1.2rem",
            }}
          >
            <Link
              to="/houses"
              style={{ textDecoration: "none", color: "black" }}
            >
              Houses
            </Link>
          </Nav.Link>
          <Nav.Link
            style={{
              color: "black",
              fontSize: "1.2rem",
              marginRight: "1.2rem",
            }}
          >
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "black" }}
            >
              Contact Us
            </Link>
          </Nav.Link>
          <Link
            to="/listProperty"
            style={{ textDecoration: "none", color: "black" }}
            className="mx-2"
          >
            <Button variant="primary">List Property</Button>
          </Link>
          <Link
            to="/login"
            className="mx-2"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Button
              variant="primary"
              className="mx-2"
              onClick={isLogin ? handleLogout : null}
            >
              {isLogin ? "Logout" : "Login"}
            </Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
