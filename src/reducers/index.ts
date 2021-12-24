import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import rootSaga from 'sagas';
import authReducer from './auth';
import userReducer from './user';
import contactReducer from './contact';
import messageReducer from './message';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  contact: contactReducer,
  message: messageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
