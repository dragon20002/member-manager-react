import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderTop.css';

class HeaderTop extends React.Component {
  constructor(props) {
    super(props);
    console.log('headerTop', props);
    this.state = {
      hasAuth: props.hasAuth | false,
      imageUrl: props.imageUrl | '../assets/user-circle-solid.svg',
      name: props.name | '내 정보',
    };
    this.setMember = this.setMember.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  setMember(member) {
    const hasAuth = member != null;
    if (hasAuth) {
      this.setState({
        hasAuth: true,
        imageUrl: member.imageUrl,
        name: member.name,
      });
    } else {
      this.setState({
        hasAuth: false,
        imageUrl: '../assets/user-circle-solid.svg',
        name: '내 정보',
      });
    }
  }

  doLogout() {
    this.props.doLogout();
    this.props.history.push('/');
  }

  render() {
    const hasAuth = Boolean(this.state.hasAuth);
    const imageUrl = this.state.imageUrl;
    const name = this.state.name;

    return (
      <div className="header-top">
        {!hasAuth &&
          <div>
            <span><Link to="/create-member">회원가입</Link></span>
            <span><Link to="/login">로그인</Link></span>
          </div>
        }
        {hasAuth &&
          <div>
            <img src={imageUrl} />
            <span><Link to="/show-member">{name}</Link> 님</span>
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
