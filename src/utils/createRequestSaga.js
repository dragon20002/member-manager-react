import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../reducers/Loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}Success`;
  const FAILURE = `${type}Failure`;
  return [type, SUCCESS, FAILURE];
};

/**
 *
 * @param {string}} type ActionType. {slice파일명}/{action명} 형식 ex) auth/login
 * @param {func} request http 비동기 함수
 */
export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}Success`;
  const FAILURE = `${type}Failure`;

  return function* anonymous(action) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      console.log('[response]', type, response.data);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        error: e,
      });
    }
    yield put(finishLoading(type));
  };
}
