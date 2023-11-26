import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

const handleClick = () =>
{
    alert("Clicked.");
};

function VerificationComponent({ org })
{
    const [opened, { open, close }] = useDisclosure(false);

    const verifyRSO = async () => {
        var obj = { RSOID:org.id };
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/VerifyRSO',
            // await fetch('http://localhost:5000/api/VerifyRSO',
            {
                method:'PUT',
                body:js,
                headers:{'Content-Type':'application/json'}
            });
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    const handleAcceptClick = async () => {
        await verifyRSO();
        window.location.reload();
    };

    return (
        <div id="verification-container">
            <h1>{ org.name }</h1>
            <h2>{ org.officer }</h2>
            <h2>{ org.email }</h2>
            <span onClick={open}>View More Info</span>
            <Modal id="verification-modal" opened={opened} onClose={close} title="Organization Information">
                <div id="verification-modal-container">
                    <h1>{ org.name }</h1>
                    <h2>Officer Name: { org.officer }</h2>
                    <h2>Email: { org.email }</h2>
                    <h2>Phone: { org.phone }</h2>
                    <h2>Advisor: { org.advisor }</h2>
                    <h2>Advisor Email: { org.advisor_email }</h2>
                </div>
            </Modal>
            <div id="verification-button-div">
                <button id="verification-accept-button" onClick={handleAcceptClick}>Accept</button>
                <button id="verification-deny-button" onClick={handleClick}>Deny</button>
            </div>
        </div>
    );
}

export default VerificationComponent;