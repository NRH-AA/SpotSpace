import { useState } from 'react';
import Slider from 'react-input-slider';

const CreateSpotNightSlider = () => {
    const [nights, setNights] = useState(7);
    const defaultAmount = 240;
    
    return (<>
        <p style={{fontSize: "34px", marginBottom: "0px", color: "#00e200"}}>SpotSpace it.</p>
        <p style={{fontSize: "38px", marginTop: "5px", marginBottom: "0px"}}>You could earn</p>
        <p style={{fontSize: "65px", marginTop: "20px", marginBottom: "0px"}}>${defaultAmount * nights}</p>
        <p style={{paddingBottom: "25px", marginTop: "20px", fontWeight: "500"}}><b><u>{nights === 1 ? '1 night' : `${nights} nights`}</u></b> at an estimated {defaultAmount} a night</p>
        <Slider
            asix="x"
            x={nights}
            xmin={1}
            xmax={30}
            onChange={({x}) => setNights(x)}
                    
            styles={{
                track: {
                    backgroundColor: '#c5c5c5',
                    width: "99%",
                    height: "4px"
                },
                active: {
                    backgroundColor: '#242424'
                },
                thumb: {
                    width: 25,
                    height: 25,
                    backgroundColor: "black"
                },
                disabled: {
                    opacity: 0.5
                }
            }}
        />
        
        <p style={{
            marginTop: "30px",
            fontSize: "14px", 
            cursor: "not-allowed",
            color: "#797979"
            }}><u>Learn how we estimate your earnings</u></p>
    </>)
};

export default CreateSpotNightSlider;
