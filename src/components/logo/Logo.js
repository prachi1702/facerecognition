import React from 'react';
import  "./Logo.css"
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png";


const Logo = () => {
    return(
        <div className='ma4 mt0 ' >
        <Tilt className="br2 shadow-2 tilt"  style={{ height: 150, width: 150}} tiltMaxAngleX={35}
            tiltMaxAngleY={35}
            perspective={900}
            scale={1.1}
            transitionSpeed={2000}
            gyroscope={true}>
            <div className="pa3" style={{paddingTop: "25px"}}>
                <img alt="brain" src={brain}/>
            </div>
        </Tilt>

        </div>
    )
    
}

export default Logo;