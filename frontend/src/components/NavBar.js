import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/index.css'
import Logo from '../images/reserv-logo.png';
import MenuIcon from '../images/menu.png';

const NavBar = () => {
    const location = useLocation();

    const showIcons = 
          location.pathname === '/' || 
          location.pathname === '/Login' || 
          location.pathname === '/CreateAccount';

    // const containsSubword = (subword) => location.pathname.includes(subword);

    // const showOrgNav = containsSubword('Org');
    // const showUniNav = containsSubword('Uni');

    const showOrgNav = 
          location.pathname === '/OrgHomePage' || 
          location.pathname === '/OrgSearchPage' || 
          location.pathname === '/OrgReservationsPage' ||
          location.pathname === '/OrgSettingsPage';

    const showUniNav = 
          location.pathname === '/UniHomePage' || 
          location.pathname === '/UniReservationsPage' ||
          location.pathname === '/UniOrganizationsPage' ||
          location.pathname === '/UniSettingsPage';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    useEffect(() => {
      document.body.addEventListener('click', closeMenu);

      return () => {
        document.body.removeEventListener('click', closeMenu);
      };
    }, []);

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

    return (
      <nav className="navbar-container">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
        <div className="navbar-left-align">
          <a href="/">
            <img className="navbar-logo" href="/" src={ Logo } alt="Logo"/>
          </a>
        </div>
        <div className="navbar-right-align">
          { showIcons ? 
          (
            <ul className="navbar-links">
              <li className="navbar-button">
                <Link to="/Login">
                  <button className="navbar-sign-in-button">Sign In</button>
                </Link>
              </li>
              <li className="navbar-button">
                  <Link to="/CreateAccount">
                    <button className="navbar-sign-up-button">Sign Up</button>
                  </Link>
              </li>
            </ul>
          ):(
            <ul className="navbar-links" onClick={stopPropagation} ref={menuRef}>
              <div className="navbar-menu-container">
                <button className="navbar-menu-button" onClick={toggleMenu}>
                  <img src={MenuIcon} alt="Menu" className="navbar-icon"/>
                </button>
              </div>
            </ul>
          )}
          {isMenuOpen && showOrgNav && (
            <div className="navbar-menu">

              <Link to="/OrgHomePage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Home</button>
              </Link>
              <Link to="/OrgSearchPage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Search for Rooms</button>
              </Link>
              <Link to="/OrgReservationsPage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Manage Reservations</button>
              </Link>
              <Link to="/OrgSettingsPage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Settings</button>
              </Link>
              <Link to="/">
                <button className="navbar-menu-text" onClick={toggleMenu}>Log Out</button>
              </Link>

            </div>
          )}
          {isMenuOpen && showUniNav && (
            <div className="navbar-menu">

              <Link to="/UniHomePage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Home</button>
              </Link>
              <Link to="/UniOrganizationsPage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Manage Organizations</button>
              </Link>
              <Link to="/UniReservationsPage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Manage Reservations</button>
              </Link>
              <Link to="/UniSettingsPage">
                <button className="navbar-menu-text" onClick={toggleMenu}>Settings</button>
              </Link>
              <Link to="/">
                <button className="navbar-menu-text" onClick={toggleMenu}>Log Out</button>
              </Link>

            </div>
          )}
        </div>
      </nav>
    );
  };

export default NavBar;