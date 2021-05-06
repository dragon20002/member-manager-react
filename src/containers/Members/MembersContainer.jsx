import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Members from '../../components/Members/Members';

const MembersContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const routeMatch = useRouteMatch();
	const { auth } = useSelector(({ auth }) => auth);

	console.log({ history, location, routeMatch });

	useEffect(() => {
		if (!auth) {
			history.push('/login');
		}

		dispatch({ type: 'listMembers' });
	}, [auth, dispatch]);

	return auth && <Members />;
};

MembersContainer.propTypes = {};

export default MembersContainer;
