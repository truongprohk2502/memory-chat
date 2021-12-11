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
}

interface StateProps {
  searchUsers: IUser[];
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  searchUsers: [],
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
  },
});

export const {
  getUsersByKeywordRequest,
  getUsersByKeywordSuccess,
  getUsersByKeywordFailure,
} = userSlice.actions;

export default userSlice.reducer;
