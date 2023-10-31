import React, { useState } from 'react';
import '../../../styles/index.css';

function ChangeViewButton({ toggleList }) {
    const [isMapView, setIsMapView] = useState(false);

    const handleButtonClick = () => {
        toggleList();
        setIsMapView(!isMapView);
    };

    return (
        <div>
            <button
                className="change-view-button"
                onClick={handleButtonClick}
            >
                {isMapView ? 'List View' : 'Map View'}
            </button>
        </div>

  );
}

export default ChangeViewButton;