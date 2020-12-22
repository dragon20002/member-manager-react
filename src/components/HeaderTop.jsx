import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './HeaderTop.css';
import NoImage from '../assets/user-circle-solid.svg';

const HeaderTop = (props) => {
  const history = useHistory();
  const { hasAuth, doLogout } = props;
  let { imageUrl, name } = props;

  if (!hasAuth) {
    imageUrl = NoImage;
    name = '내 정보';
  } else if (!imageUrl) {
    imageUrl = NoImage;
  }

  const handleLogout = () => {
    doLogout();
    history.push('/');
  };

  return (
    <div>
      {!hasAuth && (
        <div className="header-top">
          <span>
            <Link to="/create-member">회원가입</Link>
          </span>
          <span>
            <Link to="/login">로그인</Link>
          </span>
        </div>
      )}
      {hasAuth && (
        <div className="header-top">
          <img src={imageUrl} alt="" />
          <span>
            <Link to="/show-member">{name}</Link>
            <span>&nbsp;님</span>
          </span>
          <span>
            <button className="btn btn-link" type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

HeaderTop.propTypes = {
  hasAuth: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doLogout: PropTypes.func.isRequired,
};

export default HeaderTop;
