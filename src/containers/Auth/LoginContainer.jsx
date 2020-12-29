import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/Auth/Login';
import { initializeForm, changeField, login } from '../../reducers/Auth/Auth';
import './LoginContainer.css';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [setVisible] = useState(false);
  const [setErrorMessage] = useState(null);

  const [saveUserId, setSaveUserId] = useState(!!localStorage.getItem('userId'));

  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setErrorMessage('로그인 실패');
    } else if (auth) {
      setErrorMessage('로그인 실패');
      setVisible(true);
      console.log('로그인 실패');
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/home');
      try {
        if (saveUserId) {
          localStorage.setItem('userId', JSON.stringify(user.userId));
        }
        sessionStorage.setItem('userId', JSON.stringify(user));
      } catch {
        console.error('sessionStorage is not working');
      }
    }
  }, [history, user, saveUserId]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  //   const handleDismiss = () => {
  //     setVisible(false);
  //     setErrorMessage(null);
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = form;
    dispatch(login({ userId, password }));
  };

  return (
    <div className="login">
      <Login
        // user={user}
        form={form}
        onChange={handleChange}
        // onDismiss={handleDismiss}
        onSubmit={handleSubmit}
        // visible={visible}
        saveUserId={saveUserId}
        setSaveUserId={setSaveUserId}
        // errorMessage={errorMessage}
      />
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
    </div>
  );
};

LoginContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(LoginContainer);
