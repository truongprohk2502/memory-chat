import { all } from 'redux-saga/effects';
import { authWatcher } from './auth';
import { userWatcher } from './user';
import { contactWatcher } from './contact';
import { messageWatcher } from './message';

export default function* rootSaga() {
  yield all([authWatcher(), userWatcher(), contactWatcher(), messageWatcher()]);
}
