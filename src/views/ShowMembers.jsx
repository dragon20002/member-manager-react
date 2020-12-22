import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BaseAxios from '../utils/axios';
import LoadingBar from '../components/LoadingBar';
import './ShowMembers.css';

class ShowMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      members: [],
    };
  }

  componentDidMount() {
    const { invalidateAuth, history } = this.props;
    let isMounted = true; // Unmount된 컴포넌트의 State 변경을 막기 위한 변수

    this.setState({ isLoading: true });
    BaseAxios()
      .get('/api/members')
      .then((response) => {
        this.setState({ members: response.data });
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          invalidateAuth();

          // 로그인화면으로 이동
          isMounted = false;
          history.push('/login');
        }
      })
      .finally(() => {
        if (isMounted) {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    const { isLoading, members } = this.state;

    const trMembers = members.map((member) => (
      <tr key={member.id}>
        <td>{member.userId}</td>
        <td>{member.name}</td>
        <td>{member.telNo}</td>
        <td>{member.email}</td>
        <td>{member.address}</td>
      </tr>
    ));

    return (
      <div className="home">
        <table className="container table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>{trMembers}</tbody>
        </table>
        {isLoading && <LoadingBar />}
      </div>
    );
  }
}

ShowMembers.propTypes = {
  invalidateAuth: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(ShowMembers);
