import {
  getUsersByKeywordRequest,
  getUsersByKeywordSuccess,
  getUsersByKeywordFailure,
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

export function* userWatcher() {
  yield takeEvery(getUsersByKeywordRequest, getUsersByKeyword);
}
