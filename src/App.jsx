import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import React, { Suspense } from 'react'
import HeaderTop from './components/HeaderTop';
import HeaderMenu from './components/HeaderMenu';
import Home from './views/Home';
const ShowMembers = React.lazy(() =>
  import(/* webpackChunkName: "showMembers" */ './views/ShowMembers')
);
const About = React.lazy(() =>
  import(/* webpackChunkName: "about" */ './views/About')
);
const CreateMember = React.lazy(() =>
  import(/* webpackChunkName: "createMember" */ './views/CreateMember')
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: "login" */ './views/Login')
);
import BaseAxios from './utils/axios';
import LoadingBar from './components/LoadingBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      axios: BaseAxios(),
      menus: [
        {
          path: "/home",
          name: "메인"
        },
        {
          path: "/show-members",
          name: "회원관리"
        },
        {
          path: "/about",
          name: "About"
        }
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
    const loginType = sessionStorage.getItem('login-type');
    const token = sessionStorage.getItem('token');
    this.state.axios.defaults.headers.loginType = loginType;
    this.state.axios.defaults.headers.token = token;
    this.checkAuth();
  }

  checkAuth() {
    this.setState({isLoading: true});
    BaseAxios().get('/api/login/has-auth')
      .then((response) => {
        console.log('[App]', '/api/login/has-auth', response);
        const { hasAuth, loginType, token, imageUrl, name, } = response.data;

        if (hasAuth) {
          this.handleLogin(loginType, {token, imageUrl, name});
        } else {
          this.invalidateAuth();
        }
      }).finally(() => {
        this.setState({isLoading: false});
      });
  }

  handleLogin(loginType, user) {
    sessionStorage.setItem('login-type', loginType);
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('imageUrl', user.imageUrl);
    sessionStorage.setItem('name', user.name);
    this.state.axios.defaults.headers.loginType = loginType;
    this.state.axios.defaults.headers.token = user.token;
    this.setState({
      hasAuth: true,
      imageUrl: user.imageUrl,
      name: user.name,
    });
  }

  invalidateAuth() {
    sessionStorage.setItem('login-type', null);
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('imageUrl', null);
    sessionStorage.setItem('name', null);
    this.state.axios.defaults.headers.loginType = null;
    this.state.axios.defaults.headers.token = null;
    this.setState({
      hasAuth: false,
      imageUrl: '',
      name: '',
    });
  }

  handleLogout() {
    this.invalidateAuth();
  }  

  render() {
    console.log('[App]', 'render()');
    console.log(this.state);
    const {menus, hasAuth, imageUrl, name, isLoading} = this.state;

    return (
      <div id="app" className="App">
        <div className="header">
          <HeaderTop hasAuth={hasAuth} imageUrl={imageUrl} name={name}
            doLogout={this.handleLogout} />
          <Router>
            <HeaderMenu menus={menus} />
            <Suspense fallback="">
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/show-members" component={(props) => <ShowMembers
                  {...props}
                  invalidateAuth={this.invalidateAuth} />} />
                <Route path="/about" component={About} />
                <Route path="/create-member" component={CreateMember} />
                <Route path="/login" component={(props) => <Login
                  {...props}
                  doLogin={this.handleLogin}
                  invalidateAuth={this.invalidateAuth} />} />
                {/*
                <Route path="/show-member" component={ShowMember} />
                <Route path="/error" component={Error} />
                */}
                <Route path="/"><Redirect to="/home" /></Route>
              </Switch>
            </Suspense>
          </Router>
        </div>
        <div className="footer">&copy;2020</div>
        <LoadingBar isLoading={isLoading} />
      </div>
    );
  }
}

export default App;
