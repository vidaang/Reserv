import React, { useState } from 'react';

import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const LoginPage = () =>
{

    return(
        <div id="page-container">
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="user-authentication-container">
                <div id="user-authentication-container-elements">
                    <h1 id="user-authetication-title">Login</h1>
                    <Login />
                </div>   

                <div className='side-image-container'></div>           
            </div>
            
        </div>
    );
};
export default LoginPage;
