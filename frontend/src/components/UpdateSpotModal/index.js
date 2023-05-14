import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import { useModal } from "../../context/Modal";
import './UpdateSpot.css';


const UpdateSpotModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotState = useSelector(spotActions.getUserSpotsState);
    const spotStateSingle = useSelector(spotActions.getSingleSpotState);
    const { closeModal, modalSpot } = useModal();
    
    let spot;
    if (spotState) {
        for (let i in spotState) {
            if (spotState[i].id === modalSpot) {
                spot = spotState[i];
            };
        };
    };
    
    
    if (!spot) spot = spotStateSingle;
    
    const [country, setCountry] = useState(spot?.country || '');
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [state, setState] = useState(spot?.state || '');
    const [zipcode, setZipcode] = useState(spot?.zipcode || '')
    const [description, setDescription] = useState(spot?.description || '');
    const [name, setName] = useState(spot?.name || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    
    const lat = '0.00';
    const lng = '0.00';
    
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
        
        return err;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validateErrors = validateForm();
        if (Object.values(validateErrors).length > 0) {
            setFormErrors(validateErrors);
            return;
        };
        
        setErrors([]);
        
        const spotData = {
            id: modalSpot,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat,
            lng
        };
        
        dispatch(spotActions.updateSpot(spotData, []))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
        
        closeModal();
        return history.push(`/spots/${modalSpot}`);
    };
    
    return (
        <div id="update-spot-wrapper">
            <h2>Update your Spot</h2>
            
            <div>
                <ul>
                    {errors?.map(e => <li className="error-msg" key={e}>{e}</li>)}
                </ul>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div id="update-spot-top">
                    <div className="update-spot-input-div">
                        <label>Street Address <span className="error-msg">{formErrors.address ? formErrors.address : ''}</span></label>
                        <input className="main-input-style update-spot-input" type="text" placeholder='Address' value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    
                    <div className="update-spot-input-div">
                        <label>Country <span className="error-msg">{formErrors.country ? formErrors.country : ''}</span></label>
                        <input className="main-input-style update-spot-input" type="text" placeholder='Country' value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></input>
                    </div>
                    
                    <div className="update-spot-input-div"> 
                        <div id="create-spot-input-state-div">
                            <label>State <span className="error-msg">{formErrors.state ? formErrors.state : ''}</span></label><br></br>
                            <input className="main-input-style update-spot-input" type="text" placeholder='State' value={state}
                                onChange={(e) => setState(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    
                    <div className="update-spot-input-div">
                        <div id="create-spot-input-city-div">
                            <label>City <span className="error-msg">{formErrors.city ? formErrors.city : ''}</span></label><br></br>
                            <input className="main-input-style update-spot-input" type="text" placeholder='City' value={city}
                                onChange={(e) => setCity(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    
                    <div className="update-spot-input-div">
                        <label>Zipcode <span className="main-error-li">{formErrors.zipcode ? formErrors.zipcode : ''}</span></label>
                        <input className="main-input-style update-spot-input" type="text" 
                            placeholder='Zipcode' 
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                        ></input>
                    </div>
                    
                    
                </div>
                
                <div>
                    <h3>Description</h3>
                    
                    <span className="main-error-li">{formErrors.desc ? formErrors.desc : ''}</span>
                    <div id="update-desc-div">
                        <textarea id="update-desc-textarea" name="description" value={description}
                            placeholder='Please write at least 30 characters'
                            onChange={(e) => setDescription(e.target.value)}
                        > 
                        </textarea>
                    </div>
                </div>
                
                <div id="update-title-div">
                    <h3>Title</h3>
                    
                    <div>
                        <span className="main-error-li">{formErrors.name ? formErrors.name : ''}</span>
                        <input className="main-input-style update-spot-input" type='text' value={name}
                            placeholder='Name of your spot'
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                </div>
                
                <div id="price-div">
                    <h3 id="price-h3">Price per night</h3>
                    <span className="main-error-li">{formErrors.price ? formErrors.price : ''}</span>
                    <span>$ </span><input className="main-input-style update-spot-input" id="price-input" type="text" value={price ? price : 0}
                        placeholder='price'
                        onChange={(e) => setPrice(e.target.value)}
                    ></input>
                </div>
                
                <div id="update-spot-button-div">
                    <button className="main-button-style update-spot-button" type="submit">Update</button>
                    <button type="button" className="main-button-style update-spot-button" onClick={closeModal}>Cancel</button>
                </div>
                
            </form>
        </div>
    );
};

export default UpdateSpotModal;
