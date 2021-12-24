import {
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
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

export function* messageWatcher() {
  yield takeEvery(getMessagesRequest, getMessages);
}
