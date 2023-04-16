import React from 'react';
import { host } from '../utils/utils';
import Spinner from '../Spinner/Spinner';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: '',
			isRegistrationFailed: false,
			isFetching: false,
			isFetchFailed: false
		};
	}

	onSubmitRegister = () => {
		this.setState({ isFetching: true });
		fetch(`${host}/register`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				this.setState({ isFetching: false });
				if (user.id) {
					this.setState({ isRegistrationFailed: false, isFetchFailed: false });
					this.props.loadUser(user);
					this.props.onRouteChange('main');
				} else {
					this.setState({ isRegistrationFailed: true });
				}
			})
			.catch(err => {
				this.setState({ isFetching: false });
				if (err.message.startsWith('Failed')) {
					this.setState({ isFetchFailed: true });
				}
			});
	}

	onNameChange = (event) => {
		this.setState({ registerName: event.target.value });
	}

	onEmailChange = (event) => {
		this.setState({ registerEmail: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ registerPassword: event.target.value });
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="username">Name</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									required
									minLength="3"
									id="name"
									onChange={this.onNameChange}
								/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									required
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="new-password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									required
									minLength="8"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit" value="Register"
								onClick={this.onSubmitRegister}
							/>
							{this.state.isFetching && <Spinner />}
							{this.state.isRegistrationFailed &&
								<p className="db mv4 fw6 lh-copy f6 bg-yellow">Registration failed! <span role='img' aria-label='no-entry'>⛔</span></p>}
							{this.state.isFetchFailed &&
								<p className="db mv4 fw6 lh-copy f6 bg-red">API disconnected! <span role='img' aria-label='broken-heart'>💔</span></p>}
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Register;
