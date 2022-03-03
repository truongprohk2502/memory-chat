import { createSlice } from '@reduxjs/toolkit';

export type AccountType = 'normal' | 'google' | 'facebook';
export type GenderType = 'male' | 'female';

export interface IUser {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  gender: GenderType;
  phone: string;
  dob: string;
  address: string;
  avatar: string;
  accountType: AccountType;
  isActive: boolean;
  isOnline: boolean;
}

interface StateProps {
  searchUsers: IUser[];
  users: IUser[];
  pageCount: number;
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  searchUsers: [],
  users: [],
  pageCount: 0,
  pending: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsersByKeywordRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    getUsersByKeywordSuccess: (state, action) => {
      state.searchUsers = action.payload;
      state.pending = false;
      state.error = null;
    },
    getUsersByKeywordFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    getUsersRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      const { users, pageCount } = action.payload;
      state.users = users;
      state.pageCount = pageCount;
      state.pending = false;
      state.error = null;
    },
    getUsersFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUsersByKeywordRequest,
  getUsersByKeywordSuccess,
  getUsersByKeywordFailure,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
