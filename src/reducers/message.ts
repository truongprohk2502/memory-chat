import { createSlice } from '@reduxjs/toolkit';
import { LIMIT_MESSAGES } from 'constants/limitRecords';
import { IUser } from './user';

export interface IFile {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface IMessage {
  id: number;
  sender: IUser;
  text: string;
  file: IFile;
  isRead: boolean;
  createdAt: string;
}

interface StateProps {
  messages: IMessage[];
  page: number;
  unavailableMoreMessages: boolean;
  pendingPostMessage: boolean;
  errorPostMessage: string;
  pendingGetInitMessages: boolean;
  errorGetInitMessages: string;
  pendingGetMessages: boolean;
  errorGetMessages: string;
}

const initialState: StateProps = {
  messages: [],
  page: 0,
  unavailableMoreMessages: false,
  pendingPostMessage: false,
  errorPostMessage: null,
  pendingGetInitMessages: false,
  errorGetInitMessages: null,
  pendingGetMessages: false,
  errorGetMessages: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getInitMessagesRequest: (state, action) => {
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
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
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
  addMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
