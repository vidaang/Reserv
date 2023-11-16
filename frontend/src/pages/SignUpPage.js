import React, { useState } from 'react';

import OrgLogin from '../components/OrgLogin';
import OrgCreateAccount from '../components/OrgCreateAccount';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const SignUpPage = () =>
{
    const [show,setShow] = useState(false);

    return(
        <div id="page-container">
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="user-authentication-container">
                <div id="user-authentication-container-elements">
                    <h1 id="user-authetication-title">Organization Sign Up</h1>
                    <OrgCreateAccount />
                </div> 

                <div className='side-image-container'></div>            
            </div>
        </div>
    );
};
export default SignUpPage;
