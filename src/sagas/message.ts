import { addLastMessage } from 'reducers/contact';
import {
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  postMessageRequest,
  postMessageSuccess,
  postMessageFailure,
} from 'reducers/message';
import { put, takeEvery } from 'redux-saga/effects';
import { sagaLayoutFunction } from 'utils/callApi';

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
    {
      method: 'post',
      urlTemplate: '/message/create',
      data: action.payload,
    },
    function* (data) {
      yield put(postMessageSuccess(data));
      yield put(addLastMessage(data));
    },
    postMessageFailure,
  );
}

export function* messageWatcher() {
  yield takeEvery(getMessagesRequest, getMessages);
  yield takeEvery(postMessageRequest, postMessage);
}
