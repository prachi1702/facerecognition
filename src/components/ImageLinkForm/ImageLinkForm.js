import React from 'react';
import "./ImageLinkForm.css"


const ImageLinkForm = ({onInputChange,onButtonSubmit,emotion}) => {
    return(
        <div className="fonts">
        <p className="f3 fonts">
            {'This Magic Brain will detect face and emotions along with emotion percentage in your pictures '}
        </p><br></br>
            <div className='form center'>
            
             <div className="form pa4 br3 shadow-3" >
                <input className="f4 pa2 w-60 " type="text" onChange={onInputChange}/>
                <button 
                className="grow f4 link ph3 pv2 dib white bg-light-purple"
                onClick={onButtonSubmit}>
                Detect
                </button>

                 
                                
              
              
                
             </div>
            </div>
        
        </div>
    )
    
}

export default ImageLinkForm;