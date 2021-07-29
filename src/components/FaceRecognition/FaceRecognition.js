import React from 'react';
import "./FaceRecognition.css"


const FaceRecognition= ({imgUrl,box}) => {
    return(
        <div >
       
        
        <div className=" ma">
        <div className="absolute pa4">
        
        <img  id='inputimage' alt="" src={imgUrl} width='500px' heigh='auto' />
         <div className='bounding-box' 
         style={{
         top: box.topRow, 
         right: box.rightCol, 
         bottom: box.bottomRow, 
         left: box.leftCol}}>

         </div> 
        </div>
        </div>
        </div>
    )
    
}

export default FaceRecognition;