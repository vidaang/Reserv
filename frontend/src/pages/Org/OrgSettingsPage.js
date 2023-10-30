import React from 'react';
import NavBar from '../../components/NavBar';
import { SettingsNavigation } from '../../components/Org/OrgSettingsPage/SettingsNavigation';
// frontend\src\components\Org\OrgSettingsPage\SettingsNavigation.tsx
import { Text, Container } from '@mantine/core';

import '../styles/SettingsNavigation.module.css';
import '../styles/index.css';

function OrgSettingsPage()
{

    return (
        <div id="OrgProfilePageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>

            <header>
                <div id="NavBar">
                    <NavBar />
                </div>
            </header>

            <div id="settings-body">
                <SettingsNavigation />
            </div>

        </div>

    );
}

export default OrgSettingsPage;