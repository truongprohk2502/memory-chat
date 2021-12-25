import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './user';

export interface IMessage {
  id: number;
  sender: IUser;
  text: string;
  isRead: boolean;
  createdAt: string;
}

interface StateProps {
  messages: IMessage[];
  page: number;
  pendingPostMessage: boolean;
  errorPostMessage: string;
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  messages: [],
  page: 0,
  pendingPostMessage: false,
  errorPostMessage: null,
  pending: false,
  error: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getMessagesRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    getMessagesSuccess: (state, action) => {
      const { messages, page } = action.payload;

      state.messages = messages;
      state.page = page;

      state.pending = false;
      state.error = null;
    },
    getMessagesFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
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
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  postMessageRequest,
  postMessageSuccess,
  postMessageFailure,
  addMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
