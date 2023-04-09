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

const host = [process.env.REACT_APP_HOSTNAME, process.env.REACT_APP_PORT].filter(a => a).join(':');
console.log({ host });

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

const initialState = {
	input: '',
	imageUrl: '',
	boxes: [],
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
		this.setState({ user: data });
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height * 1.085 - (clarifaiFace.bottom_row * height)
		}
	};

	getFaceLocations = (clarifaiData) => {
		return clarifaiData.map(this.calculateFaceLocation);
	};

	displayFaceBox = (boxes) => {
		this.setState({ boxes: boxes });
	}


	onDetectClick = () => {
		this.setState({ imageUrl: this.state.input });

		fetch(`${host}/imageurl`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input
			})
		})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch(`${host}/image`, {
						method: 'put',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id,
							imageUrl: this.state.imageUrl
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(console.log);
				}
				const clarifaiData = response.outputs[0].data.regions;
				if (clarifaiData && clarifaiData.length > 0) {
					this.displayFaceBox(this.getFaceLocations(clarifaiData));
				}
			})
			.catch(err => console.log(err));
	}

	onUrlChange = (event) => {
		this.setState({ input: event.target.value });
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({
				input: '',
				imageUrl: '',
				boxes: [],
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
		} else if (route === 'main') {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	}

	render() {
		const { imageUrl, boxes, route, isSignedIn, user } = this.state;
		return (
			<div className="App">
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{
					route === 'main'
						? <div>
							<Logo />
							<UserInfo
								user={user}
							/>
							<ImageLinkForm
								detectClick={this.onDetectClick}
								detectUrlChange={this.onUrlChange}
							/>
							<FaceRecognition boxes={boxes} imageUrl={imageUrl} />
						</div>
						: (route === 'signin'
							? <Signin
								onRouteChange={this.onRouteChange}
								loadUser={this.loadUser}
							/>
							: <Register
								onRouteChange={this.onRouteChange}
								loadUser={this.loadUser}
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
