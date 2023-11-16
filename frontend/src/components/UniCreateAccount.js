import React, { useState } from 'react';
import { Link } from "react-router-dom";

function UniCreateAccount()
{
    var createAccountEmail;
    var createAccountPassword;
    var createAccountUniversityName;

    const [message,setMessage] = useState('');

    const doCreateAccount = async event =>
    {
        event.preventDefault();

        var obj = {
            Email:createAccountEmail.value,
            Password:createAccountPassword.value,
            OfficerUniversityName:createAccountUniversityName.value,
        };
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/createUniversity',
            {method:'POST',
            body:js,
            headers:{'Content-Type':'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Account Created');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
        createAccountEmail.value="";
        createAccountPassword.value="";
        createAccountUniversityName.value="";
    };
    return(
        <div id="loginDiv">
            <form onSubmit={doCreateAccount}>
                <span id="inner-title">Create an account</span><br />
                <input type="text" class="user-authentication-text-form" id="createAccountUniversityName" placeholder="UniversityName" ref={(c) => createAccountUniversityName = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountEmail" placeholder="Email"ref={(c) => createAccountEmail = c} /><br />
                <input type="password" class="user-authentication-text-form" id="createAccountPassword" placeholder="Password" ref={(c) => createAccountPassword = c} /><br />
                <input type="submit" id="loginButton" class="user-authentication-buttons" value="Create Account" onClick={doCreateAccount} />
            </form>
            <Link to="/UniLogin">
                <button className="navbar-menu-text">Have an Account? Sign In Here!</button>
            </Link>
            <span id="loginResult">{message}</span>
        </div>
    );
};
export default UniCreateAccount;