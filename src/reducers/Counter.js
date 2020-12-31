import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery } from 'redux-saga/effects';

// ----- ActionType ------------------------------------------------- //

const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const INCREMENT_ASYNC = 'counter/INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'counter/DECREMENT_ASYNC';
const SET_COLOR = 'counter/SET_COLOR';

// ----- Action ----------------------------------------------------- //

export const increment = createAction(INCREMENT, () => {
  console.log('[Action]', 'increment');
});
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);
export const setColor = createAction(SET_COLOR, (color) => ({ color }));

// ----- Effect ----------------------------------------------------- //

function* incrementAsyncSaga() {
  console.log('[Effect]', 'increment');
  yield delay(1000);
  yield put(increment());
}

function* decrementAsyncSaga() {
  yield delay(1000);
  yield put(decrement());
}

export function* counterSaga() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
  yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}

// ----- Dispatch ---------------------------------------------------- //

const initialState = {
  number: 0,
  color: 'black',
};

export default handleActions(
  {
    [INCREMENT]: (state) => {
      console.log('[Dispatch]', 'increment');
      return {
        ...state,
        number: state.number + 1,
      };
    },

    [DECREMENT]: (state) => ({
      ...state,
      number: state.number - 1,
    }),

    [SET_COLOR]: (state, { payload: { color } }) => ({ ...state, color }),
  },
  initialState,
);
