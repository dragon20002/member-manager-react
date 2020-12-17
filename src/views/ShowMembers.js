import React from 'react';
import BaseAxios from '../utils/axios';
import LoadingBar from '../components/LoadingBar';
import './ShowMembers.css';

class ShowMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      members: [],
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    BaseAxios().get('/api/members')
      .then((response) => {
        this.setState({members: response.data});
      }).catch((err) => {
        const { status } = err.response;
        if (status === 401) {
          this.props.invalidateAuth();

          // 로그인화면으로 이동
          this.props.history.push('/login');
        }
      }).finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const isLoading = this.state.isLoading;
    const members = this.state.members.map((member) =>
      <tr key={member.id}>
        <td>{member.userId}</td>
        <td>{member.name}</td>
        <td>{member.telNo}</td>
        <td>{member.email}</td>
        <td>{member.address}</td>
      </tr>
    );

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
          <tbody>
            {members}
          </tbody>
        </table>
        <LoadingBar isLoading={isLoading} />
      </div>
    );
  }
}

export default ShowMembers;
