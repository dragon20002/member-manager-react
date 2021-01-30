import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Members from '../../components/Members/Members';
import { listMembers } from '../../reducers/Members/Members';

const MembersContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }

    dispatch(listMembers());
  }, [auth, dispatch]);

  return auth && <Members />;
};

MembersContainer.propTypes = {};

export default MembersContainer;
