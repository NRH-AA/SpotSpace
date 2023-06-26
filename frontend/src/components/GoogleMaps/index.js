import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMapComponent = ({heightt, widtht}) => {
    const [height, setHeight] = useState(heightt || 400);
    const [width, setWidth] = useState(widtht || 400);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [selected, setSelected] = useState(null);
    
    
    const lat = 43.2103050066574;
    const lng = -123.34474119991873;
    const [center, setCenter] = useState({lat, lng})

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        googleMapsApiKey: '',
        libraries
    });
    
    const containerStyle = {
        height: height,
        width: width,
        borderRadius: '15px',
        margin: 'auto'
    };
    
    const onLoad = useCallback(map => {
        const bounds = new window.google.maps.LatLngBounds({lat, lng});
        map.fitBounds(bounds);
        map.setZoom(15);
        setMap(map);
    }, []);
    
    const onUnmount = useCallback(map => {
        setMap(null);
    }, []);
    
    
    const onMapClick = useCallback((event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }
        
        setMarker(newMarker); 
        setSelected(newMarker);
        setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()});
    }, []);
    
    return isLoaded ? <>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onMapClick}
        >
        
        {marker && 
            <Marker 
                position={{lat: marker.lat, lng: marker.lng}}
            />
        }
        
        {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}}
            onCloseClick={() => setSelected(null)}
        >
            <div>
                <h2>Spot Selected</h2>
            </div>
        </InfoWindow>) : null}
        
      </GoogleMap>
    
    </>: null
};

export default GoogleMapComponent;
