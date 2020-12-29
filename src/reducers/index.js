import { combineReducers } from 'redux';
import { all } from 'react-redux/lib';
import loading from './loading';
import auth, { authSaga } from './Auth/Auth';
import user, { userSaga } from './Auth/User';
import members, { membersSaga } from './Members/Members';

const rootReducer = combineReducers({
  auth,
  user,
  loading,
  members,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), membersSaga()]);
}

export default rootReducer;
