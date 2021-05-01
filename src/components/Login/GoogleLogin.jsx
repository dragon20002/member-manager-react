import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingProgress from '../Common/LoadingProgress';
import Client from '../../utils/api/client';
import Logo from '../../assets/google_logo.png';
import './GoogleLogin.css';
import { loginSuccess, loginFailure } from '../../reducers/Auth/Auth';
import { useDispatch } from 'react-redux';

const GoogleLogin = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const redirectUri = `${window.location.origin}/login`;
	const scope = [
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
		'openid',
	].join(' ');
	const clientId = `${process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}`;
	const state = `${process.env.REACT_APP_GOOGLE_LOGIN_STATE}`;

	useEffect(() => {
		window.onkeyup = (e) => {
			handleKeyUp(e);
		};

		// Google query-string 검사
		const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
		if (stateRegex && stateRegex.length > 1 && stateRegex[1] === state) {
			const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
			if (codeRegex) {
				if (codeRegex.length > 1) {
					const params = {
						loginType: 'google',
						code: decodeURIComponent(codeRegex[1]),
						state: decodeURIComponent(stateRegex[1]),
						redirectUri,
					};

					setIsLoading(true);
					Client()
						.post('/api/login/oauth', params)
						.then((response) => {
							const { hasAuth, token, imageUrl, name } = response.data;

							if (hasAuth) {
								dispatch(
									loginSuccess({
										hasAuth,
										loginType: 'google',
										imageUrl,
										name,
										token,
									}),
								);
							} else {
								dispatch(
									loginFailure({
										authError: 'Google 인증 실패',
									}),
								);
							}
						})
						.catch((err) => console.log('[GoogleLogin]', err))
						.finally(() => setIsLoading(false));
				}
			}
		}
	}, []);

	function handleClick() {
		document.querySelector('#google-login-form').submit();
	}

	function handleKeyUp(e) {
		if (e.key === 'g') {
			handleClick();
		}
	}

	return (
		<div className="google-login-btn" onClick={handleClick}>
			<form id="google-login-form" method="GET" action="https://accounts.google.com/o/oauth2/v2/auth">
				<input type="hidden" name="redirect_uri" value={redirectUri} />
				<input type="hidden" name="response_type" value="code" />
				<input type="hidden" name="access_type" value="offline" />
				<input type="hidden" name="scope" value={scope} />
				<input type="hidden" name="client_id" value={clientId} />
				<input type="hidden" name="state" value={state} />
			</form>
			<img className="google-logo" src={Logo} alt="google" />
			<LoadingProgress open={isLoading} />
		</div>
	);
};

GoogleLogin.propTypes = {
	onSuccess: PropTypes.func,
	onFailure: PropTypes.func,
};

export default GoogleLogin;
