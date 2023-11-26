import React, { useState, useEffect } from 'react';
import "../../../styles/index.css";

function OrgCompleteProfile() {
  const [OrgInfo, setOrgInfo] = useState({
    RSOName: "",
    OfficerFirstName: "",
    OfficerLastName: "",
    OfficerEmail: "",
    Phone: "",
    AdvisorName: "",
    AdvisorEmail: "",
    SecondaryContactName: "",
    SecondaryContactEmail: "",
    SecondaryContactPhone: "",
  });

  // State for storing the JWT token
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOrgInfo((prevOrgInfo) => ({
      ...prevOrgInfo,
      [id]: value,
    }));
  };

  const handleCancelClick = () => {
    window.location.href = "/";
  };

  const handleCreateClick = async () => {
    try {
      const token = localStorage.getItem('userToken');
  
      if (!token) {
        // Handle the case where the token is not available
        console.error('Token not found');
        return;
      }

      //const response = await fetch('http://localhost:5000/api/updateRSOInfo', {
      const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/updateRSOInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(OrgInfo),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
            window.location.href = "/OrgSearchPage";
            console.error("Update successful");
        } else {
          // Handle error when no document is updated
          alert("No document updated. OrgID may not exist.");
        }
      } else {
        // Handle other HTTP errors
        alert(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div id="CompleteProfileContainer">
      <label htmlFor="RSOName">Organization Name</label>
      <input
        type="text"
        id="RSOName"
        name="RSOName"
        value={OrgInfo.RSOName}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="OfficerFirstName">Officer First Name</label>
      <input
        type="text"
        id="OfficerFirstName"
        name="OfficerFirstName"
        value={OrgInfo.OfficerFirstName}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="OfficerLastName">Officer Last Name</label>
      <input
        type="text"
        id="OfficerLastName"
        name="OfficerLastName"
        value={OrgInfo.OfficerLastName}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="OfficerEmail">Officer Email</label>
      <input
        type="text"
        id="OfficerEmail"
        name="OfficerEmail"
        value={OrgInfo.OfficerEmail}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="Phone">Phone</label>
      <input
        type="text"
        id="Phone"
        name="Phone"
        value={OrgInfo.Phone}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="AdvisorName">Advisor Name</label>
      <input
        type="text"
        id="AdvisorName"
        name="AdvisorName"
        value={OrgInfo.AdvisorName}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="AdvisorEmail">Advisor Email</label>
      <input
        type="text"
        id="AdvisorEmail"
        name="AdvisorEmail"
        value={OrgInfo.AdvisorEmail}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="SecondaryContactName">Secondary Contact Name</label>
      <input
        type="text"
        id="SecondaryContactName"
        name="SecondaryContactName"
        value={OrgInfo.SecondaryContactName}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="SecondaryContactEmail">Secondary Contact Email</label>
      <input
        type="text"
        id="SecondaryContactEmail"
        name="SecondaryContactEmail"
        value={OrgInfo.SecondaryContactEmail}
        onChange={handleInputChange}
      />
      <br />

      <label htmlFor="SecondaryContactPhone">Secondary Contact Phone</label>
      <input
        type="text"
        id="SecondaryContactPhone"
        name="SecondaryContactPhone"
        value={OrgInfo.SecondaryContactPhone}
        onChange={handleInputChange}
      />
      <br />

      <span id="Org-profile-discretion-text">
        I understand that if I am not a registered and recognized Organization within SGA, I will not be allowed to manage reservations through Reserv. Reserv is not responsible for any disputes regarding reservations through our platform.
      </span>

      <label id="Org-profile-checkbox-message">
        <input type="checkbox" id="Org-profile-checkbox" />
        I understand and agree to the statement above
      </label>

      <div id="CompleteProfileButtonDiv">
        <button id="Org-profile-cancel-button" onClick={handleCancelClick}>Cancel</button>
        <button id="Org-profile-create-button" onClick={handleCreateClick}>Update Account</button>
      </div>
    </div>
  );
}

export default OrgCompleteProfile;
