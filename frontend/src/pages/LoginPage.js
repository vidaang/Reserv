import React, { useState } from 'react';

import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import Hall from '../images/lecture-hall.jpg';

const LoginPage = () =>
{
    const [show,setShow] = useState(true);

    return(
        <div id="page-container">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                    <NavBar />
            </div>
            <div id="user-authentication-container">

                <div id="user-authentication-container-elements">
                {
                    show? 
                        <div>
                            <h1 id="user-authetication-title">Login</h1>
                            <Login />
                            {/* <Link onClick={()=>setShow(false)}>No Account? Create One!</Link> */}
                        </div>:
                        <div>
                            <h1 id="user-authetication-title">Login</h1>
                            <CreateAccount />
                            {/* <Link onClick={()=>setShow(true)}>Already have an Account? Sign In!</Link> */}
                        </div>
                }     
                </div>              
            </div>
            <div id='side-image-container'>
                <img id='login-side-image' src={ Hall } />
            </div>
        </div>
    );
};
export default LoginPage;
