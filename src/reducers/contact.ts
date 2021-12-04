import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './user';

export interface IContact {
  id: number;
  type: 'duo' | 'group';
  groupName: string;
  creator: IUser;
  members: IUser[];
  invitingUsers: IUser[];
}

interface StateProps {
  activeContacts: IContact[];
  sendingContacts: IContact[];
  receivingContacts: IContact[];
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  activeContacts: [],
  sendingContacts: [],
  receivingContacts: [],
  pending: false,
  error: null,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    getContactsRequest: state => {
      state.pending = true;
      state.error = null;
    },
    getContactsSuccess: (state, action) => {
      const { activeContacts, sendingContacts, receivingContacts } =
        action.payload;

      state.activeContacts = activeContacts;
      state.sendingContacts = sendingContacts;
      state.receivingContacts = receivingContacts;

      state.pending = false;
      state.error = null;
    },
    getContactsFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const { getContactsRequest, getContactsSuccess, getContactsFailure } =
  contactSlice.actions;

export default contactSlice.reducer;
