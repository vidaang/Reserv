import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

// const baseUrl = "https://knightsreserv-00cde8777914.herokuapp.com";
const baseUrl = "http://localhost:5000";

function UniLogin() {
  var loginName;
  var loginPassword;
  const [message, setMessage] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();

    var obj = { Email: loginName.value, Password: loginPassword.value };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      const response = await fetch(`${baseUrl}/api/adminLogin`, {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (res.error) {
        setMessage("User/Password combination incorrect");
      } else {
        // Assuming the JWT token is returned in the response under the key 'token'
        const token = res.token;
        if (token) {
          // Store the token in local storage or session storage
          localStorage.setItem("userToken", token);

          // Optionally store other user info as needed
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ UniName: res.UniName, UniID: res.UniID })
          );

          const update = {
            UniName: res.UniName,
            Address: res.Address,
            EmailDomain: res.EmailDomain,
            Website: res.Website,
            Phone: res.Phone,
          };

          try {
            // Call the checkFieldsNotEmpty endpoint
            const checkResponse = await fetch(`${baseUrl}/api/checkUniFields`, {
               method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
              },
              body: JSON.stringify(update), // assuming `update` contains the fields you want to check
            });
        
            const checkResult = await checkResponse.json();
        
            if (checkResult.fieldsNotEmpty) {
              // Fields are not empty, redirect to UniVerificationPage
              window.location.href = "/UniVerificationPage";
            } else {
              // Fields are empty, redirect to UniProfilePage
              window.location.href = "/UniProfilePage";
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
        <Link to="/UniCreateAccount">
          <button className="user-authentication-redirect-links">Don't Have an Account? Sign Up Here!</button>
        </Link>
      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
}
export default UniLogin;
