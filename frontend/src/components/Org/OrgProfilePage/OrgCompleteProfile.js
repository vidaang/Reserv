import React from 'react';
import "../../../styles/index.css";

function UniCompleteProfile()
{
    const handleClick = () =>
    {
        alert("Button Click Yippee!");
    };

    return (
        <div id="CompleteProfileContainer">
            <input type="text" id="orgName" placeholder="Organization Name"/><br />
            <input type="text" id="orgDescription" placeholder="Briefly Describe Your Organization"/><br />
            <input type="text" id="orgFirstName" placeholder="Officer First Name"/><br />
            <input type="text" id="orgLastName" placeholder="Officer Last Name"/><br />
            <input type="text" id="orgEmail" placeholder="Organization Primary Email Address"/><br />
            <input type="text" id="orgNumber" placeholder="Organization Primary Phone Number"/><br />
            <input type="text" id="advisorName" placeholder="Faculty Advisor Name"/><br />
            <input type="text" id="advisorEmail" placeholder="Faculty Advisor Email"/><br />
            <span id="uni-profile-discretion-text">I understand that if I am not a registered RSO
             with UCF Student Government Association I will not be allowed to place reservations through Reserv. 
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