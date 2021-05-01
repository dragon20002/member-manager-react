import { createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

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
	yield takeLatest('check', checkSaga);
	yield takeLatest('checkFailure', checkFailureSaga);
	yield takeLatest('logout', logoutSaga);
}

const initialState = {
	user: null,
	checkError: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		tempSetMember: (state, { payload: user }) => {
			state.user = user;
		},
		checkSuccess: (state, { payload: user }) => {
			state.user = user;
			state.checkError = null;
		},
		checkFailure: (state, { payload: error }) => {
			state.user = null;
			state.checkError = error;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const { tempSetMember, logout } = userSlice.actions;

export default userSlice.reducer;
