import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderMenu from './components/Header/HeaderMenu';
import HeaderTop from './components/Header/HeaderTop';
import LoadingProgress from './components/Common/LoadingProgress';
import { logout } from './reducers/Auth/Auth';
import Client from './utils/api/client';
import About from './views/About';
import CreateMember from './views/CreateMember';
import Home from './views/Home';
import LoginContainer from './views/LoginContainer';
import ShowMembers from './views/ShowMembers';

const App = () => {
	const dispatch = useDispatch();
	const { auth, user, isLoading } = useSelector(({ auth, loading }) => ({
		auth: auth.auth,
		user: auth.user,
		isLoading: loading.count > 0,
	}));
	
	function invalidateAuth() {
		sessionStorage.setItem('login-type', null);
		sessionStorage.setItem('token', null);
		sessionStorage.setItem('imageUrl', null);
		sessionStorage.setItem('name', null);
		Client().defaults.headers.loginType = null;
		Client().defaults.headers.token = null;
		dispatch(logout());
	}

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
			invalidateAuth();
		}
	}, [auth]);

	return (
		<div id="app" className="App">
			<div className="header">
				<Router>
					<HeaderTop hasAuth={auth} imageUrl={user.imageUrl} name={user.name} doLogout={invalidateAuth} />
					<HeaderMenu />
					<Suspense fallback="">
						<Switch>
							<Route path="/home" component={Home} />
							<Route
								path="/show-members"
								render={() => <ShowMembers invalidateAuth={invalidateAuth} />}
							/>
							<Route path="/about" component={About} />
							<Route path="/create-member" component={CreateMember} />
							<Route path="/login" render={() => <LoginContainer invalidateAuth={invalidateAuth} />} />
							{/*
              <Route path="/show-member" component={ShowMember} />
              <Route path="/error" component={Error} />
              */}
							<Route path="/">
								<Redirect to="/home" />
							</Route>
						</Switch>
					</Suspense>
				</Router>
			</div>
			<div className="footer">&copy;2020</div>
			{isLoading && <LoadingProgress />}
		</div>
	);
};

export default App;
