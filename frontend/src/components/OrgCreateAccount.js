import React, { useState } from 'react';
import { Link } from "react-router-dom";

function OrgCreateAccount()
{
    var createAccountEmail;
    var createAccountPassword;
    var createAccountFirstName;
    var createAccountLastName;
    var createAccountRSOName;
    var createAccountPhone;
    var createAccountAdvisorName;
    var createAccountAdvisorEmail;

    const [message,setMessage] = useState('');

    const doCreateAccount = async event =>
    {
        event.preventDefault();

        var obj = {
            Email:createAccountEmail.value,
            Password:createAccountPassword.value,
            OfficerFirstName:createAccountFirstName.value,
            OfficerLastName:createAccountLastName.value,
            RSOName:createAccountRSOName.value, 
            Phone:createAccountPhone.value,
            AdvisorName:createAccountAdvisorName.value,
            AdvisorEmail:createAccountAdvisorEmail.value
        };
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/createRSO',
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
        createAccountFirstName.value="";
        createAccountLastName.value="";
        createAccountRSOName.value="";
        createAccountPhone.value="";
        createAccountAdvisorName.value="";
        createAccountAdvisorEmail.value="";
    };
    return(
        <div id="loginDiv">
            <form onSubmit={doCreateAccount}>
                <span id="inner-title">Create an account</span><br />
                <input type="text" class="user-authentication-text-form" id="createAccountEmail" placeholder="Email"ref={(c) => createAccountEmail = c} /><br />
                <input type="password" class="user-authentication-text-form" id="createAccountPassword" placeholder="Password" ref={(c) => createAccountPassword = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountFirstName" placeholder="Officer First Name" ref={(c) => createAccountFirstName = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountLastName" placeholder="Officer Last Name" ref={(c) => createAccountLastName = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountRSOName" placeholder="Organization Name" ref={(c) => createAccountRSOName = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountPhone" placeholder="Phone" ref={(c) => createAccountPhone = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountAdvisorName" placeholder="Advisor Name" ref={(c) => createAccountAdvisorName = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountAdvisorEmail" placeholder="Advisor Email" ref={(c) => createAccountAdvisorEmail = c} /><br />
                <input type="submit" id="loginButton" class="user-authentication-buttons" value="Create Account" onClick={doCreateAccount} />
            </form>
            <Link to="/OrgLogin">
                <button className="navbar-menu-text">Have an Account? Sign In Here!</button>
            </Link>
            <span id="loginResult">{message}</span>
        </div>
    );
};
export default OrgCreateAccount;