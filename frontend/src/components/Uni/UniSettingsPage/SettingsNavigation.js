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
      //console.log(data);
      SetUniData(data);
    }
    fetchUniInfo();
  }, []);

  return (
    <div>
      <h2>University</h2>
      <p>University Name: {uniData.UniName}</p>
      <p>Address: {uniData.Address}</p>
      <p>Phone Number: {uniData.Phone}</p>
      <p>Email Domain: {uniData.EmailDomain}</p>
      <p>Hours: M-F 8AM-7PM</p>
      <p>Website: {uniData.Website}</p>
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
  var oldPassword;
  var newPassword;

  const ChangePassword = async() =>
  {
    var obj = { UniversityID: "655673b363bf110ce2b499ee", Password: oldPassword, NewPassword: oldPassword};
    var js = JSON.stringify(obj);
    try
        {
            const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/adminChangePassword',
            /*const response = await fetch('http://localhost:5000/api/adminChangePassword',*/
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
  }

  return (
    <div>
      <h2>User Settings</h2>
      <form id="ChangePasswordForm">
        <label>Previous Password: <input type="password" ref={(c) => (oldPassword = c)} required/></label><br/>
        <label>New Password: <input type="password" ref={(c) => (newPassword = c)} required/></label>
        <button type='submit' id="password-change-button" onClick={ChangePassword}>Change</button><br/>
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