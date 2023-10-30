import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, createTheme } from '@mantine/core';

import './styles/App.css';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OrgProfilePage from './pages/Org/OrgProfilePage';
import OrgHomePage from './pages/Org/OrgHomePage';
import OrgSearchPage from './pages/Org/OrgSearchPage';
import OrgReservationsPage from './pages/Org/OrgReservationsPage';
import OrgSettingsPage from './pages/Org/OrgSettingsPage';
import UniProfilePage from './pages/Uni/UniProfilePage';
import UniHomePage from './pages/Uni/UniHomePage';
import UniOrganizationsPage from './pages/Uni/UniOrganizationsPage';
import UniSettingsPage from './pages/Uni/UniSettingsPage';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/CreateAccount" element={<SignUpPage />} />

          <Route path="/OrgProfilePage" element={<OrgProfilePage/>}/>
          <Route path="/OrgHomePage" element={<OrgHomePage/>}/>
          <Route path="/OrgSearchPage" element={<OrgSearchPage/>}/>
          <Route path="/OrgReservationsPage" element={<OrgReservationsPage/>}/>
          <Route path="/OrgSettingsPage" element={<OrgSettingsPage/>}/>

          <Route path="/UniProfilePage" element={<UniProfilePage/>}/>
          <Route path="/UniHomePage" element={<UniHomePage/>}/>
          <Route path="/UniOrganizationsPage" element={<UniOrganizationsPage/>}/>
          <Route path="/UniSettingsPage" element={<UniSettingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
