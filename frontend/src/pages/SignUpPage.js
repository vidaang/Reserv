import React, { useState } from 'react';

import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

const LoginPage = () =>
{
    const [show,setShow] = useState(false);

    return(
        <div id="page-container">
            <div id="NavBar">
                    <NavBar />
            </div>
            <div id="user-authentication-container">
                
                <div id="user-authentication-container-elements">
                {
                    show? 
                        <div>
                            <h1 id="user-authetication-title">Sign Up</h1>
                            <Login />
                            {/* <Link onClick={()=>setShow(false)}>No Account? Create One!</Link> */}
                        </div>:
                        <div>
                            <h1 id="user-authetication-title">Sign Up</h1>
                            <CreateAccount />
                            {/* <Link onClick={()=>setShow(true)}>Already have an Account? Sign In!</Link> */}
                        </div>
                        
                }     
                </div>              
            </div>
        </div>
    );
};
export default LoginPage;
