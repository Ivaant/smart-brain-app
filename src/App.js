import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import UserInfo from './components/UserInfo/UserInfo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Logo from './components/logo/Logo';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700
      }
    },
    interactivity: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
}

const  initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user : data});
    //console.log('loadUser', this.state.user);
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }


  onDetectClick = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://hidden-savannah-86077.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://hidden-savannah-86077.herokuapp.com/image', {
    			method: 'put',
    			headers: {'Content-Type': 'application/json'},
    			body: JSON.stringify({
    				id: this.state.user.id,
            imageUrl: this.state.imageUrl
    			})
    		})
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));})
        .catch(console.log);
      }
      //console.log('response beforeCalcFaceLocation', response);
      this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onUrlChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
    });
      console.log('onRouteChange', this.state);
    } else if (route === 'main') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const {imageUrl, box, route, isSignedIn, user} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        {
          route === 'main'
          ? <div>
              <Logo />
              <UserInfo
                user = {user}
              />
              <ImageLinkForm
                detectClick={this.onDetectClick}
                detectUrlChange={this.onUrlChange}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          :(route === 'signin'
              ? <Signin
                  onRouteChange = {this.onRouteChange}
                  loadUser = {this.loadUser}
                />
              : <Register
                  onRouteChange = {this.onRouteChange}
                  loadUser = {this.loadUser}
                />
            )
        }
         <Particles className='particles'
                params={particlesOptions} />
      </div>
    );
  }
}

export default App;
