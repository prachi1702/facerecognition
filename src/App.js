import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: 'ad4a2e66ffc04915a07964c644cc018b'
 });

 


const particlesOptions = {
  "particles": {
      "number": {
          "value": 150
      },
      "size": {
          "value": 2
      },
      
  },
  "animation": {
    "count": 0,
    "enable": true,
    "speed": 3,
    "sync": false,
    "destroy": "none",
    "minimumValue": 1,
    "startValue": "random"
    
        },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  },
  "move": {
    "enable": true,
    "speed": 20,
    "random": true,
    "direction": "none",
    "bounce": true,
    "out_mode": "bounce",
    "attract": {
      "enable": true,
      "rotateX": 10,
      "rotateY": 10
    }
  }
}

const intialstate={
  
    input : '',
    imgUrl: '',
    box: {},
    
    emotion:new Map(),
    route: 'signin',
    isSignedIn: false,
    user:{
          id:'',
          name: '',
          email: '',
          entries: 0,
          joined: '',
          
    }

  }


class App extends Component {
  constructor(){
    super();
    this.state=intialstate ;}

  //  componentDidMount(){
  //    fetch('http://localhost:3001/')
  //    .then(response=>response.json())
  //    .then(console.log)
  //  }


  loadUser = (data) =>{
    this.setState({user:{
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,

    }})
  }

  calculateFaceLocation =(data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width =Number(image.width);
    const height = Number(image.height)
    console.log(width,height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }
  displayemotion=(em)=>{
    
    var myMap = new Map()
    var concept;
    for (concept of em.outputs[0].data.concepts){
           myMap.set(concept.name,concept.value)
      }
      const obj = Object.fromEntries(myMap);
            
          
    console.log(obj)
    this.setState({emotion: obj});
    
  }

   displayFaceBox = (box) =>{
     this.setState({ box: box})
     console.log(box)
   }

  onInputChange = (event) =>{
    this.setState({input : event.target.value})
    
  }
  facelocation(){
    this.setState({imgUrl: this.state.input})
    // console.log('click')
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response => {
      // console.log('hi', response)
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch (error =>{console.error(error)})

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => {console.log(err)
    });

  }
  emotion=()=>{
    this.setState({imgUrl: this.state.input})
    // console.log('click')
    app.models
    .predict("31025e019a18970a1acc55ba6a184dc6",this.state.input)
    .then(response => {
      console.log('hi', response)
     
      this.displayemotion(response)
    })
    .catch(err => {console.log(err)
    alert("Wrong input!!")});

  }
  
  onButtonSubmit =() =>{
    this.facelocation();
    this.emotion();
    
    }

  
  
  onRouteChange = (route)=>{
    if(route === 'signout'){
      this.setState(intialstate)
    }
    else if( route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route : route});
  }

   


  render (){
        const {box ,imgUrl ,isSignedIn ,route ,emotion } = this.state;
        return (
        <div className="App content">
        
          <Particles className="particles"
              params={particlesOptions} />
          
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' ?
          <div>
                <Logo /> 
                <Rank name={this.state.user.name}  entries={this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange} 
                  onButtonSubmit ={this.onButtonSubmit}
                  emotion={emotion}
                /> 
              
                
                <div className="home"> 
                <ul className="ulist">
                
                {Object.entries(emotion).map(([key,value],i) => 
                  
                <li key={i} value={key} >{key} - {value=((value.toFixed(5))*100).toFixed(2)+"%"}</li>) }
                </ul>
                
                <FaceRecognition imgUrl={imgUrl} box={box}/>
                </div>
            </div> 
            : (
              route=== 'signin' 
              ?<Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
          
          
          }
        </div>
      );
}
}

export default App;
