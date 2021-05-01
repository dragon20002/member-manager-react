import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingProgress from '../Common/LoadingProgress';
import Client from '../../utils/api/client';
import Logo from '../../assets/github_logo.png';
import './GithubLogin.css';
import { loginSuccess, loginFailure } from '../../reducers/Auth/Auth';
import { useDispatch } from 'react-redux';

const GithubLogin = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const redirectUri = `${window.location.origin}/login`;
	const clientId = `${process.env.REACT_APP_GITHUB_LOGIN_CLIENT_ID}`;
	const state = `${process.env.REACT_APP_GITHUB_LOGIN_STATE}`;

	useEffect(() => {
		window.onkeyup = (e) => {
			handleKeyUp(e);
		};

		// Github query-string 검사
		const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
		if (stateRegex && stateRegex.length > 1 && stateRegex[1] === state) {
			const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
			if (codeRegex) {
				if (codeRegex.length > 1) {
					const params = {
						loginType: 'github',
						code: decodeURIComponent(codeRegex[1]),
						state: decodeURIComponent(stateRegex[1]),
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
										loginType: 'github',
										imageUrl,
										name,
										token,
									}),
								);
							} else {
								dispatch(
									loginFailure({
										authError: 'Github 인증 실패',
									}),
								);
							}
						})
						.catch((err) => console.log('[GithubLogin]', err))
						.finally(() => setIsLoading(false));
				}
			}
		}
	}, []);

	function handleClick() {
		document.querySelector('#github-login-form').submit();
	}

	function handleKeyUp(e) {
		if (e.key === 'h') {
			handleClick();
		}
	}

	return (
		<div className="github-login-btn" onClick={handleClick}>
			<form id="github-login-form" method="GET" action="https://github.com/login/oauth/authorize">
				<input type="hidden" name="client_id" value={clientId} />
				<input type="hidden" name="redirect_uri" value={redirectUri} />
				<input type="hidden" name="state" value={state} />
			</form>
			<img className="github-logo" src={Logo} alt="github" />
			<LoadingProgress open={isLoading} />
		</div>
	);
};

GithubLogin.propTypes = {
	onSuccess: PropTypes.func,
	onFailure: PropTypes.func,
};

export default GithubLogin;
