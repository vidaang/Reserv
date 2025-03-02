import { React, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import RoomList from './RoomList';
import '../../../styles/index.css';

// const baseUrl = "https://knightsreserv-00cde8777914.herokuapp.com";
const baseUrl = "http://localhost:5000";

function Map( { toggleList, isListOpen} )
{
    const initialLatLng = {
        lat: 28.602333068847656,
        lng: -81.20020294189453
    };

    const [roomList, setRoomList] = useState(new Set());
    const [selectedLocation, setSelectedLocation] = useState({initialLatLng});
    const [myLatLng, setLatLng] = useState(initialLatLng);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    });

    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    const listClass = `list${isListOpen ? ' slide-right' : ''}`;

    const formatRoomList = (roomList) => {
        
        if(roomList === undefined)
        {
            setRoomList(new Set());
            return;
        }    
        
        var roomListReturn = new Set();

        roomList.forEach(room => {
            roomListReturn.add({
                RoomID: room.RoomID,
                RoomNumber: room.RoomNumber,
                RoomInfo: room.RoomInfo,
                MediaEquip: room.MediaEquip,
                RoomType: room.RoomType,
                Date: room.Date,
                ResrveTimes: room.ResrveTimes,
                UniID: room.UniID,
                BuildingID: room.BuildingID,
                Capacity: room.Capacity
            })
        });

        setRoomList(roomListReturn);
    }
    
    const clearRooms = () => {
        setRoomList(new Set());
    }
    
    useEffect(() => {
        clearRooms();

        const getRoomList = async () =>
        {
            var obj = { Latitude:selectedLocation.lat, Longitude:selectedLocation.lng };
            var js = JSON.stringify(obj);
            console.log(js);

            const response = await fetch(`${baseUrl}/api/RetrieveRooms`,
            {method:'POST',
            body:js,
            headers:{'Content-Type':'application/json'}});
            var res = await response.json();
            return res.roomList;
        };

        const fetchRoomListData = async () => {        
            var data;
            data = await getRoomList();           
            formatRoomList(data);      
        };

        fetchRoomListData();
    }, [selectedLocation]);

    const handleClickedMap = (e) => {
        let latitude = e.latLng.lat();
        let longtitude  = e.latLng.lng();
        var newLatLng = {
            lat: latitude,
            lng: longtitude
        };
        setLatLng(newLatLng);
        setSelectedLocation(newLatLng);
        console.log(roomList); 
    };


    return(
        <div>
            <div className="MapDiv">
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                    mapContainerClassName="map-container"
                    center= {myLatLng}
                    zoom={17}
                    fullScreenControl={false}
                    streetView={null}
                    options={{mapId: '3b7df45197247861'}}
                    onClick={handleClickedMap}
                    />
                )}
            </div>
            {isListOpen && roomList !== undefined && (
                <div className={listClass}>
                    <div className="list-container">
                        <RoomList rooms={roomList}/> 
                    </div>
                </div>
            )}
        </div>
    );
}

export default Map;