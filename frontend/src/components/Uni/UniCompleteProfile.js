import React from 'react';
import "../../styles/index.css";

function UniCompleteProfile()
{
    const handleClick = () =>
    {
        alert("Button Click Yippee!");
    };

    return (
        <div id="CompleteProfileContainer">
            <input type="text" id="universityName" placeholder="University Name"/><br />
            <input type="text" id="adminFirstName" placeholder="Administrator First Name"/><br />
            <input type="text" id="adminLastName" placeholder="Administrator Last Name"/><br />
            <input type="text" id="adminEmail" placeholder="Email Address"/><br />
            <input type="text" id="adminPhone" placeholder="Phone Number"/><br />
            <span id="uni-profile-discretion-text">I understand that if I am not a registered and recognized university with United States Government I will not be allowed to manage reservations through Reserv. 
                Reserv is not responsible for any disputes regarding reservations through our platform.</span>
            <label id="uni-profile-checkbox-message">
                <input type="checkbox" id="uni-profile-checkbox"/>
                I understand and agree to the statement above
            </label>
            <div id="CompleteProfileButtonDiv">
                <button id="uni-profile-cancel-button" onClick={handleClick}>Cancel</button>
                <button id="uni-profile-create-button" onClick={handleClick}>Create Account</button>
            </div>
        </div>
    );
}

export default UniCompleteProfile;