import React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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

    return(
        <div className="MapDiv">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                mapContainerClassName="map-container"
                center={myLatLng}
                zoom={14}
                fullscreenControl={false}
                streetView={false}
                options={{mapId: '3b7df45197247861'}}
                />
            )}
        </div>
    );
}

export default Map;