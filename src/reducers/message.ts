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
  messageType: 'text' | 'file' | 'call' | 'dialog';
  isRead: boolean;
  createdAt: string;
  removedAt: string;
  remover: IUser;
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
  callTime: number;
  dialogingMessageId: number;
  callingMessageId: number;
  callingData: { sender: IUser; dialogId: number };
  postMessageTime: number;
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
  callTime: 0,
  dialogingMessageId: 0,
  callingMessageId: 0,
  callingData: null,
  postMessageTime: 0,
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
      state.postMessageTime = Date.now();
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
      state.dialogingMessageId = action.payload;
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
    putStopCallRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    putStopCallSuccess: (state, action) => {
      state.messages = [...state.messages, action.payload];
      state.postMessageTime = Date.now();
      state.dialogingMessageId = 0;
      state.callingData = null;

      state.pending = false;
      state.error = null;
    },
    putStopCallFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putEndCallRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    putEndCallSuccess: (state, action) => {
      state.messages = [...state.messages, action.payload];
      state.postMessageTime = Date.now();
      state.callTime = 0;
      state.dialogingMessageId = 0;
      state.callingMessageId = 0;
      state.callingData = null;

      state.pending = false;
      state.error = null;
    },
    putEndCallFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putStartCallRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    putStartCallSuccess: (state, action) => {
      const dialogMessage = state.messages.find(
        message => message.id === action.payload.id,
      );
      if (dialogMessage) {
        dialogMessage.messageType = 'call';
      }
      state.callingMessageId = state.callingData
        ? state.callingData.dialogId
        : state.dialogingMessageId;
      state.dialogingMessageId = 0;
      state.callingData = null;

      state.pending = false;
      state.error = null;
    },
    putStartCallFailure: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    },
    putRemoveMessageRequest: (state, action) => {
      state.pending = true;
      state.error = null;
    },
    putRemoveMessageSuccess: (state, action) => {
      const message = state.messages.find(
        message => message.id === action.payload.id,
      );
      message.removedAt = action.payload.removedAt;
      message.remover = action.payload.remover;

      state.pending = false;
      state.error = null;
    },
    putRemoveMessageFailure: (state, action) => {
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
    setCallingData: (state, action) => {
      state.callingData = action.payload;
    },
    increaseCallTime: state => {
      state.callTime = state.callTime + 1;
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
  putStopCallRequest,
  putStopCallSuccess,
  putStopCallFailure,
  putEndCallRequest,
  putEndCallSuccess,
  putEndCallFailure,
  putStartCallRequest,
  putStartCallSuccess,
  putStartCallFailure,
  putRemoveMessageRequest,
  putRemoveMessageSuccess,
  putRemoveMessageFailure,
  resetReadMessages,
  setReadMessages,
  setCallingData,
  increaseCallTime,
} = messageSlice.actions;

export default messageSlice.reducer;
