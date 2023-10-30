import React from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

function Map()
{
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    });

    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
    const myLatLng = {
        lat: 28.602333068847656,
        lng: -81.20020294189453
      };

      let buildingLatLng = {
        lat: 28.602333068847656,
        lng: -81.20020294189453
      };
    
    const handleClickedMap = (e) => {
        let latitude = e.latLng.lat()
        let longtitude  = e.latLng.lng()
        buildingLatLng.lat = latitude
        buildingLatLng.lng = longtitude
        alert("latitude:"  + buildingLatLng.lat + " longitude:" + buildingLatLng.lng)
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