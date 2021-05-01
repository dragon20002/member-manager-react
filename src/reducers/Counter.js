import { createSlice } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';

// ----- Effect ----------------------------------------------------- //

function* incrementAsyncSaga() {
	yield delay(1000);
	yield put({ type: 'counter/increment' });
}

function* decrementAsyncSaga() {
	yield delay(1000);
	yield put({ type: 'counter/decrement' });
}

export function* counterSaga() {
	yield takeEvery('incrementAsync', incrementAsyncSaga);
	yield takeEvery('decrementAsync', decrementAsyncSaga);
}

// ----- Dispatch ---------------------------------------------------- //

const initialState = {
	number: 0,
	color: 'black',
};

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.number += 1;
		},
		decrement: (state) => {
			state.number -= 1;
		},
		setColor: (state, { payload }) => {
			state.color = payload;
		},
	},
});

export const { increment, decrement, setColor } = counterSlice.actions;

export default counterSlice.reducer;
