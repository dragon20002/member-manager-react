import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initForm } from '../../reducers/Auth/Auth';

const Login = () => {
  const dispatch = useDispatch();
  //   const [showAlertPopup, setShowAlertPopup] = useState(false);

  const { form } = useSelector(({ auth }) => ({
    form: auth.login,
  }));

  useEffect(() => {
    dispatch(initForm('login'));

    const userId = localStorage.getItem('userId') || '';
    if (userId) {
      dispatch(changeField({ form: 'login', key: 'saveUserId', value: userId }));
      dispatch(changeField({ form: 'login', key: 'userId', value: userId }));
    }
  }, [dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  //   const onDismiss = () => {
  //     setVisible(false);
  //     setErrorMessage(null);
  //   };

  const onSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = form;
    dispatch({
      type: 'login',
      payload: { loginType: null, userId, password },
    });
  };

  return (
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
          value={form.userId}
          onChange={onChange}
          //   onKeyUp={this.handleKeyUp}
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
          onChange={onChange}
          //   onKeyUp={this.handleKeyUp}
        />
      </div>
      <div className="form-group form-check">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            name="saveUserId"
            defaultChecked={form.saveUserId}
            onClick={(e) => {
              dispatch(changeField({ form: 'login', key: 'saveUserId', value: e.target.checked }));
            }}
          />
          아이디 저장하기
        </label>
      </div>
      <button
        type="button"
        className="btn btn-success login-btn"
        onClick={onSubmit}
        // onKeyUp={this.handleKeyUp}
      >
        로그인
      </button>
    </form>
  );
};

export default Login;
