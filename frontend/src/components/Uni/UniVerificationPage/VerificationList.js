import React from 'react';
import VerificationComponent from './VerificationComponent';

function VerificationList({ orgs })
{
    return(
        <div id="verification-list-container">
            {orgs.map((item, index) => (
                <VerificationComponent org={item} />
            ))}
        </div>
    );
}

export default VerificationList;