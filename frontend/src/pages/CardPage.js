import React from 'react';

import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const CardPage = () =>
{
    return(
        <div id="user-authentication-container">
            <div id="user-authentication-container-elements">
                <h1 id="user-authetication-title">COP 4331 MERN Stack Demo</h1>
                <LoggedInName />
                <CardUI />
            </div>
        </div>
    );
}

export default CardPage;