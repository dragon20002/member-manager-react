import { createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import membersApi from '../../utils/api/members';
import createRequestSaga from '../../utils/createRequestSaga';

// ----- Saga 생성 --------------------------------------------- //
// -- 결과값을 받아 비즈니스 로직을 수행하는 redux-effects를 대체하여,
// -- Generator Function을 사용하는 비동기 동작을 한 곳에서 관리할 수 있다.

const listMembersSaga = createRequestSaga('members/listMembers', membersApi.listMembers);

export function* membersSaga() {
  // `takeLatest` : listMembers 요청이 여러번 발생할 경우, 마지막으로 발생한 request의 응답만 받음
  yield takeLatest('listMembers', listMembersSaga);
}

// ----- Action Handler --------------------------------------- //
// -- Action이 발생하면 state를 변경하여 반환한다.

const initialState = {
  members: [],
  error: '',
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    listMembersSuccess: (state, { payload: members }) => {
      state.members = members;
    },
    listMembersFailure: (state, { payload: error }) => {
      state.error = error;
    },
    unloadMembers: (state) => {
      state.members = initialState.members;
      state.error = initialState.error;
    },
  },
});

export const { unloadMembers } = membersSlice.actions;

export default membersSlice.reducer;
