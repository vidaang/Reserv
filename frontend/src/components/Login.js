import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    

    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {email:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com:5000/api/login',
            {method:'POST',
            body:js,
            headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());
            if( res.RSOName == undefined )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user =
                {RSOName:res.RSOName};
                alert(res.RSOName);        
                setMessage('');
                window.location.href = '/OrgHomePage';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="loginDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <form onSubmit={doLogin}>
            <span id="inner-title">Please Log In</span><br />
            <input type="text" class="user-authentication-text-form" id="loginName" placeholder="Email"ref={(c) => loginName = c} required/><br />
            <input type="password" class="user-authentication-text-form" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} required /><br />
            <input type="submit" id="loginButton" class="user-authentication-buttons" value = "Login" onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};
export default Login;