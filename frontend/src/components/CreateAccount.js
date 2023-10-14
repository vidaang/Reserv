import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function CreateAccount()
{
    var createAccountName;
    var createAccountPassword;
    var createAccountFirstName;
    var createAccountLastName;
    const [message,setMessage] = useState('');

    const doCreateAccount = async event =>
    {
        event.preventDefault();

        var obj = {userName:createAccountName.value,password:createAccountPassword.value,firstName:createAccountFirstName.value, lastName:createAccountLastName.value};
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            const response = await fetch('http://localhost:5000/api/createAccount',
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
        createAccountName.value="";
        createAccountPassword.value="";
        createAccountFirstName.value="";
        createAccountLastName.value="";
    };
    return(
        <div id="loginDiv">
            <form onSubmit={doCreateAccount}>
                <span id="inner-title">Create an account</span><br />
                <input type="text" class="user-authentication-text-form" id="createAccountName" placeholder="Username"ref={(c) => createAccountName = c} /><br />
                <input type="password" class="user-authentication-text-form" id="createAccountPassword" placeholder="Password" ref={(c) => createAccountPassword = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountFirstName" placeholder="First Name" ref={(c) => createAccountFirstName = c} /><br />
                <input type="text" class="user-authentication-text-form" id="createAccountLastName" placeholder="Last Name" ref={(c) => createAccountLastName = c} /><br />
                <input type="submit" id="loginButton" class="user-authentication-buttons" value="Create Account" onClick={doCreateAccount} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};
export default CreateAccount;