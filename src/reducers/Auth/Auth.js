import { createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import authApi from '../../utils/api/auth';
import createRequestSaga from '../../utils/createRequestSaga';

// 비동기는 saga로 만든다. createRequestSaga는 커스텀 함수
const loginSaga = createRequestSaga('auth/login', authApi.login);

const hasAuthSaga = createRequestSaga('auth/hasAuth', authApi.hasAuth);

export function* authSaga() {
  // 위에서 만든 saga를 이곳에 모은다.
  yield takeLatest('login', loginSaga);
  yield takeLatest('hasAuth', hasAuthSaga);
}

const initialState = {
  login: {
    userId: JSON.parse(localStorage.getItem('userId')) || '',
    password: '',
    saveUserId: false,
  },
  authError: '',
  auth: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeField: (state, { payload: { form, key, value } }) => {
      state[form][key] = value;
    },
    initForm: (state, { payload: form }) => {
      state[form] = initialState[form];
      state.authError = initialState.authError;
    },
    logout: (state) => {
      state.auth = initialState.auth;
      state.user = initialState.user;
    },
    loginSuccess: (state, { payload: { hasAuth, loginType, imageUrl, name, token } }) => {
      state.authError = initialState.authError;
      state.auth = hasAuth;
      state.user = {
        loginType,
        imageUrl,
        name,
        token,
      };
    },
    loginFailure: (state, { error }) => {
      state.authError = error;
    },
    hasAuthSuccess: (state, { payload: { hasAuth, loginType, token, imageUrl, name } }) => {
      state.authError = initialState.authError;
      state.auth = hasAuth;
      state.user = {
        loginType,
        imageUrl,
        name,
        token,
      };
    },
    hasAuthFailure: (state, { error }) => {
      state.authError = error;
    },
  },
});

export const { changeField, initForm, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
