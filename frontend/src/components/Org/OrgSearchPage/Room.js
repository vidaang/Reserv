import React, { Component } from 'react';
import Lecture from '../../../images/lecture-hall-3.jpg';
import '../../../styles/index.css';

class Room extends Component {
  render() {
    const { name, description, onClick } = this.props;

    return (
      <div id="RoomDiv" onClick={onClick}>
        <img src={Lecture} alt="Room Image" className="org-home-card-img" />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    );
  }
}

export default Room;