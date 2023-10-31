import React from 'react';
import { useState } from 'react';
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
  { link: '', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Login Info', icon: IconKey },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

function UniversityInfo() {
  return (
    <div>
      <h2>University</h2>
      <p>University Name: University of Central Florida</p>
      <p>Address: 3400 Quadrangle Blvd, Orlando, FL 32817</p>
      <p>Phone Number: (407) 266-3627</p>
      <p>Email: Your University Email</p>
      <p>Hours: M-F 8AM-7PM</p>
      <p>Website: ucf.edu</p>
    </div>
  );
}

function Notifications() {
  const [reminders, setReminders] = useState(true);

  const toggleReminders = () => {
    setReminders(!reminders);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <label>Reminders for Upcoming Events:</label>
      <input type="checkbox" checked={reminders} onChange={toggleReminders} />
    </div>
  );
}

function LoginInfo() {
  return (
    <div>
      <h2>User Settings</h2>
      <label>Change Username: <input type="text" /></label><br />
      <label>Change Password: <input type="password" /></label><br />
      <label>Delete Account: <button>Delete</button></label>
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
    'Notifications': <Notifications />,
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