import React from 'react';
import '../index.css';
import Logo from '../images/reserv-logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
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
        </div>
      </nav>
    );
  };

export default NavBar;