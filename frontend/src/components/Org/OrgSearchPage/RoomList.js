import React, { Component } from 'react';
import Room from './Room';
import {Row} from "react-bootstrap";
import * as ReactDOM from 'react-dom';
import createRoot from 'react-dom/client';


class RoomList extends Component{
    render () {
        return(
            <div>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <Room/>
                </Row>
                <Row>
                    <Room/>
                </Row>        
            </div>
        );
    };
    
}


export default RoomList
