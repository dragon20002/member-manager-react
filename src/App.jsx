import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HeaderTop from './components/HeaderTop';
import HeaderMenu from './components/HeaderMenu';
import Home from './views/Home';
import ShowMembers from './views/ShowMembers';
import About from './views/About';
import CreateMember from './views/CreateMember';
import Login from './views/Login';
import Client from './utils/api/client';
import LoadingBar from './components/LoadingBar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      axios: Client(),
      menus: [
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
          id: 2,
          path: '/about',
          name: 'About',
        },
      ],
      hasAuth: false,
      imageUrl: '',
      name: '',
      isLoading: false,
    };
    this.checkAuth = this.checkAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.invalidateAuth = this.invalidateAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { axios } = this.state;
    const loginType = sessionStorage.getItem('login-type');
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.loginType = loginType;
    axios.defaults.headers.token = token;
    this.checkAuth();
  }

  handleLogin(loginType, user) {
    const { axios } = this.state;
    sessionStorage.setItem('login-type', loginType);
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('imageUrl', user.imageUrl);
    sessionStorage.setItem('name', user.name);
    axios.defaults.headers.loginType = loginType;
    axios.defaults.headers.token = user.token;
    this.setState({
      hasAuth: true,
      imageUrl: user.imageUrl,
      name: user.name,
    });
  }

  handleLogout() {
    this.invalidateAuth();
  }

  invalidateAuth() {
    const { axios } = this.state;
    sessionStorage.setItem('login-type', null);
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('imageUrl', null);
    sessionStorage.setItem('name', null);
    axios.defaults.headers.loginType = null;
    axios.defaults.headers.token = null;
    this.setState({
      hasAuth: false,
      imageUrl: '',
      name: '',
    });
  }

  checkAuth() {
    this.setState({ isLoading: true });
    Client()
      .get('/api/login/has-auth')
      .then((response) => {
        console.log('[App]', '/api/login/has-auth', response);
        const { hasAuth, loginType, token, imageUrl, name } = response.data;

        if (hasAuth) {
          this.handleLogin(loginType, { token, imageUrl, name });
        } else {
          this.invalidateAuth();
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    console.log('[App]', 'render()');
    console.log('[App]', 'state = ', this.state);
    const { menus, hasAuth, imageUrl, name, isLoading } = this.state;

    return (
      <div id="app" className="App">
        <div className="header">
          <Router>
            <HeaderTop
              hasAuth={hasAuth}
              imageUrl={imageUrl}
              name={name}
              doLogout={this.handleLogout}
            />
            <HeaderMenu menus={menus} />
            <Suspense fallback="">
              <Switch>
                <Route path="/home" component={Home} />
                <Route
                  path="/show-members"
                  render={() => <ShowMembers invalidateAuth={this.invalidateAuth} />}
                />
                <Route path="/about" component={About} />
                <Route path="/create-member" component={CreateMember} />
                <Route
                  path="/login"
                  render={() => (
                    <Login
                      onLoginSuccessCallback={this.handleLogin}
                      invalidateAuth={this.invalidateAuth}
                    />
                  )}
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
  }
}

export default App;
