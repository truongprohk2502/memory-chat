import { createSlice } from '@reduxjs/toolkit';
import { RoleType } from 'constants/roles';
import { getRole, getToken } from 'utils/storage';

interface StateProps {
  token: string;
  role: RoleType;
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  token: getToken(),
  role: getRole(),
  pending: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
