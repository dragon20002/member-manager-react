import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../utils/createRequestSaga';
import authApi from '../../utils/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form,
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const login = createAction(LOGIN, ({ userId, password }) => ({
  userId,
  password,
}));

const loginSaga = createRequestSaga(LOGIN, authApi.login);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  login: {
    userId: JSON.parse(localStorage.getItem('userId')) || '',
    password: '',
  },
  auth: null,
  authError: null,
};

export default handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
      const formMap = state[form];
      formMap[key] = value;
      return {
        ...state,
        [form]: formMap,
      };
    },

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null,
    }),

    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),

    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);
