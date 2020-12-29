import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useDispatch, useStore, useSelector } from 'react-redux';
import Members from '../../components/Members/Members';
import { listMembers } from '../../reducers/Members/Members';

const MembersContainer = ({ history }) => {
  const dispatch = useDispatch();
  const store = useStore();
  const { hasAuth } = store.getState();

  if (!hasAuth) {
    history.push('/login');
    return <div />;
  }

  // ----- Selector ----------------------------------------------- //

  const { members, loading, error } = useSelector(({ members, loading }) => ({
    members: members.members,
    error: members.error,
    loading: loading['members/LIST_MEMBERS'],
  }));

  // ----- Effect ------------------------------------------------- //
  useEffect(() => {
    if (members) {
      dispatch(listMembers);
    } else if (error) {
      history.push('/login');
    }
  }, [dispatch]);

  return <Members members={members} loading={loading} error={error} />;
};

MembersContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(MembersContainer);
