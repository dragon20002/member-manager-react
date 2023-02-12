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
      <td>{member.id}</td>
      <td>{member.accountId}</td>
      <td>{member.limit}</td>
    </tr>
  ));

  return (
    <table className="container table">
      <thead>
        <tr>
          <th>id</th>
          <th>accountId</th>
          <th>limit</th>
        </tr>
      </thead>
      <tbody>{members.length > 0 && trMembers}</tbody>
    </table>
  );
};

Members.propTypes = {};

export default Members;
