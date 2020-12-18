import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderTop.css';

class HeaderTop extends React.Component {
  constructor(props) {
    super(props);
    console.log('[HeaderTop]', 'props = ', props);
    this.state = {};
    if (Boolean(props.hasAuth)) {
      this.state.hasAuth = true;
      this.state.imageUrl = props.imageUrl;
      this.state.name = props.name;
    } else {
      this.state.hasAuth = false;
      this.state.imageUrl = '../assets/user-circle-solid.svg';
      this.state.name = '내 정보';
    }
    this.doLogout = this.doLogout.bind(this);
  }

  doLogout() {
    this.props.doLogout();
    this.props.history.push('/');
  }

  render() {
    console.log('[HeaderTop]', 'render()');
    const {hasAuth, imageUrl, name} = this.state;

    return (
      <div className="header-top">
        {!hasAuth &&
          <div>
            {/* <span><Link to="/create-member">회원가입</Link></span> */}
            {/* <span><Link to="/login">로그인</Link></span> */}
          </div>
        }
        {hasAuth &&
          <div>
            <img src={imageUrl} />
            {/* <span><Link to="/show-member">{name}</Link> 님</span> */}
            <span>
              <button className="btn btn-link" onClick={this.doLogout}>
                로그아웃
              </button>
            </span>
          </div>
        }
      </div>
    );
  }
}

export default HeaderTop;
