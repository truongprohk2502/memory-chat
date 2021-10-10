import { createSlice } from '@reduxjs/toolkit';
import { RoleType } from 'constants/roles';
import { getRole, getToken, setRole, setToken } from 'utils/storage';

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
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  token: getToken(),
  role: getRole(),
  userInfo: null,
  verifyingEmail: false,
  sendResetPasswordSuccess: false,
  pending: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    },
    postSignInFailure: (state, action) => {
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
  },
});

export const {
  postSignInRequest,
  postSignInSuccess,
  postSignInFailure,
  postSignUpRequest,
  postSignUpSuccess,
  postSignUpFailure,
  getSendResetPasswordRequest,
  getSendResetPasswordSuccess,
  getSendResetPasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
