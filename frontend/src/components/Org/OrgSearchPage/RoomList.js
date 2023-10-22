import React from 'react';
import Room from './Room';
import {Row} from "react-bootstrap";
import * as ReactDOM from 'react-dom';
import createRoot from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
const element = <Room/>;
root.render(element);

class RoomList extends Room{
    render () {
        return(
            <div>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <h1>dunsifsdunfuisdhfn</h1>
                </Row>
                <Row>
                    <h1>dunsifsdunfuisdhfn</h1>
                </Row>
                <Row>
                    <h1>dunsifsdunfuisdhfn</h1>
                </Row>
                <Row>
                    <h1>dunsifsdunfuisdhfn</h1>
                </Row>
                <Row>
                    <h1>dunsifsdunfuisdhfn</h1>
                </Row>
                <Row>
                    <h1>dunsifsdunfuisdhfn</h1>
                </Row>        
            </div>
        );
    };
    
}


export default RoomList
