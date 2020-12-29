import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Login = ({
  //   member,
  form,
  onChange,
  //   onDismiss,
  onSubmit,
  //   visible,
  saveUserId,
  setSaveUserId,
  //   errorMessage,
}) => {
  //   const [showAlertPopup, setShowAlertPopup] = useState(false);
  const userIdInput = useRef();

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
          value={form.password}
          onChange={onChange}
          //   onKeyUp={this.handleKeyUp}
          ref={userIdInput}
        />
      </div>
      <div className="form-group form-check">
        <label className="form-check-label">
          <input
            className="form-check-input"
            type="checkbox"
            name="saveUserId"
            defaultChecked={saveUserId}
            onClick={(e) => setSaveUserId(e.target.checked)}
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

Login.propTypes = {
  //   member: PropTypes.instanceOf(PropTypes.object).isRequired,
  form: PropTypes.instanceOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  //   onDismiss: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  //   visible: PropTypes.bool.isRequired,
  saveUserId: PropTypes.bool.isRequired,
  setSaveUserId: PropTypes.func.isRequired,
  //   errorMessage: PropTypes.string.isRequired,
};

export default Login;
