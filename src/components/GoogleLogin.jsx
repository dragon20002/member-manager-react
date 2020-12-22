import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from './LoadingBar';
import BaseAxios from '../utils/axios';
import './GoogleLogin.css';
import Logo from '../assets/google_logo.png';

class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUri: `${window.location.origin}/login`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
      ].join(' '),
      clientId: `${process.env.REACT_APP_GOOGLE_LOGIN_CLIENT_ID}`,
      state: `${process.env.REACT_APP_GOOGLE_LOGIN_STATE}`,
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    const { onSuccess, onFailure } = this.props;
    const { state, redirectUri } = this.state;
    let isMounted = true;

    // Google query-string 검사
    const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
    if ((stateRegex) && (stateRegex.length > 1) && (stateRegex[1] === state)) {
      const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
      if (codeRegex) {
        if (codeRegex.length > 1) {
          const params = {
            loginType: 'google',
            code: decodeURIComponent(codeRegex[1]),
            state: decodeURIComponent(stateRegex[1]),
            redirectUri,
          };

          this.setState({ isLoading: true });
          BaseAxios()
            .post('/api/login/oauth', params)
            .then((response) => {
              console.log('[GoogleLogin]', '/api/login/oauth', response);
              const {
                hasAuth, token, imageUrl, name,
              } = response.data;

              if (hasAuth) {
                isMounted = false;
                onSuccess({
                  hasAuth,
                  token,
                  imageUrl,
                  name,
                });
              } else {
                onFailure('Google 인증 실패');
              }
            })
            .catch((err) => {
              console.log('[GoogleLogin', err);
            })
            .finally(() => {
              if (isMounted) {
                this.setState({ isLoading: false });
              }
            });
        }
      }
    }
  }

  handleClick() {
    document.querySelector('#google-login-form').submit();
  }

  handleKeyUp(e) {
    if (e.key === 'g') {
      this.handleClick();
    }
  }

  render() {
    const {
      redirectUri, scope, clientId, state,
    } = this.state;
    const { isLoading } = this.state;

    return (
      <div className="google-login-btn" onClick={this.handleClick} onKeyUp={this.handleKeyUp}>
        <form
          id="google-login-form"
          method="GET"
          action="https://accounts.google.com/o/oauth2/v2/auth"
        >
          <input type="hidden" name="redirect_uri" value={redirectUri} />
          <input type="hidden" name="response_type" value="code" />
          <input type="hidden" name="access_type" value="offline" />
          <input type="hidden" name="scope" value={scope} />
          <input type="hidden" name="client_id" value={clientId} />
          <input type="hidden" name="state" value={state} />
        </form>
        <img className="logo" src={Logo} alt="google" />
        {isLoading && <LoadingBar />}
      </div>
    );
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

export default GoogleLogin;
