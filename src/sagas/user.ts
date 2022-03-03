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
      console.log(data);

      yield put(getUsersByEmailSuccess(data));
    },
    getUsersByEmailFailure,
  );
}

export function* userWatcher() {
  yield takeEvery(getUsersByKeywordRequest, getUsersByKeyword);
  yield takeEvery(getUsersRequest, getUsers);
  yield takeEvery(getUsersByEmailRequest, getUsersByEmail);
}
