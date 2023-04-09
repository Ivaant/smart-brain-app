import React from 'react';

const host = [process.env.REACT_APP_HOSTNAME, process.env.REACT_APP_PORT].filter(a => a).join(':');

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			isSigninFailed: false,
			isFetchFailed: false

		}
	}

	onSubmitSignIn = () => {
		fetch(`${host}/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.setState({ isSigninFailed: false, isFetchFailed: false });
					this.props.loadUser(user);
					this.props.onRouteChange('main');
				}
				else {
					this.setState({ isSigninFailed: true });
				}
			})
			.catch(err => {
				if (err.message === "Failed to fetch") {
					this.setState({ isFetchFailed: true });
				}
				// console.table({ err });
			});
	}

	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	}

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="current-password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit" value="Sign in"
								onClick={this.onSubmitSignIn}
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								onClick={() => this.props.onRouteChange('register')}
								className="f6 link dim black db pointer"
							>
								Register
							</p>
							{this.state.isSigninFailed &&
								<p className="db fw6 lh-copy f6 bg-yellow">Wrong credentials! <span role='img' aria-label='face-palm'>🤦‍♂️</span></p>}
							{this.state.isFetchFailed &&
								<p className="db fw6 lh-copy f6 bg-red">API disconnected! <span role='img' aria-label='broken-heart'>💔</span></p>}
						</div>
					</div>
				</main>
			</article>
		);
	}
}

export default Signin;
