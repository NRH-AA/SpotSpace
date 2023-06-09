import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../../store/spots';
import { csrfFetch } from '../../../store/csrf';
import GoogleMapComponent from '../../GoogleMaps';
import CreateSpotNightSlider from './xSlider';
// import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Geocode from "react-geocode";
import './CreateSpotModal.css';
import Logo from '../../Navigation/images/logo.png';


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
Geocode.setLanguage("en");
Geocode.setRegion("us");

if (process.env.NODE_ENV !== 'production') {
    Geocode.enableDebug();
}

const CreateSpotModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const sessionUser = useSelector(state => state.session.user);
    
    const [country, setCountry] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [cleaningFee, setCleaningFee] = useState(0);
    const [nights, setNights] = useState(1);
    const [amenity, setAmenity] = useState('');
    const [amenities, setAmenities] = useState('');
    const [amenityError, setAmenityError] = useState(null);
    
    const [image1, setImage1] = useState({});
    const [image2, setImage2] = useState({});
    const [showImage2, setShowImage2] = useState(false);
    const [image3, setImage3] = useState({});
    const [showImage3, setShowImage3] = useState(false);
    const [image4, setImage4] = useState({});
    const [showImage4, setShowImage4] = useState(false);
    
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    
    const [locateMe, setLocateMe] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const lat = '0.00';
    const lng = '0.00';
    
    const [latt, setLatt] = useState(0.0);
    const [lngt, setLngt] = useState(0.0);
    
    const validateForm = () => {
        const err = {};
        
        if (!country) err.country = "Country is required";
        if (!address) err.address = "Address is required";
        if (!city) err.city = "City is required"
        if (!state) err.state = "State is required";
        if (!name) err.name = "Name is required";
        if (!price) err.price = "Price is required";
        
        if (address.length < 5 || address.length > 30) err.address = "Address (5-30) Characters";
        if (city.length < 5 || city.length > 20) err.city = "City (5-20) Characters";
        if (description.length < 10 || description.length > 500) err.desc = "Description (10-500) Characters";
        if (name.length < 5 || name.length > 20) err.name = "Title (5-20) Characters";
        
        if (price === 0) err.price = "Price cannot be zero";
        
        if (!image1.url) err.image1 = "Preview image is required";
        
        return err;
    }
    
    useEffect(() => {
        if (isSubmitted) setFormErrors(validateForm());
    }, [isSubmitted, country, address, state, city, zipcode, description, name, price, image1]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSubmitted(true);
        
        const validateErrors = validateForm();
        if (Object.keys(validateErrors).length > 0) {
            alert('Please Fix Form Errors.');
            return setFormErrors(validateErrors);
        };
        
        setErrors([]);
        
        const spotData = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat: `${latt}` || lat,
            lng: `${lngt}` || lat,
            zipcode,
            maxGuests,
            cleaningFee,
            amenities
        };
        
        const imageData = [];
        imageData.push({url: image1.url, preview: true});
        if (image2.url) imageData.push({url: image2.url, preview: false});
        if (image3.url) imageData.push({url: image3.url, preview: false});
        if (image4.url) imageData.push({url: image4.url, preview: false});

        await dispatch(spotActions.createSpot(spotData, imageData))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) return setErrors(data.errors);
        });
        
        return history.push(`/spots/current`);
    };
    
    const createDemoSpot = async (e) => {
        e.preventDefault();

        const spotData = {
            address: new Date(),
            city: 'DemoCity',
            state: 'DemoState',
            country: 'DemoCountry',
            name: 'DemoTitle',
            description: 'Some random description',
            price: '100',
            lat,
            lng,
            zipcode: '11111',
            maxGuests,
            cleaningFee,
            amenities
        };
        
        const imageData = [];
        imageData.push({url: 'https://static.planetminecraft.com/files/resource_media/screenshot/1408/family_guy_griffin_house.jpg', preview: true})
        
        await dispatch(spotActions.createSpot(spotData, imageData))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) return setErrors(data.errors);
        });
        
        return history.push(`/spots/current`);
    }
    
    
    const updateImageFile = (e, i) => {
        const file = e.target.files[0];
        handleImageUpload(file, i);
    }
    
    const handleImageUpload = async (file, index) => {
        const formData = new FormData();
        formData.append("image", file);
        
        const imageData = await handleFetch(formData);
        if (!imageData) return setErrors(['Failed to get image url']);
        
        if (index === 1) return setImage1(imageData);
        if (index === 2) return setImage2(imageData);
        if (index === 3) return setImage3(imageData);
        if (index === 4) return setImage4(imageData);
    };
    
    const handleFetch = async (formData) => {
        const res = await csrfFetch('/api/upload', {
            method: "POST",
            ignore: true,
            body: formData,
        });
        
        if (res.ok) {
            const data = await res.json();
            if (!data) return setErrors(["Failed to upload image. Please try again."]);
            return data;
        };
    };
    
    const removePicture = (index) => {
        if (!index || index < 1 || index > 3) return;
        
        if (index === 1) return setImage1({});
        if (index === 2) return setImage2({});
        if (index === 3) return setImage3({});
        if (index === 4) return setImage4({});
    }
    
    const handleShowImage = () => {
        if (!showImage2) return setShowImage2(true);
        if (!showImage3) return setShowImage3(true);
        if (!showImage4) return setShowImage4(true);
    }
    
    
    
    const getAddressFromCoords = (lat, lng) => {
        Geocode.fromLatLng(lat, lng).then(
            response => {
              const address = response.results[0].formatted_address;
              return setFullAddress(address);
            }, error => {
                if (process.env.NODE_ENV !== 'production') console.log(error);
            }
        );
    };
    
    const navigatorOptions = {
        enableHighAccuracy: true, 
        timeout: 5000,
        maximumAge: 0
    }
    
    const getUserAddress = () => {
        if (locateMe) return setLocateMe(false);
        
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords
            
            setLatt(latitude);
            setLngt(longitude);
            getAddressFromCoords(latitude, longitude);
            setLocateMe(true);
        }, error => {
            if (process.env.NODE_ENV !== 'production') console.log(error);
        }, navigatorOptions);
    };
    
    useEffect(() => {
        if (fullAddress) {
            const split = fullAddress.split(', ');
            const streetAddress = split[0];
            const userCity = split[1];
            const userState = split[2].slice(0, 2);
            const userZipCode = split[2].slice(2, split[2].length);
            const userCountry = split[3];

            setAddress(streetAddress);
            setCountry(userCountry);
            setState(userState);
            setCity(userCity);
            setZipcode(userZipCode);
        }
    }, [fullAddress]);
    
    const addAmenity = () => {
        if (amenity.length < 3 || amenity.length > 100) return setAmenityError('Amenity must have 3-100 characters');
        
        let amenityString = amenity;
        if (amenity.endsWith(',')) {
            amenityString = amenityString.slice(0, amenityString.length - 1);
        }
        
        amenityString = amenityString.split(' ').join('');
        
        const amenitiesCount = amenities.split(',').length;
        const newAmenitiesCount = amenityString.split(',').length;
        
        if (amenitiesCount + newAmenitiesCount > 10) return setAmenityError('You may only add 10 amenities.');
        
        const amenityArr = amenityString.split(',');
        for (let i = 0; i < amenityArr.length; i++) {
            if (amenityArr[i].length > 20) return setAmenityError('Each amenity may only be 20 characters.');
            if (amenities.includes(amenityArr[i])) return setAmenityError('Amenities must be unique.');
        };
        
        for (let i = 0; i < amenityArr.length; i++) {
            for (let j = i + 1; j < amenityArr.length; j++) {
                if (amenityArr[i] === amenityArr[j]) return setAmenityError('Amenities must be unique.');
            } 
        }
        
        if (amenities.length === 0) {
            setAmenities(amenityString);
            setAmenityError(null);
            return setAmenity('');
        }
        setAmenities(amenities + ',' + amenityString);
        setAmenityError(null);
        return setAmenity('');
    }
    
    const removeAmenity = () => {
        if (amenity.includes(',')) return setAmenityError('You may not remove multiple amenities.');
        
        let index = -1;
        let hasComma = true;
        index = amenities.indexOf(amenity + ',');
        
        if (index === -1) {
            hasComma = false; 
            index = amenities.indexOf(amenity);
        }
        if (index === -1) return setAmenityError('Amenity does not exist.');
        
        setAmenityError(null);
        let length = amenity.length;
        if (hasComma) length += 1;
        
        const newAmenities = amenities.slice(0, index) + amenities.slice(index + length, amenities.length);
        setAmenities(newAmenities);
    }
    
    return (
        <div id="create-spot-wrapper">
            <div id='create-spot-nav'>
                <img className="logoImg" src={Logo} alt="logo"
                  onClick={() => history.push('/')}
                />
                <div id='create-spot-nav-div'>
                    <p style={{fontSize: "14.5px"}}>Ready to SpotSpace it?</p>
                    <button className='main-button-style create-spot-setup-button'
                        
                    >SpotSpace Setup</button>
                </div>
            </div>
            
            <div id='create-spot-earnings-div'>
                <CreateSpotNightSlider />
            </div>
            
            <div id='create-spot-gmaps-div'>
                <div id='create-spot-type-div'>
                    <i className="fa-solid fa-magnifying-glass create-spot-magnifying-glass"/>
                    <div>
                        <p className='create-spot-type-p1'>Location</p>
                        <p className='create-spot-type-p'>Type * Guests</p>
                    </div>
                </div>
                <GoogleMapComponent heightt='400px' widtht='100%' marginTop='20px'/>
            </div>
            
            <p 
            style={{
                marginTop: '60px',
                marginLeft: "30px",
                fontSize: "28px"
            }}
            >SpotSpace it easily with SpotSpace Setup</p>
            <img src='https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?'/>
            
            
            
        </div>
    );
};

export default CreateSpotModal;
