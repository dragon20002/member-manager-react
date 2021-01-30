import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderMenu from './components/HeaderMenu';
import HeaderTop from './components/HeaderTop';
import LoadingBar from './components/LoadingBar';
import { loginSuccess, logout } from './reducers/Auth/Auth';
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
  const menus = [
    {
      id: 0,
      path: '/home',
      name: '메인',
    },
    {
      id: 1,
      path: '/show-members',
      name: '회원관리',
    },
    {
      id: 1,
      path: '/about',
      name: 'About',
    },
  ];

  function invalidateAuth() {
    sessionStorage.setItem('login-type', null);
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('imageUrl', null);
    sessionStorage.setItem('name', null);
    Client().defaults.headers.loginType = null;
    Client().defaults.headers.token = null;
    dispatch(logout());
  }

  function checkAuth() {
    // this.setState({ isLoading: true });
    Client()
      .get('/api/login/has-auth')
      .then((response) => {
        console.log('[App]', '/api/login/has-auth', response);
        const { hasAuth, loginType, token, imageUrl, name } = response.data;

        if (hasAuth) {
          dispatch(
            loginSuccess({
              hasAuth,
              loginType,
              imageUrl,
              name,
              token,
            }),
          );
        } else {
          invalidateAuth();
        }
        // })
        // .finally(() => {
        // this.setState({ isLoading: false });
      });
  }

  useEffect(() => {
    const loginType = sessionStorage.getItem('login-type');
    const token = sessionStorage.getItem('token');
    Client().defaults.headers.loginType = loginType;
    Client().defaults.headers.token = token;
    checkAuth();
  }, []);

  return (
    <div id="app" className="App">
      <div className="header">
        <Router>
          <HeaderTop
            hasAuth={auth}
            imageUrl={user.imageUrl}
            name={user.name}
            doLogout={invalidateAuth}
          />
          <HeaderMenu menus={menus} />
          <Suspense fallback="">
            <Switch>
              <Route path="/home" component={Home} />
              <Route
                path="/show-members"
                render={() => <ShowMembers invalidateAuth={invalidateAuth} />}
              />
              <Route path="/about" component={About} />
              <Route path="/create-member" component={CreateMember} />
              <Route
                path="/login"
                render={() => <LoginContainer invalidateAuth={invalidateAuth} />}
              />
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
      {isLoading && <LoadingBar />}
    </div>
  );
};

export default App;
