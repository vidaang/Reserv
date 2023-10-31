import React, { Component } from 'react';
import Lecture from '../../../images/lecture-hall-3.jpg';


class Room extends Component{
    handleClick = () => {
        this.props.toggleModal();
    };

    render(){
        return(
            <div id="RoomDiv" onClick={this.handleClick}>
                <img src={ Lecture } alt="Card 1"className="org-home-card-img"/>
                <h1>Room</h1>
                <p>Description for room</p>
            </div>
        )
    }
}

export default Room