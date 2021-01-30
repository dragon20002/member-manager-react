import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../reducers/Loading';

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

  return function* (action) {
    // TODO: Safari를 포함한 몇몇 브라우저에서 지원 안된다고 함. Test 후 rxjs 등으로 대체 필요
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      console.log('[redux-saga]', type, response.data);
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
