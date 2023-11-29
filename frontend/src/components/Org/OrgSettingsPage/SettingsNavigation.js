import React from 'react';
import { useState, useEffect } from 'react';
import {
  IconBellRinging,
  IconKey,
  IconSettings,
  IconBuildingCommunity,
  IconUser,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import '@mantine/core/styles.css';
import classes from '../../../styles/SettingsNavigation.module.css';

const data = [
  { link: '', label: 'Organization Info', icon: IconUser },
  { link: '', label: 'University Info', icon: IconBuildingCommunity },
  { link: '', label: 'Login Info', icon: IconKey },
];

function OrganizationInfo() {
  const [organizationData, setOrganizationData] = useState({
    organizationName: '',
    description: '',
    authorizedOfficerFirstName: '',
    authorizedOfficerLastName: '',
    phoneNumber: '',
    facultyAdvisor: '',
    facultyAdvisorEmail: '',
    secondaryContactName: '',
    secondaryContactEmail: '',
  });

  const fetchOrganizationData = async () => {
    const storedData = JSON.parse(localStorage.getItem("userInfo"));

    var obj = { RSOID:storedData.RSOID };
    var js = JSON.stringify(obj);
    var response;

    try {
      response = await fetch("https://knightsreserv-00cde8777914.herokuapp.com/api/RetrieveRSO", {
      //response = await fetch('http://localhost:5000/api/RetrieveRSO', {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json", },
      });
    }
    catch (e) {
      alert(e.toString());
      return;
    }
    
    var data = await response.json();
    setOrganizationData({
      organizationName: data.RSOName,
      description: '',
      authorizedOfficerFirstName: data.OfficerFirstName,
      authorizedOfficerLastName: data.OfficerLastName,
      phoneNumber: data.Phone,
      facultyAdvisor: data.AdvisorName,
      facultyAdvisorEmail: data.AdvisorEmail,
      secondaryContactName: data.SecondaryContactName,
      secondaryContactEmail: data.SecondaryContactEmail,
    });
    console.log(organizationData);
  };

  useEffect(() => {
    fetchOrganizationData();
  }, []);

  const handleInputChange = (field, value) => {
    setOrganizationData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(organizationData);
  };

  const handleConfirmChanges = async () => {
    
    var userToken = localStorage.getItem('userToken');

    var obj = {
      RSOName: organizationData.organizationName,
      OfficerFirstName: organizationData.authorizedOfficerFirstName,
      OfficerLastName: organizationData.authorizedOfficerLastName,
      Phone: organizationData.phoneNumber,
      AdvisorName: organizationData.facultyAdvisor,
      AdvisorEmail: organizationData.facultyAdvisorEmail,
      SecondaryContactName: organizationData.secondaryContactName,
      SecondaryContactEmail: organizationData.secondaryContactEmail,
    };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      const response = await fetch("https://knightsreserv-00cde8777914.herokuapp.com/api/updateRSOInfo", {
      //const response = await fetch('http://localhost:5000/api/updateRSOInfo', {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${userToken}`, },
      });
    }
    catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div class="settings-menu-organization">
      <h2>Organization</h2>
      <hr class="settings-menu-divider" />
      <h5>Organization Information</h5>
      <label class="settings-menu-label">
        Organization Name:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.organizationName}
          onChange={(e) => handleInputChange('organizationName', e.target.value)}
        />
      </label><br />
      <label class="settings-menu-label">
        Phone Number:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
        />
      </label><br />
      <hr class="settings-menu-divider" />
      <h5>Officer Information</h5>
      <label class="settings-menu-label">
        Authorized Officer's First Name:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.authorizedOfficerFirstName}
          onChange={(e) => handleInputChange('authorizedOfficerFirstName', e.target.value)}
        />
      </label><br />
      <label class="settings-menu-label">
        Authorized Officer's Last Name:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.authorizedOfficerLastName}
          onChange={(e) => handleInputChange('authorizedOfficerLastName', e.target.value)}
        />
      </label><br />

      <hr class="settings-menu-divider" />
      <h5>Faculty Advisor Information</h5>
      <label class="settings-menu-label">
        Faculty Advisor:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.facultyAdvisor}
          onChange={(e) => handleInputChange('facultyAdvisor', e.target.value)}
        />
      </label><br />
      <label class="settings-menu-label">
        Faculty Advisor Email:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.facultyAdvisorEmail}
          onChange={(e) => handleInputChange('facultyAdvisorEmail', e.target.value)}
        />
      </label><br />
      <hr class="settings-menu-divider" />
      <h5>Secondary Contact Information</h5>
      <label class="settings-menu-label">
        Secondary Contact Name:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.secondaryContactName}
          onChange={(e) => handleInputChange('secondaryContactName', e.target.value)}
        />
      </label><br />
      <label class="settings-menu-label">
        Secondary Contact Email:
        <input
          type="text"
          class="settings-menu-input"
          value={organizationData.secondaryContactEmail}
          onChange={(e) => handleInputChange('secondaryContactEmail', e.target.value)}
        />
      </label><br />
      <button class="settings-menu-confirmChanges" onClick={handleConfirmChanges}>Confirm Changes</button>
    </div>
  );
}

function UniversityInfo() {
  return (
    <div class="settings-menu-organization">
      <h2>University</h2>
      <p>University of Central Florida</p>
      <p>4098 Libra Dr, Orlando, FL 32816</p>
      <p>407-823-2000</p>
      <p>https://www.ucf.edu/</p>
    </div>
  );
}

function LoginInfo() {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [deleteAccountClicked, setDeleteAccountClicked] = useState(false);

  const handleEmailChange = (e) => {
    // PERFORM API CALL TO CHANGE EMAIL?
    setEmail(e.target.value);
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    // PERFORM API CALL TO CHANGE PASSWORD?
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRetypeNewPasswordChange = (e) => {
    setRetypeNewPassword(e.target.value);
  };

  const handleDeleteAccount = () => {
    // PERFORM API CALL TO DELETE ACCOUNT?
  };

  const canSubmitEmailChange = email && newEmail;
  const canSubmitPasswordChange = password && newPassword && newPassword === retypeNewPassword;

  return (
    <div class="settings-menu-organization">
      <h2>Login Settings</h2>
      <hr settings-menu-divider/>
      <h5>Change Email</h5>
      <label class="settings-menu-label">
        Current Email:
        <input type="text" class="settings-menu-input" value={email} onChange={handleEmailChange} />
      </label><br />
      <label class="settings-menu-label">
        New Email:
        <input type="text" class="settings-menu-input" value={newEmail} onChange={handleNewEmailChange} />
      </label><br />
      <button onClick={handleEmailChange} class="settings-menu-confirmChanges" disabled={!canSubmitEmailChange}>
        Confirm Email Change
      </button>
      <hr settings-menu-divider/>
      <h5>Change Password</h5>
      <label class="settings-menu-label">
        Current Password:
        <input type="password" class="settings-menu-input" value={password} onChange={handlePasswordChange} />
      </label><br />
      <label class="settings-menu-label">
        New Password:
        <input type="password" class="settings-menu-input" value={newPassword} onChange={handleNewPasswordChange} />
      </label><br />
      <label class="settings-menu-label">
        Retype New Password:
        <input type="password" class="settings-menu-input" value={retypeNewPassword} onChange={handleRetypeNewPasswordChange} />
      </label><br />
      <button onClick={handlePasswordChange} class="settings-menu-confirmChanges" disabled={!canSubmitPasswordChange}>
        Confirm Password Change
      </button>
      <hr settings-menu-divider/>
      <h5>Delete Account</h5>
      <h6>After you perform this operation, any and all data stored will be wiped!</h6>
      <button
        class="settings-menu-confirmChanges"
        onClick={() => {
          if (deleteAccountClicked) {
            setDeleteAccountClicked(false);
            handleDeleteAccount();
          } else {
            setDeleteAccountClicked(true);
          }
        }}
        disabled={deleteAccountClicked}
      >
        {deleteAccountClicked ? 'Confirm Deletion' : 'Delete'}
      </button>
    </div>
  );
}

function OtherSettings() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <h2>Other Settings</h2>
      <label>Dark Mode:</label>
      <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
    </div>
  );
}
export function SettingsNavigation() {
  const [active, setActive] = useState('Organization Info');

  const components = {
    'Organization Info': <OrganizationInfo />,
    'University Info': <UniversityInfo />,
    'Login Info': <LoginInfo />,
    'Other Settings': <OtherSettings />,
  };

  const activeComponent = components[active] || null;

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={2} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div className={classes.settingsContainer}>
      <div className={classes.navigation}>
        <nav className={classes.navbar}>
          {links}     
        </nav>
      </div>

      <div className={classes.info}>
        {activeComponent}
      </div>
    </div>
  );
}