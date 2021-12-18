import {
  getContactsRequest,
  getContactsSuccess,
  getContactsFailure,
  createContactRequest,
  createContactSuccess,
  createContactFailure,
  cancelContactRequest,
  cancelContactSuccess,
  cancelContactFailure,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactFailure,
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

export function* cancelContact(action) {
  yield sagaLayoutFunction(
    {
      method: 'delete',
      urlTemplate: '/contact/cancel-duo/:contactId',
      params: [{ name: 'contactId', value: action.payload }],
    },
    function* (data) {
      yield put(cancelContactSuccess(data));
    },
    cancelContactFailure,
  );
}

export function* deleteContact(action) {
  yield sagaLayoutFunction(
    {
      method: 'delete',
      urlTemplate: '/contact/delete-duo/:contactId',
      params: [{ name: 'contactId', value: action.payload }],
    },
    function* (data) {
      yield put(deleteContactSuccess(data));
    },
    deleteContactFailure,
  );
}

export function* contactWatcher() {
  yield takeEvery(getContactsRequest, getContacts);
  yield takeEvery(createContactRequest, createContact);
  yield takeEvery(cancelContactRequest, cancelContact);
  yield takeEvery(deleteContactRequest, deleteContact);
}
