import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, createTheme } from '@mantine/core';

import './styles/App.css';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OrgHomePage from './pages/Org/OrgHomePage';
import OrgSearchPage from './pages/Org/OrgSearchPage';
import OrgReservationsPage from './pages/Org/OrgReservationsPage';
import OrgSettingsPage from './pages/Org/OrgSettingsPage';
import UniProfilePage from './pages/Uni/UniProfilePage';

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
          <Route path="/OrgHomePage" element={<OrgHomePage/>}/>
          <Route path="/OrgSearchPage" element={<OrgSearchPage/>}/>
          <Route path="/OrgReservationsPage" element={<OrgReservationsPage/>}/>
          <Route path="/OrgSettingsPage" element={<OrgSettingsPage/>}/>
          <Route path="/UniProfilePage" element={<UniProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
