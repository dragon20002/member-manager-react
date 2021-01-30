import React from 'react';
import { useSelector } from 'react-redux';
import './Members.css';

const Members = () => {
  const { members, error } = useSelector(({ members }) => members);

  if (error) {
    if (error.response && error.response.status) {
      return <div>{error.response.status}</div>;
    }
    return <div>오류발생!</div>;
  }

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
      <tbody>{members.length > 0 && trMembers}</tbody>
    </table>
  );
};

Members.propTypes = {};

export default Members;
