import { createSlice } from '@reduxjs/toolkit';
import { LIMIT_MESSAGES } from 'constants/limitRecords';
import { IUser } from './user';

export interface IFile {
  id: number;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface IMessage {
  id: number;
  sender: IUser;
  text: string;
  file: IFile;
  callTime: number;
  messageType: 'text' | 'file' | 'call';
  isRead: boolean;
  createdAt: string;
}

interface IReadMessage {
  contactId: number;
  messageIds: number[];
}

interface StateProps {
  messages: IMessage[];
  page: number;
  alreadyReadMessageData: IReadMessage;
  unavailableMoreMessages: boolean;
  callingUser: IUser;
  pendingPostMessage: boolean;
  errorPostMessage: string;
  pendingPostDialogMessage: boolean;
  errorPostDialogMessage: string;
  pendingGetInitMessages: boolean;
  errorGetInitMessages: string;
  pendingGetMessages: boolean;
  errorGetMessages: string;
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  messages: [],
  page: 0,
  alreadyReadMessageData: null,
  unavailableMoreMessages: false,
  callingUser: null,
  pendingPostMessage: false,
  errorPostMessage: null,
  pendingPostDialogMessage: false,
  errorPostDialogMessage: null,
  pendingGetInitMessages: false,
  errorGetInitMessages: null,
  pendingGetMessages: false,
  errorGetMessages: null,
  pending: false,
  error: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getInitMessagesRequest: (state, action) => {
      state.messages = [];
      state.unavailableMoreMessages = false;
      state.pendingGetInitMessages = true;
      state.errorGetInitMessages = null;
    },
    getInitMessagesSuccess: (state, action) => {
      const { messages } = action.payload;

      if (messages.length < LIMIT_MESSAGES) {
        state.unavailableMoreMessages = true;
      }
      state.messages = messages;

      state.pendingGetInitMessages = false;
      state.errorGetInitMessages = null;
    },
    getInitMessagesFailure: (state, action) => {
      state.pendingGetInitMessages = false;
      state.errorGetInitMessages = action.payload;
    },
    getMessagesRequest: (state, action) => {
      state.pendingGetMessages = true;
      state.errorGetMessages = null;
    },
    getMessagesSuccess: (state, action) => {
      const { messages, page } = action.payload;

      if (messages.length < LIMIT_MESSAGES) {
        state.unavailableMoreMessages = true;
      }
      state.messages = [...messages, ...state.messages];
      state.page = page;

      state.pendingGetMessages = false;
      state.errorGetMessages = null;
    },
    getMessagesFailure: (state, action) => {
      state.pendingGetMessages = false;
      state.errorGetMessages = action.payload;
    },
    postMessageRequest: (state, action) => {
      state.pendingPostMessage = true;
      state.errorPostMessage = null;
    },
    postMessageSuccess: (state, action) => {
      state.messages = [...state.messages, action.payload];

      state.pendingPostMessage = false;
      state.errorPostMessage = null;
    },
    postMessageFailure: (state, action) => {
      state.pendingPostMessage = false;
      state.errorPostMessage = action.payload;
    },
    postDialogMessageRequest: (state, action) => {
      state.pendingPostDialogMessage = true;
      state.errorPostDialogMessage = null;
    },
    postDialogMessageSuccess: (state, action) => {
      state.pendingPostDialogMessage = false;
      state.errorPostDialogMessage = null;
    },
    postDialogMessageFailure: (state, action) => {
      state.pendingPostDialogMessage = false;
      state.errorPostDialogMessage = action.payload;
    },
    putReadMessagesRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    putReadMessagesSuccess: (state, action) => {
      state.alreadyReadMessageData = action.payload;

      state.pending = false;
      state.error = null;
    },
    putReadMessagesFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    resetReadMessages: state => {
      state.alreadyReadMessageData = null;
    },
    setReadMessages: (state, action) => {
      const messageIds = action.payload;

      for (let i = 0; i < messageIds.length; i++) {
        const messageId = messageIds[i];

        const message = state.messages.find(
          message => message.id === messageId && !message.isRead,
        );

        if (message) {
          message.isRead = true;
        }
      }

      state.alreadyReadMessageData = null;

      state.pending = false;
      state.error = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setCallingUser: (state, action) => {
      state.callingUser = action.payload;
    },
  },
});

export const {
  getInitMessagesRequest,
  getInitMessagesSuccess,
  getInitMessagesFailure,
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  postMessageRequest,
  postMessageSuccess,
  postMessageFailure,
  postDialogMessageRequest,
  postDialogMessageSuccess,
  postDialogMessageFailure,
  putReadMessagesRequest,
  putReadMessagesSuccess,
  putReadMessagesFailure,
  resetReadMessages,
  setReadMessages,
  addMessage,
  setCallingUser,
} = messageSlice.actions;

export default messageSlice.reducer;
