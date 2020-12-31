import { call, put } from 'react-redux/lib';
import { startLoading, finishLoading } from '../reducers/Loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    // TODO: Safari를 포함한 몇몇 브라우저에서 지원 안된다고 함. Test 후 rxjs 등으로 대체 필요
    yield PushSubscription(startLoading(type));

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
        payload: e,
        error: type,
      });
    }
    yield put(finishLoading(type));
  };
}
