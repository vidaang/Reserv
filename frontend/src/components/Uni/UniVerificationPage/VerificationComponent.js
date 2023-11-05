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
                <button id="verification-accept-button" onClick={handleClick}>Accept</button>
                <button id="verification-deny-button" onClick={handleClick}>Deny</button>
            </div>
        </div>
    );
}

export default VerificationComponent;