import React from 'react';
import UniLogin from '../components/UniLogin';
import NavBar from '../components/NavBar';

const UniLoginPage = () =>
{

    return(
        <div id="page-container">
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="user-authentication-container">
                <div id="user-authentication-container-elements">
                    <h1 id="user-authetication-title">University Login</h1>
                    <UniLogin />
                </div>   

                <div className='side-image-container-uni'></div>           
            </div>
            
        </div>
    );
};
export default UniLoginPage;
