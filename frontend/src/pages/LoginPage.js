import React, { useState } from 'react';
import OrgLogin from '../components/OrgLogin';
import NavBar from '../components/NavBar';

const LoginPage = () =>
{

    return(
        <div id="page-container">
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="user-authentication-container">
                <div id="user-authentication-container-elements">
                    <h1 id="user-authetication-title">Organization Login</h1>
                    <OrgLogin />
                </div>   

                <div className='side-image-container'></div>           
            </div>
            
        </div>
    );
};
export default LoginPage;
