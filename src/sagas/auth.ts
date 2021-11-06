import {
  postSignInRequest,
  postSignInSuccess,
  postSignInFailure,
  postSignUpFailure,
  postSignUpRequest,
  postSignUpSuccess,
  getSendResetPasswordRequest,
  getSendResetPasswordSuccess,
  getSendResetPasswordFailure,
  getGoogleSignInRequest,
  getGoogleSignInSuccess,
  getGoogleSignInFailure,
  getFacebookSignInRequest,
  getFacebookSignInSuccess,
  getFacebookSignInFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  putUserInfoRequest,
  putUserInfoSuccess,
  putUserInfoFailure,
  postAvatarRequest,
  postAvatarSuccess,
  postAvatarFailure,
} from 'reducers/auth';
import { takeEvery, put } from 'redux-saga/effects';
import { sagaLayoutFunction } from 'utils/callApi';

export function* postSignIn(action) {
  yield sagaLayoutFunction(
    {
      method: 'post',
      urlTemplate: '/auth/signin',
      data: action.payload,
    },
    function* (data) {
      yield put(postSignInSuccess(data));
    },
    postSignInFailure,
  );
}

export function* getGoogleSignIn(action) {
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/auth/signin-google',
      queries: [{ name: 'token', value: action.payload }],
    },
    function* (data) {
      yield put(getGoogleSignInSuccess(data));
    },
    getGoogleSignInFailure,
  );
}

export function* getFacebookSignIn(action) {
  const { token, id } = action.payload;
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/auth/signin-facebook',
      queries: [
        { name: 'id', value: id },
        { name: 'token', value: token },
      ],
    },
    function* (data) {
      yield put(getFacebookSignInSuccess(data));
    },
    getFacebookSignInFailure,
  );
}

export function* postSignUp(action) {
  yield sagaLayoutFunction(
    {
      method: 'post',
      urlTemplate: '/auth/signup',
      data: action.payload,
    },
    function* (data) {
      yield put(postSignUpSuccess(data));
    },
    postSignUpFailure,
  );
}

export function* getSendResetPassword(action) {
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/auth/forgot-password',
      queries: [{ name: 'email', value: action.payload }],
    },
    function* () {
      yield put(getSendResetPasswordSuccess());
    },
    getSendResetPasswordFailure,
  );
}

export function* getUserInfo(action) {
  yield sagaLayoutFunction(
    {
      method: 'get',
      urlTemplate: '/auth/get-info',
    },
    function* (data) {
      yield put(getUserInfoSuccess(data));
    },
    getUserInfoFailure,
  );
}

export function* putUserInfo(action) {
  yield sagaLayoutFunction(
    {
      method: 'put',
      urlTemplate: '/auth/update-info',
      data: action.payload,
    },
    function* (data) {
      yield put(putUserInfoSuccess(data));
    },
    putUserInfoFailure,
  );
}

export function* postAvatar(action) {
  yield sagaLayoutFunction(
    {
      method: 'post',
      urlTemplate: '/auth/upload-avatar',
      formData: action.payload,
    },
    function* (data) {
      yield put(postAvatarSuccess(data));
    },
    postAvatarFailure,
  );
}

export function* authWatcher() {
  yield takeEvery(postSignInRequest, postSignIn);
  yield takeEvery(getGoogleSignInRequest, getGoogleSignIn);
  yield takeEvery(getFacebookSignInRequest, getFacebookSignIn);
  yield takeEvery(postSignUpRequest, postSignUp);
  yield takeEvery(getSendResetPasswordRequest, getSendResetPassword);
  yield takeEvery(getUserInfoRequest, getUserInfo);
  yield takeEvery(putUserInfoRequest, putUserInfo);
  yield takeEvery(postAvatarRequest, postAvatar);
}
