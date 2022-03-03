import {
  getUsersByKeywordRequest,
  getUsersByKeywordSuccess,
  getUsersByKeywordFailure,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  getUsersByEmailRequest,
  getUsersByEmailSuccess,
  getUsersByEmailFailure,
  putBlockUserRequest,
  putBlockUserSuccess,
  putBlockUserFailure,
  putUnblockUserRequest,
  putUnblockUserSuccess,
  putUnblockUserFailure,
} from 'reducers/user';
import { takeEvery, put } from 'redux-saga/effects';
import { sagaLayoutFunction } from 'utils/callApi';

export function* getUsersByKeyword(action) {
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/user/search',
      queries: [{ name: 'keyword', value: action.payload }],
    },
    function* (data) {
      yield put(getUsersByKeywordSuccess(data));
    },
    getUsersByKeywordFailure,
  );
}

export function* getUsers(action) {
  const { page, size } = action.payload;
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/user/list',
      queries: [
        { name: 'page', value: page },
        { name: 'size', value: size },
      ],
    },
    function* (data) {
      yield put(getUsersSuccess(data));
    },
    getUsersFailure,
  );
}

export function* getUsersByEmail(action) {
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/user/search_by_email',
      queries: [{ name: 'email', value: action.payload }],
    },
    function* (data) {
      yield put(getUsersByEmailSuccess(data));
    },
    getUsersByEmailFailure,
  );
}

export function* putBlockUser(action) {
  yield sagaLayoutFunction(
    {
      method: 'put',
      urlTemplate: '/user/block/:userId',
      params: [{ name: 'userId', value: action.payload }],
    },
    function* (data) {
      yield put(putBlockUserSuccess(data));
    },
    putBlockUserFailure,
  );
}

export function* putUnblockUser(action) {
  yield sagaLayoutFunction(
    {
      method: 'put',
      urlTemplate: '/user/unblock/:userId',
      params: [{ name: 'userId', value: action.payload }],
    },
    function* (data) {
      yield put(putUnblockUserSuccess(data));
    },
    putUnblockUserFailure,
  );
}

export function* userWatcher() {
  yield takeEvery(getUsersByKeywordRequest, getUsersByKeyword);
  yield takeEvery(getUsersRequest, getUsers);
  yield takeEvery(getUsersByEmailRequest, getUsersByEmail);
  yield takeEvery(putBlockUserRequest, putBlockUser);
  yield takeEvery(putUnblockUserRequest, putUnblockUser);
}
