import {
  getContactsRequest,
  getContactsSuccess,
  getContactsFailure,
} from 'reducers/contact';
import { takeEvery, put } from 'redux-saga/effects';
import { sagaLayoutFunction } from 'utils/callApi';

export function* getContacts(action) {
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/contact/get-contacts',
    },
    function* (data) {
      yield put(getContactsSuccess(data));
    },
    getContactsFailure,
  );
}

export function* contactWatcher() {
  yield takeEvery(getContactsRequest, getContacts);
}
