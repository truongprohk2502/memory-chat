import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from './message';
import { IUser } from './user';

export interface IContact {
  id: number;
  type: 'duo' | 'group';
  groupName: string;
  creator: IUser;
  members: IUser[];
  invitingUsers: IUser[];
  lastMessage: IMessage;
  unreadMessagesTotal: number;
}

interface StateProps {
  activeContacts: IContact[];
  sendingContacts: IContact[];
  receivingContacts: IContact[];
  selectedContact: IContact;
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  activeContacts: [],
  sendingContacts: [],
  receivingContacts: [],
  selectedContact: null,
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
    confirmContactRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    confirmContactSuccess: (state, action) => {
      const approvedContact = state.receivingContacts.find(
        contact => contact.id === action.payload.contactId,
      );
      const receiver = approvedContact?.invitingUsers?.[0];

      if (receiver) {
        approvedContact.members = [...approvedContact.members, receiver];
        approvedContact.invitingUsers = [];
        state.activeContacts = [...state.activeContacts, approvedContact];
        state.receivingContacts = state.receivingContacts.filter(
          contact => contact.id !== action.payload.contactId,
        );
      }

      state.pending = false;
      state.error = null;
    },
    confirmContactFailure: (state, action) => {
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
    deleteContactRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    deleteContactSuccess: (state, action) => {
      state.receivingContacts = state.receivingContacts.filter(
        contact => contact.id !== action.payload.contactId,
      );
      state.pending = false;
      state.error = null;
    },
    deleteContactFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    unfriendContactRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    unfriendContactSuccess: (state, action) => {
      state.activeContacts = state.activeContacts.filter(
        contact => contact.id !== action.payload.contactId,
      );

      if (state.selectedContact?.id === action.payload.contactId) {
        state.selectedContact = null;
      }

      state.pending = false;
      state.error = null;
    },
    unfriendContactFailure: (state, action) => {
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
    removeSendingContact: (state, action) => {
      state.sendingContacts = state.sendingContacts.filter(
        contact => contact.id !== action.payload.contactId,
      );
    },
    addApprovedContact: (state, action) => {
      const approvedContact = state.sendingContacts.find(
        contact => contact.id === action.payload.contactId,
      );
      const receiver = approvedContact?.invitingUsers?.[0];
      if (receiver) {
        approvedContact.members = [...approvedContact.members, receiver];
        approvedContact.invitingUsers = [];
        state.activeContacts = [...state.activeContacts, approvedContact];
        state.sendingContacts = state.sendingContacts.filter(
          contact => contact.id !== action.payload.contactId,
        );
      }
    },
    removeActiveContact: (state, action) => {
      state.activeContacts = state.activeContacts.filter(
        contact => contact.id !== action.payload.contactId,
      );
      if (state.selectedContact?.id === action.payload.contactId) {
        state.selectedContact = null;
      }
    },
    changeSelectedContact: (state, action) => {
      state.selectedContact = state.activeContacts.find(
        contact => contact.id === action.payload,
      );
    },
    addLastMessage: (state, action) => {
      const contact = state.activeContacts.find(
        contact => contact.id === action.payload?.contact?.id,
      );
      if (contact) {
        contact.lastMessage = action.payload;
        contact.unreadMessagesTotal++;
      }
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
  confirmContactRequest,
  confirmContactSuccess,
  confirmContactFailure,
  cancelContactRequest,
  cancelContactSuccess,
  cancelContactFailure,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactFailure,
  unfriendContactRequest,
  unfriendContactSuccess,
  unfriendContactFailure,
  addReceivingContact,
  removeReceivingContact,
  removeSendingContact,
  addApprovedContact,
  removeActiveContact,
  changeSelectedContact,
  addLastMessage,
} = contactSlice.actions;

export default contactSlice.reducer;
