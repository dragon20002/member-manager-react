import { Link, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Login from '../components/Auth/Login';
import GithubLogin from '../components/Login/GithubLogin';
import GoogleLogin from '../components/Login/GoogleLogin';
import KakaoLogin from '../components/Login/KakaoLogin';
import Client from '../utils/api/client';
import './LoginContainer.css';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 'auto',
		padding: '2rem',
		width: '32rem',
		textAlign: 'left',
		border: '1px solid',
		borderColor: theme.palette.primary.main,
		borderRadius: '0.5rem',
	},
	oauth2Grp: {
		marginBottom: '1rem',
	},
	oauth2Item: {
		padding: '0.4rem',
		backgroundColor: 'white',
		border: '1px solid',
		borderColor: theme.palette.primary.main,
		borderRadius: '0.5rem',
		display: 'inline-block',
		verticalAlign: 'middle',
		margin: '0.1rem',
	},
	linkGrp: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'left',
	},
	menuItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuLink: { cursor: 'pointer' },
}));

const LoginContainer = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [errorMessage, setErrorMessage] = useState('');

	const { auth, authError, user } = useSelector(({ auth }) => ({
		authError: auth.authError,
		auth: auth.auth,
		user: auth.user,
	}));

	useEffect(() => {
		if (authError) {
			setErrorMessage('로그인 실패');
		} else if (auth) {
			sessionStorage.setItem('login-type', user.loginType);
			sessionStorage.setItem('token', user.token);
			sessionStorage.setItem('imageUrl', user.imageUrl);
			sessionStorage.setItem('name', user.name);
			Client().defaults.headers.loginType = user.loginType;
			Client().defaults.headers.token = user.token;
			history.push('/home');
		}
	}, [auth, authError, dispatch]);

	return (
		<div className={classes.root}>
			<Login />
			<div className={classes.oauth2Grp}>
				<span className={classes.oauth2Item}>
					<GoogleLogin />
				</span>
				<span className={classes.oauth2Item}>
					<GithubLogin />
				</span>
				<span className={classes.oauth2Item}>
					<KakaoLogin />
				</span>
			</div>

			<div className={classes.linkGrp}>
				<span className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="caption"
						onClick={() => history.push('/create-member')}
					>
						회원가입
					</Link>
				</span>
				｜
				<span className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="caption"
						onClick={() => history.push('/')}
					>
						아이디 찾기
					</Link>
				</span>
				｜
				<span className={classes.menuItem}>
					<Link
						className={classes.menuLink}
						component="span"
						variant="caption"
						onClick={() => history.push('/')}
					>
						비밀번호 찾기
					</Link>
				</span>
			</div>
			{errorMessage && <span className="text-danger">{errorMessage}</span>}
		</div>
	);
};

export default LoginContainer;
