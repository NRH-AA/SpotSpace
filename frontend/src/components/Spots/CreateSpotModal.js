import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import * as spotActions from '../../store/spots';
import GoogleMapComponent from '../GoogleMaps';
import { csrfFetch } from '../../store/csrf';
// import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Geocode from "react-geocode";
import './CreateSpotModal.css';


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
Geocode.setLanguage("en");
Geocode.setRegion("us");

if (process.env.NODE_ENV !== 'production') {
    Geocode.enableDebug();
}

const CreateSpotModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    
    const [country, setCountry] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
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
            zipcode
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
        
        closeModal();
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
            lng
        };
        
        const imageData = [];
        imageData.push({url: 'https://static.planetminecraft.com/files/resource_media/screenshot/1408/family_guy_griffin_house.jpg', preview: true})
        
        await dispatch(spotActions.createSpot(spotData, imageData))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) return setErrors(data.errors);
        });
        
        closeModal();
        return history.push(`/spots/current`);
    }
    
    
    const updateImageFile = (e, i) => {
        const file = e.target.files[0];
        handleImageUpload(file, i);
    }
    
    const handleImageUpload = async (file, index) => {
        const formData = new FormData();
        formData.append("image", file);
        
        const imageData = await handleFetch(formData)
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
    }, [fullAddress])
    
    return (
        <div className="create-spot-wrapper">
            <div id='create-spot-inner-div'>
            <h2><u>Create a new Spot</u></h2>
            <h3>Where's your place located?</h3>
            <p id="where-p">Guests will only get your exact address once they booked a reservation.</p>
            
            <button className="main-button-style create-spot-button" onClick={createDemoSpot}>Demo Create</button>
            
            <div>
                <ul>
                    {errors?.map(e => <li className="main-error-li" key={e}>{e}</li>)}
                </ul>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div id="create-spot-top">
                    <div className="create-spot-input-div">
                        <label>Street Address <span className="main-error-li">{formErrors.address ? formErrors.address : ''}</span></label>
                        <input className="main-input-style create-spot-input" type="text" placeholder='Address' value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                        <button className='main-button-style'
                            type='button'
                            style={{width: "120px", marginTop: "5px"}}
                            onClick={() => getUserAddress()}
                        >Locate Me</button>
                    </div>
                    
                    {(locateMe && latt && lngt) &&
                        <GoogleMapComponent latt={latt} lngt={lngt} heightt={300} widtht={'100%'}/>
                    }
                    
                    <div className="create-spot-input-div">
                        <label>Country <span className="main-error-li">{formErrors.country ? formErrors.country : ''}</span></label>
                        {/* <CountryDropdown className="main-input-style create-spot-input"
                            value={country}
                            onChange={(e) => setCountry(e)} 
                        /> */}
                        <input className="main-input-style create-spot-input" type="text" 
                            placeholder='Country' 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></input>
                    </div>
                        
                    <div className="create-spot-input-div">
                        <label>Region <span className="main-error-li">{formErrors.state ? formErrors.state : ''}</span></label>
                        {/* <RegionDropdown className="main-input-style create-spot-input"
                            country={country}
                            value={state}
                            onChange={(e) => setState(e)} 
                        /> */}
                        <input className="main-input-style create-spot-input" type="text" 
                            placeholder='Region/State' 
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        ></input>
                    </div>
                    
                    <div className="create-spot-input-div">
                        <label>City <span className="main-error-li">{formErrors.city ? formErrors.city : ''}</span></label>
                        <input className="main-input-style create-spot-input" type="text" 
                            placeholder='City' 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></input>
                    </div>
                    
                    <div className="create-spot-input-div">
                        <label>Zipcode <span className="main-error-li">{formErrors.zipcode ? formErrors.zipcode : ''}</span></label>
                        <input className="main-input-style create-spot-input" type="text" 
                            placeholder='Zipcode' 
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                        ></input>
                    </div>

                </div>
                
                <div id='create-spot-description-div'>
                    <h3>Describe your place to guests</h3>
                    <p className="desc-p">Mention the best features of your space, any special amentities
                        like fast wifi or parking, and what you love about the neighborhood.
                    </p>
                    <p>
                        Markdown Language Supported!
                    </p>
                    
                    <div id="desc-div">
                        <span className="main-error-li">{formErrors.desc ? formErrors.desc : ''}</span>
                        <textarea id="desc-textarea" 
                            name="description" 
                            value={description}
                            placeholder='Please write at least 30 characters'
                            onChange={(e) => setDescription(e.target.value)}
                        > 
                        </textarea>
                    </div>
                </div>
                
                <div id="title-div">
                    <h3>Create a title for your spot</h3>
                    <p className="desc-p">Catch guests' attention with a spot title that highlights what
                        makes your place special.
                    </p>
                    
                    <div>
                        <span className="main-error-li">{formErrors.name ? formErrors.name : ''}</span><br></br>
                        <input className="main-input-style create-spot-input create-spot-input2" type='text' value={name}
                            placeholder='Name of your spot'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                
                <div id="price-div">
                    {formErrors.price && <><span className="main-error-li">{formErrors.price}</span><br></br></>}
                    <span>$ </span>
                    <input id="price-input" type="number" value={price}
                        className="main-input-style create-spot-input"
                        placeholder='Price per night (USD)'
                        min={10}
                        max={1000}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                
                
                <h3>Show off your space with some images</h3>
                {formErrors.image1 && <><span className='main-error-li'>* Preview image required.</span><br></br></>}
                <div id="images-div">
                    {image1.url ? <div className='images-inner-div'>
                        <img className="create-post-image"
                            src={image1.url} 
                            alt="PostImage1"
                        />
                            
                        <button className="create-post-remove-image-button"
                            onClick={() => removePicture(1)}
                        >X</button>
                        </div>
                    :
                    <div className='images-inner-div'>
                        <input
                            className="create-post-image-input"
                            name='image'
                            type="file"
                            accept="image/*"
                            onChange={(e) => updateImageFile(e, 1)}
                        />
                    </div>
                    }
                    
                    {showImage2 && <>
                        {image2.url ? <div className='images-inner-div'>
                            <img className="create-post-image"
                                src={image2.url} 
                                alt="PostImage1"
                            />
                                
                            <button className="create-post-remove-image-button"
                                onClick={() => removePicture(2)}
                            >X</button>
                            </div>
                        :
                        <div className='images-inner-div'>
                            <input
                                className="create-post-image-input"
                                name='image'
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateImageFile(e, 2)}
                            />
                        </div>
                        }
                    </>}
                    
                    {showImage3 && <>
                        {image3.url ? <div className='images-inner-div'>
                            <img className="create-post-image"
                                src={image3.url} 
                                alt="PostImage1"
                            />
                                
                            <button className="create-post-remove-image-button"
                                onClick={() => removePicture(3)}
                            >X</button>
                            </div>
                        :
                        <div className='images-inner-div'>
                            <input
                                className="create-post-image-input"
                                name='image'
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateImageFile(e, 3)}
                            />
                        </div>
                        }
                    </>}
                    
                    {showImage4 && <>
                        {image4.url ? <div className='images-inner-div'>
                            <img className="create-post-image"
                                src={image4.url} 
                                alt="PostImage1"
                            />
                                
                            <button className="create-post-remove-image-button"
                                onClick={() => removePicture(4)}
                            >X</button>
                            </div>
                        :
                        <div className='images-inner-div'>
                            <input
                                className="create-post-image-input"
                                name='image'
                                type="file"
                                accept="image/*"
                                onChange={(e) => updateImageFile(e, 4)}
                            />
                        </div>
                        }
                    </>}
                    
                    
                    
                    
                    {!showImage4 && 
                    <div>
                        <button type='button'
                            style={{border: "none", background: "none"}}
                            onClick={(e) => handleShowImage()}
                        ><i className="fa-solid fa-plus create-spot-image-add"/></button>
                    </div>
                    }

                    
                </div>
                
                <div id="create-spot-button-div">
                    <button className="main-button-style create-spot-button" type="button" onClick={closeModal}>Cancel</button>
                    <button className="main-button-style create-spot-button" type="submit"
                        
                    >Create</button>
                </div>
                
            </form>
            </div>
        </div>
    );
};

export default CreateSpotModal;
