import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Client from '../utils/api/client';
import './LoginContainer.css';

const LoginContainer = () => {
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
    <div className="login">
      <Login />
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
        <span className="item">
          <Link to="/create-member">회원가입</Link>
        </span>
        <span className="item">
          <Link to="/">아이디 찾기</Link>
        </span>
        <span className="item">
          <Link to="/">비밀번호 찾기</Link>
        </span>
      </div>
      {errorMessage && <span className="text-danger">{errorMessage}</span>}
    </div>
  );
};

export default LoginContainer;
