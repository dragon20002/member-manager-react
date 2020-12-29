import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../utils/createRequestSaga';
import membersApi from '../../utils/api/members';

// ----- Tag 생성 ---------------------------------------------- //
// -- `Action`을 구분할 수 있는 string 값

// -- listMembers의 Tag 생성
const [LIST_MEMBERS, LIST_MEMBERS_SUCCESS, LIST_MEMBERS_FAILURE] = createRequestActionTypes(
  'members/LIST_MEMBERS',
);

// -- unloadMembers의 Tag 생성
const UNLOAD_MEMBERS = 'members/UNLOAD_MEMBERS';

// ----- Action 생성 ------------------------------------------- //
// -- 호출하면 Action Handler가 호출된다.

export const listMembers = createAction(LIST_MEMBERS);

export const unloadMembers = createAction(UNLOAD_MEMBERS);

// ----- Saga 생성 --------------------------------------------- //
// -- 결과값을 받아 비즈니스 로직을 수행하는 redux-effects를 대체하여,
// -- Generator Function을 사용하는 비동기 동작을 한 곳에서 관리할 수 있다.

const listMembersSaga = createRequestSaga(LIST_MEMBERS, membersApi.listMembers);

export function* membersSaga() {
  // `takeLatest` : listMembers 요청이 여러번 발생할 경우, 마지막으로 발생한 request의 응답만 받음
  yield takeLatest(LIST_MEMBERS, listMembersSaga);
}

// ----- Action Handler --------------------------------------- //
// -- Action이 발생하면 state를 변경하여 반환한다.

const initialState = {
  members: null,
  error: null,
};

const members = handleActions(
  {
    [LIST_MEMBERS_SUCCESS]: (state, { payload: members }) => ({
      ...state,
      members,
    }),

    [LIST_MEMBERS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [UNLOAD_MEMBERS]: () => initialState,
  },
  initialState,
);

export default members;
