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
    createContactRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    createContactSuccess: (state, action) => {
      state.sendingContacts = [...state.sendingContacts, action.payload];

      state.pending = false;
      state.error = null;
    },
    createContactFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    cancelContactRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    cancelContactSuccess: (state, action) => {
      state.sendingContacts = state.sendingContacts.filter(
        contact => contact.id !== action.payload.contactId,
      );

      state.pending = false;
      state.error = null;
    },
    cancelContactFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    addReceivingContact: (state, action) => {
      state.receivingContacts = [...state.receivingContacts, action.payload];
    },
    removeReceivingContact: (state, action) => {
      state.receivingContacts = state.receivingContacts.filter(
        contact => contact.id !== action.payload.contactId,
      );
    },
  },
});

export const {
  getContactsRequest,
  getContactsSuccess,
  getContactsFailure,
  createContactRequest,
  createContactSuccess,
  createContactFailure,
  cancelContactRequest,
  cancelContactSuccess,
  cancelContactFailure,
  addReceivingContact,
  removeReceivingContact,
} = contactSlice.actions;

export default contactSlice.reducer;
