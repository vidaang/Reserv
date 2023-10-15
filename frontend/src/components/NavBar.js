import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import Logo from '../images/reserv-logo.png';
import MenuIcon from '../images/menu.png'; // Import the menu icon image
import ProfileIcon from '../images/profile-icon.png';

const NavBar = () => {
    const location = useLocation();

    const showIcons = location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/CreateAccount';

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
        { showIcons ? (
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
            <ul className="navbar-links">
              <li className="navbar-button">
                <Link to="/Menu">
                  <img
                    src={MenuIcon}
                    alt="Menu"
                    className="navbar-icon"
                  />
                </Link>
              </li>
              <li className="navbar-button">
                  <Link to="/ProfilePage">
                    <img
                      src={ProfileIcon}
                      alt="Profile"
                      className="navbar-icon"
                    />
                  </Link>
              </li>
            </ul>
        )}
        </div>
      </nav>
    );
  };

export default NavBar;