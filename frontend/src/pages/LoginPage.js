import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';
import { Link } from 'react-router-dom';

const LoginPage = () =>
{
    const [show,setShow] = useState(true);

    return(
        <div id="LoginPageDiv">
            <div id="LoginInternalElements">
            {
                show? 
                    <div>
                        <PageTitle />
                        <Login />
                        <Link onClick={()=>setShow(false)}>No Account? Create One!</Link>
                    </div>:
                    <div>
                        <PageTitle />
                        <CreateAccount />
                        <Link onClick={()=>setShow(true)}>Already have an Account? Sign In!</Link>
                    </div>
                    
            }     
            </div>              
        </div>
    );
};
export default LoginPage;
