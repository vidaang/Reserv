import React, { useState } from 'react';
import { Link } from "react-router-dom";

function OrgCreateAccount() {
  var createAccountEmail;
  var createAccountPassword;
  var retypePassword;

  const [message, setMessage] = useState('');

  const doCreateAccount = async event => {
    event.preventDefault();

    if (createAccountPassword.value !== retypePassword.value) {
      setMessage("Passwords do not match");
      return;
    }

    var obj = {
      Email: createAccountEmail.value,
      Password: createAccountPassword.value,
      UniID: "655673b363bf110ce2b499ee"
    };
    var js = JSON.stringify(obj);
    console.log(js);
    try {
      // const response = await fetch('http://localhost:5000/api/createRSO',
      const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/createRSO',
        {
          method: 'PUT',
          body: js,
          headers: { 'Content-Type': 'application/json' }
        });

      var txt = await response.text();
      var res = JSON.parse(txt);
      if (res.error !== undefined && res.error !== null) {
        setMessage("API Error: " + res.error);
      } else {
        setMessage('Account Created');
        alert('Account created successfully! Please check your email to verify your account!');
      }
    }
    catch (e) {
      alert(e.toString());
      return;
    }
    createAccountEmail.value = "";
    createAccountPassword.value = "";
    retypePassword.value = "";
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doCreateAccount}>
        <span id="inner-title">Create an account</span><br />
        <input type="text" className="user-authentication-text-form" id="createAccountEmail" placeholder="Email" ref={(c) => createAccountEmail = c} /><br />
        <input type="password" className="user-authentication-text-form" id="createAccountPassword" placeholder="Password" ref={(c) => createAccountPassword = c} /><br />
        <input type="password" className="user-authentication-text-form" id="retypePassword" placeholder="Retype Password" ref={(c) => retypePassword = c} /><br />
        <input type="submit" id="loginButton" className="user-authentication-buttons" value="Create Account" />
      </form>
      <Link to="/OrgLogin">
        <button className="navbar-menu-text">Have an Account? Sign In Here!</button>
      </Link>
      <span id="loginResult">{message}</span>
    </div>
  );
}

export default OrgCreateAccount;
