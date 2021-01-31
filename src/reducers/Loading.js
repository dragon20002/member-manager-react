import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

// action 정의
// action을 실행하면 handleActions가 호출됨
export const startLoading = createAction(START_LOADING, (requestType) => requestType);

export const finishLoading = createAction(FINISH_LOADING, (requestType) => requestType);

const initialState = {
  count: 0,
};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      count: state.count + 1,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      count: state.count - 1,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loading;
