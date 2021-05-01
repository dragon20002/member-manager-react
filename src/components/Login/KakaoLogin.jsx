import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingProgress from '../Common/LoadingProgress';
import Client from '../../utils/api/client';
import Logo from '../../assets/kakao_logo.png';
import './KakaoLogin.css';
import { loginSuccess, loginFailure } from '../../reducers/Auth/Auth';
import { useDispatch } from 'react-redux';

const KakaoLogin = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const redirectUri = `${window.location.origin}/login`;
	const clientId = `${process.env.REACT_APP_KAKAO_LOGIN_CLIENT_ID}`;
	const state = `${process.env.REACT_APP_KAKAO_LOGIN_STATE}`;

	useEffect(() => {
		window.onkeyup = (e) => {
			handleKeyUp(e);
		};

		// Kakao query-string 검사
		const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
		if (stateRegex && stateRegex.length > 1 && stateRegex[1] === state) {
			const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
			if (codeRegex) {
				if (codeRegex.length > 1) {
					const params = {
						loginType: 'kakao',
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
										loginType: 'kakao',
										imageUrl,
										name,
										token,
									}),
								);
							} else {
								dispatch(
									loginFailure({
										authError: 'Kakao 인증 실패',
									}),
								);
							}
						})
						.catch((err) => console.log('[KakaoLogin]', err))
						.finally(() => setIsLoading(false));
				}
			}
		}
	}, []);

	function handleClick() {
		document.querySelector('#kakao-login-form').submit();
	}

	function handleKeyUp(e) {
		if (e.key === 'k') {
			handleClick();
		}
	}

	return (
		<div className="kakao-login-btn" onClick={handleClick}>
			<form id="kakao-login-form" method="GET" action="https://kauth.kakao.com/oauth/authorize">
				<input type="hidden" name="client_id" value={clientId} />
				<input type="hidden" name="redirect_uri" value={redirectUri} />
				<input type="hidden" name="response_type" value="code" />
				<input type="hidden" name="state" value={state} />
			</form>
			<img className="kakao-logo" src={Logo} alt="kakao" />
			<LoadingProgress open={isLoading} />
		</div>
	);
};

KakaoLogin.propTypes = {
	onSuccess: PropTypes.func,
	onFailure: PropTypes.func,
};

export default KakaoLogin;
