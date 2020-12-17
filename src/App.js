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
    const loginType = localStorage.getItem('login-type');
    const token = localStorage.getItem('token');
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
    this.state.axios.defaults.headers.loginType = loginType;
    this.state.axios.defaults.headers.token = user.token;
    this.setState({
      hasAuth: true,
      imageUrl: user.imageUrl,
      name: user.name,
    });
  }

  invalidateAuth() {
    localStorage.setItem('login-type', null);
    localStorage.setItem('token', null);
    localStorage.setItem('imageUrl', null);
    localStorage.setItem('name', null);
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
    const {menus, hasAuth, imageUrl, name, isLoading} = this.state;

    return (
      <div id="app" className="App">
        <div className="header">
          <Router>
            <HeaderTop hasAuth={hasAuth} imageUrl={imageUrl} name={name}
              doLogout={this.handleLogout} />
            <HeaderMenu menus={menus} />
            <Suspense fallback="">
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/show-members" render={(props) => <ShowMembers
                  {...props}
                  invalidateAuth={this.invalidateAuth} />} />
                <Route path="/about" component={About} />
                <Route path="/create-member" component={CreateMember} />
                <Route path="/login" render={(props) => <Login
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
