import { React, useState, useEffect } from 'react';
import VerificationList from '../../components/Uni/UniVerificationPage/VerificationList';
import NavBar from '../../components/NavBar';
import "../../styles/index.css";

// Get orgs based on boolean database "verified" value, send list of orgs to VerificationList
function UniVerificationPage()
{
    const UniID = "655673b363bf110ce2b499ee";
    const [orgArray, setOrgArray] = useState([])

    const createRSOArray = (orgList) => {
        if (orgList === undefined) return;

        var rsoSet = new Set();
        
        orgList.forEach(org => {
            rsoSet.add({
                name: org.RSOName,
                officer: org.OfficerFirstName + " " + org.OfficerLastName,
                email: org.Email,
                phone: org.Phone,
                advisor: org.AdvisorName,
                advisor_email: org.AdvisorEmail,
                id: org.RSOID
            });
        });

        console.log(orgList);
        setOrgArray([...rsoSet]);
    };

    useEffect(() => {
        const getVerificationList = async () =>
        {
            var obj = { UniID:UniID, VerificationFlag:false };
            var js = JSON.stringify(obj);
            console.log(js);
            try
            {   
                const response = await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/RetrieveRSO',
                //const response = await fetch('http://localhost:5000/api/RetrieveRSO',
                {
                    method:'POST',
                    body:js,
                    headers:{'Content-Type':'application/json'}
                });
                var res = await response.json();
                console.log(res.RSOList);
                return res.RSOList;
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }
        }

        const fetchVerificationList = async () => {
            var data;
            data = await getVerificationList();
            createRSOArray(data);
        };

        fetchVerificationList();
    }, []);

    return (
        <div id="UniVerificationsPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <NavBar />
            <h1 id="verification-page-header">Verify Organizations</h1>          
            <VerificationList orgs={ orgArray } />          
        </div>
    );
}

export default UniVerificationPage;