import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../components/styles/Navbar.css';
import RPAForm from './RPAForm';
import Mainlogo from '../assets/Logomain3.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleBookAppointment = () => {
    closeMenu();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  // Scroll to section if hash exists in URL
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleInPageNavigation = (hash, e) => {
    e.preventDefault();
    closeMenu();

    if (location.pathname === '/') {
      // If we're already on home page, just scroll
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to home first
      window.location.href = `/${hash}`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <img src={Mainlogo} alt="SmartFlows Logo" className="logo-image" />
            </Link>
          </div>




          <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
            <NavLink
              to="/"
              onClick={() => {
                closeMenu();
                window.scrollTo(0, 0);
              }}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span>Home</span>
            </NavLink>

            <a
              href="#services"
              onClick={(e) => handleInPageNavigation('#services', e)}
              className="nav-link"
            >
              <span>Services</span>
            </a>

            <a
              href="#testimonials"
              onClick={(e) => handleInPageNavigation('#testimonials', e)}
              className="nav-link"
            >
              <span>Testimonials</span>
            </a>

            <NavLink
              to="/courses"
              onClick={closeMenu}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span>Courses</span>
            </NavLink>

            {/* Group Contact and Button together */}
            <div className="contact-and-button">
              <a
                href="#contact"
                onClick={(e) => handleInPageNavigation('#contact', e)}
                className="nav-link contact-link-navbar"
              >
                <span>Contact</span>
              </a>

              <div className="button-container">
                <button className="navbar-btn" onClick={handleBookAppointment}>
                  <span>Book A Call</span>
                  
                </button>
              </div>
            </div>
          </div>












          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      <RPAForm isOpen={showForm} onClose={closeForm} />
    </>
  );
}

export default Navbar;