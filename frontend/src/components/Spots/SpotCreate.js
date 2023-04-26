import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from '../../store/spots';
import GoogleMapComponent from '../GoogleMaps';

import './Spots.css';

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const redirect = useSelector(spotActions.getSpotRedirect);
    
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [errors, setErrors] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    
    const lat = '0.00';
    const lng = '0.00';
    
    const [latt, setLatt] = useState(0.0);
    const [lngt, setLngt] = useState(0.0);
    
    const validateForm = () => {
        const err = {};
        
        if (!country) err.country = "Country is required";
        if (country.length < 5 || country.length > 20) err.country = "Country length must be 5-20 characters";
        if (!address) err.address = "Address is required";
        if (address.length < 5 || address.length > 20) err.address = "Address length must be 5-20 characters";
        if (!city) err.city = "City is required"
        if (city.length < 5 || city.length > 15) err.city = "City length must be 5-15 characters";
        if (!state) err.state = "State is required";
        if (state.length < 5 || state.length > 15) err.state = "State length must be 5-15 characters";
        if (description.length < 30) err.desc = "Description needs a minimum of 30 characters";
        if (description.length > 250) err.desc = "Description needs a maximum of 250 characters";
        if (!name) err.name = "Name is required";
        if (name.length < 5 || name.length > 20) err.name = "Title length must be 5-20 characters";
        if (!price) err.price = "Price is required";
        if (price === 0) err.price = "Price cannot be zero" 
        if (!image1) err.image1 = "Preview image is required";
        if (image1 && !image1.endsWith('.png') && !image1.endsWith('.jpg') && !image1.endsWith('.jpeg')) {
            err.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if (image2 && !image2.endsWith('.png') && !image2.endsWith('.jpg') && !image2.endsWith('.jpeg')) {
            err.image2 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if (image3 && !image3.endsWith('.png') && !image3.endsWith('.jpg') && !image3.endsWith('.jpeg')) {
            err.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if (image4 && !image4.endsWith('.png') && !image4.endsWith('.jpg') && !image4.endsWith('.jpeg')) {
            err.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        if (image5 && !image5.endsWith('.png') && !image5.endsWith('.jpg') && !image5.endsWith('.jpeg')) {
            err.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        }
        
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
        
        const imageData = [];
        imageData.push({url: image1, preview: true});
        if (image2) imageData.push({url: image2, preview: false});
        if (image3) imageData.push({url: image3, preview: false});
        if (image4) imageData.push({url: image4, preview: false});
        if (image5) imageData.push({url: image5, preview: false});
        
        return dispatch(spotActions.createSpot(spotData, imageData))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    };
    
    const createDemoSpot = (e) => {
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
        
        return dispatch(spotActions.createSpot(spotData, imageData))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }
    
    if (redirect) {
        return history.push(`/spots/${redirect}`);
    }
    
    return (
        <div className="create-spot-wrapper">
            <h2>Create a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p id="where-p">Guests will only get your exact address once they booked a reservation.</p>
            
            <button className="create-spot-button" onClick={createDemoSpot}>Demo Create</button>
            
            <div>
                <ul>
                    {errors?.map(e => <li className="error-msg" key={e}>{e}</li>)}
                </ul>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div id="create-spot-top">
                    <div className="create-spot-input-div">
                        <label>Country <span className="error-msg">{formErrors.country ? formErrors.country : ''}</span></label>
                        <input className="create-spot-input" type="text" placeholder='Country' value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></input>
                    </div>
                    
                    <div className="create-spot-input-div">
                        <label>Street Address <span className="error-msg">{formErrors.address ? formErrors.address : ''}</span></label>
                        <input className="create-spot-input" type="text" placeholder='Address' value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    
                    <div id="city-state-div">
                        <div id="create-spot-input-city-div">
                            <label>City <span className="error-msg">{formErrors.city ? formErrors.city : ''}</span></label>
                            <input className="create-spot-input" type="text" placeholder='City' value={city}
                                onChange={(e) => setCity(e.target.value)}
                            ></input>
                        </div>
                        <div id="create-spot-input-state-div">
                            <label>State <span className="error-msg">{formErrors.state ? formErrors.state : ''}</span></label>
                            <input className="create-spot-input" type="text" placeholder='State' value={state}
                                onChange={(e) => setState(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3>Describe your place to guests</h3>
                    <p className="desc-p">Mention the best features of your space, any special amentities
                        like fast wifi or parking, and what you love about the neighborhood.
                    </p>
                    
                    <div id="desc-div">
                        <textarea id="desc-textarea" name="description" value={description}
                            placeholder='Please write at least 30 characters'
                            onChange={(e) => setDescription(e.target.value)}
                        > 
                        </textarea>
                        <span className="error-msg">{formErrors.desc ? formErrors.desc : ''}</span>
                    </div>
                </div>
                
                <div id="title-div">
                    <h3>Create a title for your spot</h3>
                    <p className="desc-p">Catch guests' attention with a spot title that highlights what
                        makes your place special.
                    </p>
                    
                    <div>
                        <input className="create-spot-input create-spot-input2" type='text' value={name}
                            placeholder='Name of your spot'
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                        <span className="error-msg">{formErrors.name ? formErrors.name : ''}</span>
                    </div>
                </div>
                
                <div id="price-div">
                    <span>$ </span><input id="price-input" type="text" value={price}
                        className="create-spot-input"
                        placeholder='Price per night (USD)'
                        onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    <span className="error-msg">{formErrors.price ? formErrors.price : ''}</span>
                </div>
                
                <div id="images-div">
                    <input className="create-spot-input imageUrl-input" type="text" placeholder='Preview Image URL' value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                    ></input>
                    <span className="error-msg">{formErrors.image1 ? formErrors.image1 : ''}</span>
                    
                    <input className="create-spot-input imageUrl-input" type="text" placeholder='Image URL' value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                    ></input>
                    <span className="error-msg">{formErrors.image2 ? formErrors.image2 : ''}</span>
                    
                    <input className="create-spot-input imageUrl-input" type="text" placeholder='Image URL' value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                    ></input>
                    <span className="error-msg">{formErrors.image3 ? formErrors.image3 : ''}</span>
                    
                    <input className="create-spot-input imageUrl-input" type="text" placeholder='Image URL' value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                    ></input>
                    <span className="error-msg">{formErrors.image4 ? formErrors.image4 : ''}</span>
                    
                    <input className="create-spot-input imageUrl-input" type="text" placeholder='Image URL' value={image5}
                        onChange={(e) => setImage5(e.target.value)}
                    ></input>
                    <span className="error-msg">{formErrors.image5 ? formErrors.image5 : ''}</span>
                    
                </div>
                
                <div id="create-spot-button-div">
                    <button className="create-spot-button" type="submit">Create</button>
                    <button className="create-spot-button" type="button" onClick={() => history.goBack()}>Back</button>
                </div>
                
                
                <GoogleMapComponent latt={latt} lngt={lngt} height={400} width={400}/>
                
            </form>
        </div>
    );
};

export default CreateSpot;
