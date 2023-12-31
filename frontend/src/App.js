import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, createTheme } from '@mantine/core';

import './styles/App.css';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UniLoginPage from './pages/UniLoginPage';
import UniSignUpPage from './pages/UniSignUpPage';
import ResetPassword from './pages/ResetPassword';
import OrgProfilePage from './pages/Org/OrgProfilePage';
import OrgHomePage from './pages/Org/OrgHomePage';
import OrgSearchPage from './pages/Org/OrgSearchPage';
import OrgCompleteReservationPage from './pages/Org/OrgCompleteReservationPage';
import OrgReservationsPage from './pages/Org/OrgReservationsPage';
import OrgEditReservationsPage from './pages/Org/OrgEditReservationsPage';
import OrgSettingsPage from './pages/Org/OrgSettingsPage';
import OrgEmailVerification from './pages/Org/OrgEmailVerification';
import UniProfilePage from './pages/Uni/UniProfilePage';
import UniHomePage from './pages/Uni/UniHomePage';
import UniReservationsPage from './pages/Uni/UniReservationsPage';
import UniVerificationPage from './pages/Uni/UniVerificationPage';
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
          <Route path="/OrgLogin" element={<LoginPage />} />
          <Route path="/OrgCreateAccount" element={<SignUpPage />} />
          <Route path="/UniLogin" element={<UniLoginPage />} />
          <Route path="/UniCreateAccount" element={<UniSignUpPage />} />

          <Route path="/OrgProfilePage" element={<OrgProfilePage/>}/>
          <Route path="/OrgHomePage" element={<OrgHomePage/>}/>
          <Route path="/OrgSearchPage" element={<OrgSearchPage/>}/>
          <Route path="/OrgCompleteReservationPage" element={<OrgCompleteReservationPage/>}/>
          <Route path="/OrgReservationsPage" element={<OrgReservationsPage/>}/>
          <Route path="/OrgEditReservationsPage" element={<OrgEditReservationsPage/>}/>
          <Route path="/OrgSettingsPage" element={<OrgSettingsPage/>}/>
          <Route path="/EmailVerification" element={<OrgEmailVerification/>}/>
          <Route path="/ResetPassword" element={<ResetPassword/>}/>

          <Route path="/UniProfilePage" element={<UniProfilePage/>}/>
          <Route path="/UniHomePage" element={<UniHomePage/>}/>       
          <Route path="/UniVerificationPage" element={<UniVerificationPage/>}/>
          <Route path="/UniReservationsPage" element={<UniReservationsPage/>}/>
          <Route path="/UniSettingsPage" element={<UniSettingsPage/>}/>

        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
