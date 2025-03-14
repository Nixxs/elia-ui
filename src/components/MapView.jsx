import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Box from '@mui/material/Box';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -31.9505, // Example: Perth
    lng: 115.8605,
};

const MapView = ({ onMapLoad }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // From .env
    });

    const handleMapLoad = (mapInstance) => {
        const dataLayer = new window.google.maps.Data({ map: mapInstance });

        // Store data layer on the map instance for future access
        mapInstance.dataLayer = dataLayer;

        console.log("Map and Data Layer initialized!");

        onMapLoad(mapInstance);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={handleMapLoad} 
                >
                    {/* Any children or future overlays */}
                </GoogleMap>
            ) : (
                <p>Loading map...</p>
            )}
        </Box>
    );
};

export default MapView;
