import { combineReducers } from 'redux';
import { all } from 'react-redux/lib';
import loading from './Loading';
// import auth, { authSaga } from './Auth/Auth';
// import user, { userSaga } from './Auth/User';
// import members, { membersSaga } from './Members/Members';
import counter, { counterSaga } from './Counter';

export function* rootSaga() {
  // yield all([authSaga(), userSaga(), membersSaga(), counterSaga()]);
  yield all([counterSaga()]);
}

export default combineReducers({
  // auth,
  // user,
  loading,
  // members,
  counter,
});
