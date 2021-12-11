import {
  getContactsRequest,
  getContactsSuccess,
  getContactsFailure,
  createContactRequest,
  createContactSuccess,
  createContactFailure,
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

export function* createContact(action) {
  yield sagaLayoutFunction(
    {
      method: 'post',
      urlTemplate: '/contact/create-duo',
      data: action.payload,
    },
    function* (data) {
      yield put(createContactSuccess(data));
    },
    createContactFailure,
  );
}

export function* contactWatcher() {
  yield takeEvery(getContactsRequest, getContacts);
  yield takeEvery(createContactRequest, createContact);
}
