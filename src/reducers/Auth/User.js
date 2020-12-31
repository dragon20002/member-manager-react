import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import { createRequestActionTypes } from '../../utils/createRequestSaga';

const TEMP_SET_MEMBER = 'user/TEMP_SET_MEMBER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_MEMBER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

function checkSaga() {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) sessionStorage.getItem('userId');
  } catch {
    console.error('localStorage is not working');
  }
}

function checkFailureSaga() {
  try {
    localStorage.removeItem('userId');
  } catch {
    console.error('localStorage is not working');
  }
}

function logoutSaga() {
  try {
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
  } catch {
    console.error('로그아웃에 실패하였습니다.');
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_MEMBER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),

    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),

    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),

    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
