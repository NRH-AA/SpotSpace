import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const GoogleMapComponent = ({latt, lngt, heightt, widtht}) => {
    const dispatch = useDispatch();
    const [lat, setLat] = useState(latt || -3.745);
    const [lng, setLng] = useState(lngt || -38.523);
    const [height, setHeight] = useState(heightt || 400);
    const [width, setWidth] = useState(widtht || 400);
    const [map, setMap] = useState(null);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // googleMapsApiKey: api
        googleMapsApiKey: process.env.GOOGLE_MAPS_API
    });
    
    const containerStyle = {
        height: height,
        width: width
    };
    
    const onLoad = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds({lat, lng});
        map.fitBounds(bounds);
    
        setMap(map);
    }, [])
    
    const onUnmount = useCallback(map => {
        setMap(null);
    }, [])
    
    return isLoaded ? 
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat, lng}}
            zoom={20}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
      </GoogleMap>
    
    : null
};

export default GoogleMapComponent;
