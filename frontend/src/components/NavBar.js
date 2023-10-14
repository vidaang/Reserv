import React from 'react';
import '../css/NavBar.css';
import Logo from '../images/reserv-logo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="left-container">
          <a href="/">
            <img className="brand" href="/" src={ Logo } alt="Logo"/>
          </a>
        </div>
        <div className="right-container">
          <ul className="nav-links">
            <li className="sign-in">
              <Link to="/Login">
                <button className="signin-button">Sign In</button>
              </Link>
            </li>
            <li className="sign-up">
                <Link to="/Login">
                  <button className="signup-button">Sign Up</button>
                </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

export default NavBar;