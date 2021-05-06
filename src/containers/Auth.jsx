import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Client from '../utils/api/client';
import { logout } from './reducers/Auth/Auth';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';
import { matchRoutes } from 'react-router-config';

const AuthContainer = ({ children }) => {
	const dispatch = useDispatch();
	const { routes } = useContext(AppContext);
	const history = useHistory();
	const location = useLocation();
	const routeMatch = useRouteMatch();
	const { auth } = useSelector(({ auth }) => auth);

	console.log({ history, location, routeMatch });

	// TODO 권한??
	const branch = matchRoutes(routes, location.pathname);
	console.log('Auth: branch', branch);

	useEffect(() => {
		// 최초 권한 체크
		const loginType = sessionStorage.getItem('login-type');
		const token = sessionStorage.getItem('token');
		Client().defaults.headers.loginType = loginType;
		Client().defaults.headers.token = token;
		dispatch({ type: 'hasAuth' });
	}, [dispatch]);

	useEffect(() => {
		if (!auth) {
			// Invalidate Auth
			sessionStorage.setItem('login-type', null);
			sessionStorage.setItem('token', null);
			sessionStorage.setItem('imageUrl', null);
			sessionStorage.setItem('name', null);
			Client().defaults.headers.loginType = null;
			Client().defaults.headers.token = null;
			dispatch(logout());
		}
	}, [auth]);

	return auth && <>{children}</>;
};

AuthContainer.propTypes = {
	children: PropTypes.node,
};

export default AuthContainer;
