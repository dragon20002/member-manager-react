import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import loading from './Loading';
import auth, { authSaga } from './Auth/Auth';
import user, { userSaga } from './Auth/User';
import members, { membersSaga } from './Members/Members';
import counter, { counterSaga } from './Counter';

export function* rootSaga() {
	yield all([fork(authSaga), fork(userSaga), fork(membersSaga), fork(counterSaga)]);
}

export default combineReducers({
	auth,
	user,
	loading,
	members,
	counter,
});
