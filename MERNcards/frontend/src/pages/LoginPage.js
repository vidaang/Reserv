import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';

const LoginPage = () =>
{
    return(
        <div id="LoginPageDiv">
            <div id="LoginInternalElements">
            <PageTitle />
            <Login />
            <CreateAccount />
            </div>
        </div>
    );
};
export default LoginPage;
