import React from 'react';
import PropTypes from 'prop-types';
import './Members.css';

const Members = ({ members, loading, error }) => {
  if (error) {
    if (error.response && error.response.status) {
      return <div>{error.response.status}</div>;
    }
    return <div>오류발생!</div>;
  }

  if (loading || !members || !members.value) {
    return null;
  }

  const trMembers = members.value.map((member) => (
    <tr key={member.id}>
      <td>{member.userId}</td>
      <td>{member.name}</td>
      <td>{member.telNo}</td>
      <td>{member.email}</td>
      <td>{member.address}</td>
    </tr>
  ));

  return (
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
      <tbody>{members.value.length > 0 && trMembers}</tbody>
    </table>
  );
};

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(PropTypes.object).isRequired,
};

export default Members;
