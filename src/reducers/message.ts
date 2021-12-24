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
  pending: boolean;
  error: string;
}

const initialState: StateProps = {
  messages: [],
  page: 0,
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
  },
});

export const { getMessagesRequest, getMessagesSuccess, getMessagesFailure } =
  messageSlice.actions;

export default messageSlice.reducer;
