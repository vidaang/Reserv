import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
                window.location.href = '/cards';
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
        <form onSubmit={doLogin}>
        <span id="inner-title">Please Log In</span><br />
        <input type="text" class="textForm" id="loginName" placeholder="Username"ref={(c) => loginName = c} required/><br />
        <input type="password" class="textForm" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} required /><br />
        <input type="submit" id="loginButton" class="buttons" value = "Login" onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
        </div>
    );
};
export default Login;