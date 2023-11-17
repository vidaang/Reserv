import React, { useState, useEffect } from 'react';
import "../../../styles/index.css";

function UniCompleteProfile() {
  const [uniInfo, setUniInfo] = useState({
    UniName: "",
    Address: "",
    EmailDomain: "",
    Website: "",
    Phone: "",
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
    setUniInfo((prevUniInfo) => ({
      ...prevUniInfo,
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
      // const response = await fetch('http://localhost:5000/api/updateUniversityInfo', {
      const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/updateUniversityInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(uniInfo),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
            window.location.href = "/UniVerificationPage";
          console.log("Update successful");
        } else {
          // Handle error when no document is updated
          console.error("No document updated. UniID may not exist.");
        }
      } else {
        // Handle other HTTP errors
        console.error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <div id="CompleteProfileContainer">
      <input
        type="text"
        id="UniName"
        placeholder="University Name"
        value={uniInfo.UniName}
        onChange={handleInputChange}
      /><br />

      <input
        type="text"
        id="Address"
        placeholder="University Address"
        value={uniInfo.Address}
        onChange={handleInputChange}
      /><br />

      <input
        type="text"
        id="EmailDomain"
        placeholder="University Email Domain"
        value={uniInfo.EmailDomain}
        onChange={handleInputChange}
      /><br />

      <input
        type="text"
        id="Website"
        placeholder="University Website"
        value={uniInfo.Website}
        onChange={handleInputChange}
      /><br />

      <input
        type="text"
        id="Phone"
        placeholder="University Phone Number"
        value={uniInfo.Phone}
        onChange={handleInputChange}
      /><br />

      <span id="uni-profile-discretion-text">
        I understand that if I am not a registered and recognized university with the United States Government, I will not be allowed to manage reservations through Reserv. Reserv is not responsible for any disputes regarding reservations through our platform.
      </span>

      <label id="uni-profile-checkbox-message">
        <input type="checkbox" id="uni-profile-checkbox" />
        I understand and agree to the statement above
      </label>

      <div id="CompleteProfileButtonDiv">
        <button id="uni-profile-cancel-button" onClick={handleCancelClick}>Cancel</button>
        <button id="uni-profile-create-button" onClick={handleCreateClick}>Update Account</button>
      </div>
    </div>
  );
}

export default UniCompleteProfile;
