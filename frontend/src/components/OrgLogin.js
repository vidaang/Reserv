import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import "../styles/index.css";

function OrgLogin() {
  var loginName;
  var loginPassword;
  var resetEmail;
  const [message, setMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { Email: loginName.value, Password: loginPassword.value };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      // CHANGE THIS BACK TO HEROKU ON DEV
      const response = await fetch("https://knightsreserv-00cde8777914.herokuapp.com/api/login", {
      //const response = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (res.error) {
        setMessage(res.error);
      } else {
        // Assuming the JWT token is returned in the response under the key 'token'
        const token = res.token;
        if (token) {
          // Store the token in local storage or session storage
          localStorage.setItem("userToken", token);

          // Optionally store other user info as needed
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ RSOID: res.RSOID })
          );

          const update = {
            RSOName: res.RSOName,
            OfficerFirstName: res.OfficerFirstName,
            OfficerLastName: res.OfficerLastName,
            Password: res.Password,
            Email: res.Email,
            Phone: res.Phone,
            AdvisorName: res.AdvisorName,
            AdvisorEmail: res.AdvisorEmail,
            SecondaryContactName: res.SecondaryContactName,
            SecondaryContactEmail: res.SecondaryContactEmail,
            SecondaryContactPhone: res.SecondaryContactPhone,
          };

          try {
            // Call the checkFieldsNotEmpty endpoint
            const checkResponse = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/checkRSOFields', {
            //const checkResponse = await fetch('http://localhost:5000/api/checkRSOFields', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
              },
              body: JSON.stringify(update), // assuming `update` contains the fields you want to check
            });
        
            const checkResult = await checkResponse.json();
        
            if (checkResult.fieldsNotEmpty) {
              // Fields are not empty, redirect to OrgVerificationPage
              window.location.href = "/OrgSearchPage";
            } else {
              // Fields are empty, redirect to OrgProfilePage
              window.location.href = "/OrgProfilePage";
            }
          } catch (error) {
            console.error("Error during checkFieldsNotEmpty:", error);
            // Handle error as needed, e.g., redirect to an error page
          }
        
          setMessage("");
        } else {
          setMessage("No token received, login failed");
        }
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const sendResetEmail = async (event) => {
    event.preventDefault();
    var obj = { Email:resetEmail.value };
    var js = JSON.stringify(obj);
    //console.log(js);
    var response;
    try {
      response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/request-password-reset', {
      // response = await fetch('http://localhost:5000/api/request-password-reset', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: js
      });
      if (response.status === 404)
        setEmailMessage("User not found.");
      else
        setEmailMessage("Check your email to reset your password!");
    } catch (error) {
      alert(error.toString());
    }
  };

  return (
    <div id="loginDiv">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
      <form onSubmit={doLogin}>
        <span id="inner-title">Please Log In</span>
        <br />
        <input
          type="text"
          class="user-authentication-text-form"
          id="loginName"
          placeholder="Email"
          ref={(c) => (loginName = c)}
          required
        />
        <br />
        <input
          type="password"
          class="user-authentication-text-form"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
          required
        />
        <br />
        <input
          type="submit"
          id="loginButton"
          class="user-authentication-buttons"
          value="Login"
          onClick={doLogin}
        />
        <Link to="/OrgCreateAccount">
          <button className="navbar-menu-text">Don't Have an Account? Sign Up Here!</button>
        </Link>
      </form>
      <button className="navbar-menu-text" onClick={open}>Forgot Password?</button>
      <span id="loginResult">{message}</span>
      <Modal id="reset-password-modal" opened={opened} onClose={close}>
        <div id="reset-password-email-container">
          <span>Please enter the email associated with your account</span>
          <form id="password-email-form" onSubmit={sendResetEmail}>
            <input type="text" placeholder="Email" ref={(c) => (resetEmail = c)} required></input>
            <button type="submit">Confirm</button>
          </form>
          <span id="reset-message">{emailMessage}</span>
        </div>
      </Modal>
    </div>
  );
}
export default OrgLogin;
