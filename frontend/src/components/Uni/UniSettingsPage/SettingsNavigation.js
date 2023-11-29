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
  { link: '', label: 'University Info', icon: IconBuildingCommunity },
  // { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Login Info', icon: IconKey },
  // { link: '', label: 'Other Settings', icon: IconSettings },
];




function UniversityInfo() {

  const initialUni = 
  {
    UniName: "",
    Address: "",
    Phone: "",
    EmailDomain: "",
    Website: ""
  }

  const [uniData, SetUniData] = useState(initialUni);

  useEffect(() => {
      const GetUniInfo = async () =>
      {
        var obj = { UniversityID: "655673b363bf110ce2b499ee" };
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/GetUniInfo',
            //const response = await fetch('http://localhost:5000/api/GetUniInfo',
            {method:'POST',
            body:js,
            headers:{'Content-Type':'application/json'}});
            var res = await response.json();
            console.log(res.responseObject);
            return res;

        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };
    const fetchUniInfo = async () => {
      var data = await GetUniInfo();
      SetUniData(data);
    }
    fetchUniInfo();
  }, []);

  const handleConfirmChanges = async () => {
    
    var userToken = localStorage.getItem('userToken');

    var obj = {
      UniName: initialUni.UniName,
      Address: initialUni.Address,
      Phone: initialUni.Phone,
      EmailDomain: initialUni.EmailDomain,
      Website: initialUni.Website,
    };
    var js = JSON.stringify(obj);
    console.log(js);

    try {
      const response = await fetch("https://knightsreserv-00cde8777914.herokuapp.com/api/updateUniversityInfo", {
      //const response = await fetch('http://localhost:5000/api/updateUniInfo', {
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
      <h2>University</h2>
      <hr class="settings-menu-divider" />

      <label class="settings-menu-label">
        University Name:
        <input
          type="text"
          class="settings-menu-input"
          value={uniData.UniName}
          onChange={(e) => SetUniData({ ...uniData, UniName: e.target.value })}        />
      </label><br />
      
      <label class="settings-menu-label">
        Address:
        <input
          type="text"
          class="settings-menu-input"
          value={uniData.Address}
          onChange={(e) => SetUniData({ ...uniData, Address: e.target.value })}        />
      </label><br />

      <label class="settings-menu-label">
        Phone Number:
        <input
          type="text"
          class="settings-menu-input"
          value={uniData.Phone}
          onChange={(e) => SetUniData({ ...uniData, Phone: e.target.value })}
        />
      </label><br />

      <label class="settings-menu-label">
        Email Domain:
        <input
          type="text"
          class="settings-menu-input"
          value={uniData.EmailDomain}
          onChange={(e) => SetUniData({ ...uniData, EmailDomain: e.target.value })}
        />
      </label><br />

      <label class="settings-menu-label">
        Website:
        <input
          type="text"
          class="settings-menu-input"
          value={uniData.Website}
          onChange={(e) => SetUniData({ ...uniData, Website: e.target.value })}
        />
      </label><br />

      {/* <button class="settings-menu-confirmChanges" onClick={handleConfirmChanges}> Confirm Changes</button> */}
    </div>
  );
}

// function Notifications() {
//   const [reminders, setReminders] = useState(true);

//   const toggleReminders = () => {
//     setReminders(!reminders);
//   };

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <label>Reminders for Upcoming Events:</label>
//       <input type="checkbox" checked={reminders} onChange={toggleReminders} />
//     </div>
//   );
// }

function LoginInfo() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const ChangePassword = async (event) =>
  {
    event.preventDefault();
    alert("here");
    var obj = { UniID: "655673b363bf110ce2b499ee", Password: oldPassword, NewPassword: newPassword};
    var js = JSON.stringify(obj);
    alert(js);
    try
    {
        const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/adminChangePassword',
        {method:'PUT',
        body:js,
        headers:{'Content-Type':'application/json'}});
        var res = await response.json();
        console.log(res.responseObject);
        return res;
    }
    catch(e)
    {
        alert(e.toString());
        return;
    }
  }
  
  return (
    <div class="settings-menu-organization">
      <h2>User Settings</h2>
      <form id="ChangePasswordForm">
        <label class="settings-menu-label">
          Previous Password: 
          <input class="settings-menu-input" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required/>
        </label>

        <br/>
    
        <label class="settings-menu-label">
          New Password: 
          <input class="settings-menu-input" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
         </label>

        <button class="settings-menu-confirmChanges" type='submit' id="password-change-button" onClick={ChangePassword}>Change</button><br/>
      </form>
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
  const [active, setActive] = useState('University Info');

  const components = {
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