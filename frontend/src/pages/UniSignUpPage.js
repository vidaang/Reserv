import React from 'react';
import UniCreateAccount from '../components/UniCreateAccount';
import NavBar from '../components/NavBar';

const UniSignUpPage = () =>
{
    return(
        <div id="page-container">
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="user-authentication-container">
                <div id="user-authentication-container-elements">
                    <h1 id="user-authetication-title">University Sign Up</h1>
                    <UniCreateAccount />
                </div> 

                <div className='side-image-container-uni'></div>            
            </div>
        </div>
    );
};
export default UniSignUpPage;
