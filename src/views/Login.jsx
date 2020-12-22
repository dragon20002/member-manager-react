import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import BaseAxios from '../utils/axios';
import LoadingBar from '../components/LoadingBar';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      isLoading: false,
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleOnSuccessGoogleLogin = this.handleOnSuccessGoogleLogin.bind(this);
    this.handleOnFailGoogleLogin = this.handleOnFailGoogleLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    $('.login input').on('focus', (e) => {
      const tarInput = $(e.target);
      const tarInputId = tarInput.attr('id');
      const tarPlaceHolder = tarInput.attr('placeholder');
      const tarLbl = $(`.login label[for=${tarInputId}]`);

      tarInput.attr('placeholder-bak', tarPlaceHolder);
      tarInput.attr('placeholder', '');
      tarInput.attr('selected', true);

      tarLbl.css('color', '#42b983');
      tarLbl.parent().slideDown(500);

      // 이전에 선택된 input 중에 자기자신이 아닌 것 선택해제
      const prevInputs = $('.login input[selected=selected]');
      for (let i = 0; i < prevInputs.length; i += 1) {
        const prevInput = prevInputs.eq(i);

        if (prevInput.attr('id') !== tarInputId) {
          const prevPlaceholder = prevInput.attr('placeholder-bak');
          const prevLbl = $(`.login label[for=${prevInput.attr('id')}]`);
          prevInput.attr('selected', false);
          prevLbl.parent().slideUp(500, () => prevInput.attr('placeholder', prevPlaceholder));
        }
      }
    });

    $('.login input').on('blur', (e) => {
      const tarInputId = $(e.target).attr('id');
      const tarLbl = $(`.login label[for=${tarInputId}]`);
      tarLbl.css('color', '');
    });

    // 첫번째 input 선택
    $('.login input:first').trigger('focus');
  }

  handleKeyUp(e) {
    if (e.key === 13) {
      this.handleLogin();
    }
  }

  handleUserIdChange(e) {
    this.setState({ userId: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleOnSuccessGoogleLogin({ token, imageUrl, name }) {
    console.log('[Login]', { token, imageUrl, name });
    const { onLoginSuccessCallback, history } = this.props;
    onLoginSuccessCallback('google', { token, imageUrl, name });
    history.push('/');
  }

  handleOnFailGoogleLogin(e) {
    console.log('[Login]', e.error);
    // this.setState({
    //   popupMsg: e.error,
    //   popupCallback: () => {
    //     this.setState({ showAlertPopup: false });
    //   },
    //   showAlertPopup: true,
    // });
  }

  handleLogin() {
    const axios = BaseAxios();
    const { onLoginSuccessCallback, invalidateAuth, history } = this.props;
    const { userId, password } = this.state;
    let isMounted = true;

    if (userId.length === 0) {
      // this.setState({
      //   popupMsg: '아이디를 입력해주세요.',
      //   popupCallback: () => {
      //     this.setState({ showAlertPopup: false });
      //   },
      //   showAlertPopup: true,
      // });
      return;
    }
    if (password.length === 0) {
      // this.setState({
      //   popupMsg: '비밀번호를 입력해주세요.',
      //   popupCallback: () => {
      //     this.setState({ showAlertPopup: false });
      //   },
      //   showAlertPopup: true,
      // });
      return;
    }

    this.setState({ isLoading: true });
    axios
      .post('/api/login', { userId, password })
      .then((response) => {
        console.log('[Login]', '/api/login', response);
        const {
          hasAuth, token, imageUrl, name,
        } = response.data;

        if (hasAuth) {
          onLoginSuccessCallback(null, { token, imageUrl, name });
          isMounted = false;
          history.push('/');
        } else {
          invalidateAuth();
          // this.setState({
          //   popupMsg: '계정 정보를 찾을 수 없습니다.',
          //   popupCallback: () => {
          //     this.setState({ showAlertPopup: false });
          //   },
          //   showAlertPopup: true,
          // });
        }
      })
      .catch(() => {
        invalidateAuth();
        // this.setState({
        //   popupMsg: '계정 정보를 찾을 수 없습니다.',
        //   popupCallback: () => {
        //     this.setState({ showAlertPopup: false });
        //   },
        //   showAlertPopup: true,
        // });
      })
      .finally(() => {
        if (isMounted) {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    const {
      userId, password, isLoading,
    } = this.state;

    return (
      <div className="login">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-wrap">
            <div className="label">
              <label htmlFor="user-id">아이디</label>
            </div>
            <input
              id="user-id"
              name="userId"
              className="form-control mb-2 mr-sm-2"
              type="text"
              placeholder="아이디"
              maxLength="64"
              autoComplete="off"
              value={userId}
              onChange={this.handleUserIdChange}
              onKeyUp={this.handleKeyUp}
            />

            <div className="label">
              <label htmlFor="password">비밀번호</label>
            </div>
            <input
              id="password"
              name="password"
              className="form-control mb-2 mr-sm-2"
              type="password"
              placeholder="비밀번호"
              maxLength="64"
              value={password}
              onChange={this.handlePasswordChange}
              onKeyUp={this.handleKeyUp}
            />
          </div>
          <button
            type="button"
            className="btn btn-success login-btn"
            onClick={this.handleLogin}
            onKeyUp={this.handleKeyUp}
          >
            로그인
          </button>
        </form>
        <div className="login-type">
          {/* <span className="item">
            <GoogleLogin
              onSuccess={this.handleOnSuccessGoogleLogin}
              onFailure={this.handleOnFailGoogleLogin}
            />
          </span> */}
          {/* <span className="item">
            <GithubLogin
              onSuccess={this.handleOnSuccessGithubLogin}
              onFailure={this.handleOnFailGithubLogin}
            />
          </span>
          <span className="item">
            <KakaoLogin
              onSuccess={this.handleOnSuccessKakaoLogin}
              onFailure={this.handleOnFailKakaoLogin}
            />
          </span> */}
        </div>
        <div className="login-menu">
          <span className="item"><Link to="/create-member">회원가입</Link></span>
          <span className="item"><Link to="/">아이디 찾기</Link></span>
          <span className="item"><Link to="/">비밀번호 찾기</Link></span>
        </div>
        {isLoading && <LoadingBar />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  invalidateAuth: PropTypes.func.isRequired,
  onLoginSuccessCallback: PropTypes.func.isRequired,
};

export default withRouter(Login);
