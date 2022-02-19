import { addLastMessage, setReadMessageContact } from 'reducers/contact';
import {
  getInitMessagesRequest,
  getInitMessagesSuccess,
  getInitMessagesFailure,
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  postMessageRequest,
  postMessageSuccess,
  postMessageFailure,
  postDialogMessageRequest,
  postDialogMessageSuccess,
  postDialogMessageFailure,
  putReadMessagesRequest,
  putReadMessagesSuccess,
  putReadMessagesFailure,
} from 'reducers/message';
import { put, takeEvery } from 'redux-saga/effects';
import { sagaLayoutFunction } from 'utils/callApi';

export function* getInitMessages(action) {
  const { page, limit, contactId } = action.payload;

  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/message/contact-id/:contactId',
      params: [{ name: 'contactId', value: contactId }],
      queries: [
        { name: 'page', value: page },
        { name: 'limit', value: limit },
      ],
    },
    function* (data) {
      yield put(getInitMessagesSuccess(data));
    },
    getInitMessagesFailure,
  );
}

export function* getMessages(action) {
  const { page, limit, contactId } = action.payload;

  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/message/contact-id/:contactId',
      params: [{ name: 'contactId', value: contactId }],
      queries: [
        { name: 'page', value: page },
        { name: 'limit', value: limit },
      ],
    },
    function* (data) {
      yield put(getMessagesSuccess(data));
    },
    getMessagesFailure,
  );
}

export function* postMessage(action) {
  yield sagaLayoutFunction(
    action.payload.text
      ? {
          method: 'post',
          urlTemplate: '/message/create',
          data: action.payload,
        }
      : {
          method: 'post',
          urlTemplate: `/message/create-${action.payload.dataType}/:contactId`,
          params: [{ name: 'contactId', value: action.payload.contactId }],
          formData: action.payload.formData,
        },
    function* (data) {
      yield put(postMessageSuccess(data));
      yield put(
        addLastMessage({ message: data, increaseUnreadMessage: false }),
      );
    },
    postMessageFailure,
  );
}

export function* postDialogMessage(action) {
  yield sagaLayoutFunction(
    {
      method: 'post',
      urlTemplate: '/message/create-dialog-call',
      data: action.payload,
    },
    function* (data) {
      yield put(postDialogMessageSuccess(data));
    },
    postDialogMessageFailure,
  );
}

export function* putReadMessages(action) {
  yield sagaLayoutFunction(
    {
      method: 'put',
      urlTemplate: '/message/read-messages/:contactId',
      params: [{ name: 'contactId', value: action.payload }],
    },
    function* (data) {
      yield put(putReadMessagesSuccess(data));
      yield put(setReadMessageContact(data));
    },
    putReadMessagesFailure,
  );
}

export function* messageWatcher() {
  yield takeEvery(getInitMessagesRequest, getInitMessages);
  yield takeEvery(getMessagesRequest, getMessages);
  yield takeEvery(postMessageRequest, postMessage);
  yield takeEvery(postDialogMessageRequest, postDialogMessage);
  yield takeEvery(putReadMessagesRequest, putReadMessages);
}
