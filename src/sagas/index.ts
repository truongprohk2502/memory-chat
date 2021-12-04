import { all } from 'redux-saga/effects';
import { authWatcher } from './auth';
import { userWatcher } from './user';
import { contactWatcher } from './contact';

export default function* rootSaga() {
  yield all([authWatcher(), userWatcher(), contactWatcher()]);
}
