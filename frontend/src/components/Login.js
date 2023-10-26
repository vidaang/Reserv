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

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            const response = await fetch('http://localhost:5000/api/login',
            {method:'POST',
            body:js,
            headers:{'Content-Type':'application/json'}});

            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user =
                {firstName:res.firstName,lastName:res.lastName,id:res.id};
                alert(res.id);        
                localStorage.setItem('user_data', JSON.stringify(user));
                alert(localStorage.id);
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
            <input type="text" class="user-authentication-text-form" id="loginName" placeholder="Username"ref={(c) => loginName = c} required/><br />
            <input type="password" class="user-authentication-text-form" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} required /><br />
            <input type="submit" id="loginButton" class="user-authentication-buttons" value = "Login" onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};
export default Login;