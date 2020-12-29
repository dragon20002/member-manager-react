import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import './CreateMember.css';
import AlertPopup from '../components/AlertPopup';
import LoadingBar from '../components/LoadingBar';
import Client from '../utils/api/client';

class CreateMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      passwordRe: '',
      name: '',
      email: '',
      telNo: '',
      address: '',
      isMemberDup: true,
      isLoading: false,
      popupMsg: '',
      popupCallback: null,
      showAlertPopup: false,
    };
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordReChange = this.handlePasswordReChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTelNoChange = this.handleTelNoChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.checkMemberDup = this.checkMemberDup.bind(this);
    this.clearUserId = this.clearUserId.bind(this);
    this.createMember = this.createMember.bind(this);
  }

  handleUserIdChange(e) {
    this.setState({ userId: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordReChange(e) {
    this.setState({ passwordRe: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleTelNoChange(e) {
    this.setState({ telNo: e.target.value });
  }

  handleAddressChange(e) {
    this.setState({ address: e.target.value });
  }

  /**
   * 사용자 입력 검증
   */
  validateInputs() {
    const { isMemberDup, userId, password, passwordRe } = this.state;

    // 1. required 체크
    const reqLabels = $('.create-member label.req');
    for (let i = 0; i < reqLabels.length; i += 1) {
      const lbl = reqLabels.eq(i);
      const input = $(`.create-member input[id=${lbl.attr('for')}]`);
      const value = input.val();
      if (!value || value.length === 0) {
        input.addClass('error');
        this.setState({
          popupMsg: `${lbl.text()}를 입력해주세요.`,
          popupCallback: () => {
            this.setState({ showAlertPopup: false });
          },
          showAlertPopup: true,
        });
        return false;
      }
      input.removeClass('error');
    }

    // 2. validation 체크

    // 2.1. 아이디 중복체크 여부
    if (isMemberDup) {
      $('input[name=userId]').addClass('error');
      this.setState({
        popupMsg: '아이디 중복체크를 해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return false;
    }

    $('input[name=userId').removeClass('error');

    // 2.2.1 아이디와 다른 비밀번호 체크
    if (userId === password) {
      $('input[name=password]').addClass('error');
      this.setState({
        popupMsg: '비밀번호는 아이디와 다르게 입력해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return false;
    }

    // 2.2.2 비밀번호 유효성 체크
    const hasAlpha = password.match(/[A-Za-z]+/);
    const hasNum = password.match(/[0-9]+/);
    const hasChar = password.match(/[`~!@#$%^&*()\-_]+/);
    const hasInvalid = password.match(/[^A-Za-z0-9`~!@#$%^&*()\-_]+/);
    if (password.length < 8 || !hasAlpha || !hasNum || !hasChar || hasInvalid) {
      $('input[name=password]').addClass('error');
      this.setState({
        popupMsg: '비밀번호는 영문/숫자/특수문자 포함 8자 이상으로 입력해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return false;
    }

    // 2.2.3 비밀번호 재입력 체크
    if (password !== passwordRe) {
      $('input[name=password]').addClass('error');
      this.setState({
        popupMsg: '같은 비밀번호를 입력해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return false;
    }

    $('input[name=password]').removeClass('error');

    // 2.3 전화번호 유효성 체크
    const { telNo } = this.state;
    const telNoRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/;
    if (telNo && telNo.length > 0 && !telNo.match(telNoRegex)) {
      $('input[name=telNo]').addClass('error');
      this.setState({
        popupMsg: '올바른 전화번호를 입력해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return false;
    }

    $('input[name=telNo]').removeClass('error');

    return true;
  }

  /**
   * 아이디 중복체크 요청
   */
  checkMemberDup() {
    const { userId } = this.state;
    if (!userId || userId.length === 0) {
      $('input[name=userId]').addClass('error');
      this.setState({
        popupMsg: '아이디를 입력해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return;
    }

    const hasInvalid = userId.match(/[^A-Za-z가-힣0-9\-_]+/);
    if (userId.length < 6 || hasInvalid) {
      $('input[name=userId]').addClass('error');
      this.setState({
        popupMsg: '아이디는 한글/영문/숫자 6자 이상으로 입력해주세요.',
        popupCallback: () => {
          this.setState({ showAlertPopup: false });
        },
        showAlertPopup: true,
      });
      return;
    }

    $('input[name=userId]').removeClass('error');

    this.setState({ isLoading: true });
    Client()
      .post('/api/login/check-member-dup', { userId })
      .then((response) => {
        const result = Boolean(response.data);
        this.setState({ isMemberDup: result });
        if (result) {
          this.setState({
            popupMsg: '이미 사용중인 아이디 입니다.',
            popupCallback: () => {
              this.setState({ showAlertPopup: false });
            },
            showAlertPopup: true,
          });
        } else {
          this.setState({
            popupMsg: '사용가능한 아이디 입니다.',
            popupCallback: () => {
              this.setState({ showAlertPopup: false });
            },
            showAlertPopup: true,
          });
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  /*
   * 아이디 중복체크 초기화
   */
  clearUserId() {
    this.setState({
      userId: '',
      isMemberDup: true,
    });
  }

  /**
   * 계정 생성 요청
   */
  createMember() {
    if (!this.validateInputs()) {
      return;
    }

    const { history } = this.props;
    const { userId, password, passwordRe, name, email, telNo, address } = this.state;
    let isMounted = true;

    this.setState({ isLoading: true });
    Client()
      .post('/api/login/create-member', {
        userId,
        password,
        passwordRe,
        name,
        email,
        telNo,
        address,
      })
      .then((response) => {
        const isCreated = Boolean(response.data);
        if (isCreated) {
          this.setState({
            popupMsg: '계정 생성에 성공하였습니다.',
            popupCallback: () => {
              this.setState({ showAlertPopup: false });
            },
            showAlertPopup: true,
          });
          isMounted = false;
          history.push('/');
        } else {
          this.setState({
            popupMsg: '계정 생성에 실패하였습니다. 다시 시도해 주세요.',
            popupCallback: () => {
              this.setState({ showAlertPopup: false });
            },
            showAlertPopup: true,
          });
        }
      })
      .catch(() => {
        this.setState({
          popupMsg: '계정 생성에 실패하였습니다. 다시 시도해 주세요.',
          popupCallback: () => {
            this.setState({ showAlertPopup: false });
          },
          showAlertPopup: true,
        });
      })
      .finally(() => {
        if (isMounted) {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    const { userId, password, passwordRe, name, email, telNo, address } = this.state;
    const { isMemberDup, isLoading } = this.state;
    const { popupMsg, popupCallback, showAlertPopup } = this.state;

    return (
      <div className="create-member">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-wrap">
            <label htmlFor="user-id" className="req">
              아이디
            </label>
            {isMemberDup && (
              <div className="input-group mb-2 mr-sm-2">
                <input
                  id="user-id"
                  name="userId"
                  className="form-control"
                  type="text"
                  placeholder="한글/영문 6자 이상"
                  maxLength="64"
                  value={userId}
                  onChange={this.handleUserIdChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-success" type="button" onClick={this.checkMemberDup}>
                    중복확인
                  </button>
                </div>
              </div>
            )}
            {!isMemberDup && (
              <div className="input-group mb-2 mr-sm-2">
                <input
                  id="user-id"
                  name="userId"
                  className="form-control"
                  type="text"
                  placeholder="한글/영문 6자 이상"
                  maxLength="64"
                  value={userId}
                  readOnly
                />
                <div className="input-group-append">
                  <button className="btn btn-danger" type="button" onClick={this.clearUserId}>
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
            )}
            <label htmlFor="password" className="req">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              className="form-control mb-2 mr-sm-2"
              type="password"
              placeholder="영문/숫자/특수문자 포함 8자 이상"
              maxLength="64"
              value={password}
              onChange={this.handlePasswordChange}
            />
            <label htmlFor="password-re" className="req">
              비밀번호 확인
            </label>
            <input
              id="password-re"
              className="form-control mb-2 mr-sm-2"
              type="password"
              placeholder="영문/숫자/특수문자 포함 8자 이상"
              maxLength="64"
              value={passwordRe}
              onChange={this.handlePasswordReChange}
            />
            <label htmlFor="name" className="req">
              이름
            </label>
            <input
              id="name"
              name="name"
              className="form-control mb-2 mr-sm-2"
              type="text"
              value={name}
              onChange={this.handleNameChange}
            />
            <label htmlFor="email" className="req">
              이메일
            </label>
            <input
              id="email"
              name="email"
              className="form-control mb-2 mr-sm-2"
              type="text"
              placeholder="your-email-id@examle.com"
              maxLength="64"
              value={email}
              onChange={this.handleEmailChange}
            />
            <label htmlFor="tel-no">전화번호</label>
            <input
              id="tel-no"
              name="telNo"
              className="form-control mb-2 mr-sm-2"
              type="text"
              placeholder="000-0000-0000"
              maxLength="64"
              value={telNo}
              onChange={this.handleTelNoChange}
            />
            <label htmlFor="address">주소</label>
            <input
              id="address"
              name="address"
              className="form-control mb-2 mr-sm-2"
              type="text"
              placeholder="시/도 구/군"
              maxLength="64"
              value={address}
              onChange={this.handleAddressChange}
            />
          </div>
          <button
            id="create-member-btn"
            className="btn btn-success"
            type="button"
            onClick={this.createMember}
          >
            회원가입
          </button>
        </form>
        <span>
          <Link to="/login">로그인</Link>
        </span>
        <span>
          <Link to="/">아이디 찾기</Link>
        </span>
        <span>
          <Link to="/">비밀번호 찾기</Link>
        </span>
        {showAlertPopup && <AlertPopup popupMsg={popupMsg} popupCallback={popupCallback} />}
        {isLoading && <LoadingBar />}
      </div>
    );
  }
}

CreateMember.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(CreateMember);
