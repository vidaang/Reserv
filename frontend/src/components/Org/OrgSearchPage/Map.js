import React from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

function Map( { toggleList } )
{
    var roomListReturn = [];

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    });

    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    const myLatLng = {
        lat: 28.602333068847656,
        lng: -81.20020294189453
    };

    let buildingLatLng = {
        lat: 0,
        lng: 0
    };

    const setRoomList = (roomList) => {
        alert("here");
        roomList.forEach(room => {
            roomListReturn.push({
                RoomID: room.RoomID,
                RoomNumber: room.RoomNumber,
                RoomInfo: room.RoomInfo,
                MediaEquip: room.MediaEquip,
                RoomType: room.RoomType,
                Date: room.Date,
                ResrveTimes: room.ResrveTimes,
                UniID: room.UniID,
                BuildingID: room.BuildingID
            })
        });
    }
    
    const handleClickedMap = (e) => {
        

        const getRoomList = async () =>
        {

            var obj = { Latitude:buildingLatLng.lat, Longitude:buildingLatLng.lng };
            var js = JSON.stringify(obj);
            console.log(js);
            try
            {
                const response = await fetch('http://localhost:5000/api/RetrieveRooms',
                {method:'POST',
                body:js,
                headers:{'Content-Type':'application/json'}});
                var res = await response.json();
                console.log(res.roomList);
                return res.roomList;
            }
            catch(e)
            {
                alert(e.toString());
                return;
            }
        };

        const fetchRoomListData = async () => {        
            var data;
            data = await getRoomList();           
            setRoomList(data);      
        };

        let latitude = e.latLng.lat()
        let longtitude  = e.latLng.lng()
        buildingLatLng.lat = latitude
        buildingLatLng.lng = longtitude 
        fetchRoomListData(); 
        console.log(roomListReturn);

        if (roomListReturn.length != 0)
            toggleList();
    };
    


    return(
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
                onClick={handleClickedMap }
                />
            )}
        </div>
    );
}

export default Map;