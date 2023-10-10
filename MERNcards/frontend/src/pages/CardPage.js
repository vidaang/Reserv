import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';

const CardPage = () =>
{
    return(
        <div id="LoginPageDiv">
            <div id="LoginInternalElements">
                <PageTitle />
                <LoggedInName />
                <CardUI />
            </div>
        </div>
    );
}

export default CardPage;