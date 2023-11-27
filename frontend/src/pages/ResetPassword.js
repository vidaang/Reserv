import React from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styles/index.css";

function ResetPassword()
{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const changePassword = async (event) =>
    {
        event.preventDefault();

        if (password !== confirmPassword)
        {
            setErrorMessage("Passwords do not match.");
            return;
        }

        var obj = { token:token, newPassword:password };
        var js = JSON.stringify(obj);
        console.log(js);

        try {
            //await fetch('http://localhost:5000/api/reset-password',
            await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/verify-email',
              {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });
            setErrorMessage("Password updated!");
            window.location.href= "/";
        }
          catch (e) {
            console.log(e.toString());
            return;
        }
    }

    return(
        <div id="ResetPasswordPage">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="ResetPasswordContainer">
                <h1>Please enter your new password</h1>
                <form id="ResetPasswordForm" onSubmit={changePassword}>
                    <label>
                        New Password:
                        <input 
                            type="password" 
                            value={password} 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            placeholder="Retype Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Confirm</button>
                </form>
                <span>{errorMessage}</span>
            </div>
        </div>
    );
}

export default ResetPassword;