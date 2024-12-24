import React, { createContext, useContext, useReducer } from 'react';

// Initial state for contacts and messages
const initialState = {
  
  selectedContact: null, // Contact selected by the user
  messages: [], // List of messages for selected contact
};

// Action Types
const ACTIONS = {
  SET_CONTACTS: 'SET_CONTACTS',
  SELECT_CONTACT: 'SELECT_CONTACT',
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
};

// Reducer function to manage state changes
const messageReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      return { ...state, contacts: action.payload };
    case ACTIONS.SELECT_CONTACT:
      return { ...state, selectedContact: action.payload };
    case ACTIONS.SET_MESSAGES:
      return { ...state, messages: action.payload };
    case ACTIONS.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

// Create the Context
const MessageContext = createContext();

// Context Provider to wrap the application
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);
  
  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the context
export const useMessageContext = () => {
  return useContext(MessageContext);
};
