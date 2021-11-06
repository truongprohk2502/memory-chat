import { createSlice } from '@reduxjs/toolkit';
import { RoleType } from 'constants/roles';
import {
  getRole,
  getToken,
  removeRole,
  removeToken,
  setRole,
  setToken,
} from 'utils/storage';

interface IUserInfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  dob: string;
  address: string;
  avatar: string;
  accountType: 'normal' | 'google' | 'facebook';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface StateProps {
  token: string;
  role: RoleType;
  userInfo: IUserInfo;
  verifyingEmail: boolean;
  sendResetPasswordSuccess: boolean;
  initializedToken: boolean;
  updateInfoSuccess: boolean;
  pending: boolean;
  error: string;
  updateAvatarSuccess: boolean;
}

const initialState: StateProps = {
  token: getToken(),
  role: getRole(),
  userInfo: null,
  verifyingEmail: false,
  sendResetPasswordSuccess: false,
  initializedToken: false,
  updateInfoSuccess: false,
  pending: false,
  error: null,
  updateAvatarSuccess: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: state => {
      state.token = null;
      state.role = null;
      state.userInfo = null;
    },
    postSignInRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    postSignInSuccess: (state, action) => {
      const { token, role, ...userInfo } = action.payload;
      setToken(token);
      setRole(role);
      state.userInfo = userInfo;
      state.token = token;
      state.role = role;
      state.pending = false;
      state.error = null;
      state.verifyingEmail = false;
    },
    postSignInFailure: (state, action) => {
      if (state.verifyingEmail && action.payload !== 'inactive_user') {
        state.verifyingEmail = false;
      }
      state.pending = false;
      state.error = action.payload;
    },
    getGoogleSignInRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    getGoogleSignInSuccess: (state, action) => {
      const { token, role, ...userInfo } = action.payload;
      setToken(token);
      setRole(role);
      state.userInfo = userInfo;
      state.token = token;
      state.role = role;
      state.pending = false;
      state.error = null;
    },
    getGoogleSignInFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getFacebookSignInRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    getFacebookSignInSuccess: (state, action) => {
      const { token, role, ...userInfo } = action.payload;
      setToken(token);
      setRole(role);
      state.userInfo = userInfo;
      state.token = token;
      state.role = role;
      state.pending = false;
      state.error = null;
    },
    getFacebookSignInFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    postSignUpRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    postSignUpSuccess: (state, action) => {
      const { role, ...userInfos } = action.payload;
      state.verifyingEmail = true;
      state.userInfo = userInfos;
      state.role = role;
      state.pending = false;
      state.error = null;
    },
    postSignUpFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getSendResetPasswordRequest: (state, action) => {
      state.sendResetPasswordSuccess = false;
      state.pending = true;
      state.error = null;
    },
    getSendResetPasswordSuccess: state => {
      state.sendResetPasswordSuccess = true;
      state.pending = false;
      state.error = null;
    },
    getSendResetPasswordFailure: (state, action) => {
      state.sendResetPasswordSuccess = false;
      state.pending = false;
      state.error = action.payload;
    },
    getUserInfoRequest: state => {
      state.pending = true;
      state.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.initializedToken = true;
      state.pending = false;
      state.error = null;
    },
    getUserInfoFailure: (state, action) => {
      removeToken();
      removeRole();
      state.userInfo = null;
      state.token = null;
      state.role = null;
      state.initializedToken = true;
      state.pending = false;
      state.error = action.payload;
    },
    putUserInfoRequest: (state, action) => {
      state.updateInfoSuccess = false;
      state.pending = true;
      state.error = null;
    },
    putUserInfoSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.updateInfoSuccess = true;
      state.pending = false;
      state.error = null;
    },
    putUserInfoFailure: (state, action) => {
      state.updateInfoSuccess = false;
      state.pending = false;
      state.error = action.payload;
    },
    postAvatarRequest: (state, action) => {
      state.updateAvatarSuccess = false;
      state.pending = true;
      state.error = null;
    },
    postAvatarSuccess: (state, action) => {
      state.userInfo.avatar = action.payload;
      state.updateAvatarSuccess = true;
      state.pending = false;
      state.error = null;
    },
    postAvatarFailure: (state, action) => {
      state.updateAvatarSuccess = false;
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetAuthState,
  postSignInRequest,
  postSignInSuccess,
  postSignInFailure,
  getGoogleSignInRequest,
  getGoogleSignInSuccess,
  getGoogleSignInFailure,
  getFacebookSignInRequest,
  getFacebookSignInSuccess,
  getFacebookSignInFailure,
  postSignUpRequest,
  postSignUpSuccess,
  postSignUpFailure,
  getSendResetPasswordRequest,
  getSendResetPasswordSuccess,
  getSendResetPasswordFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  putUserInfoRequest,
  putUserInfoSuccess,
  putUserInfoFailure,
  postAvatarRequest,
  postAvatarSuccess,
  postAvatarFailure,
} = authSlice.actions;

export default authSlice.reducer;
