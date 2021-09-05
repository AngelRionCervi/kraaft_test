import React, {
  createContext,
  ReactElement,
  useReducer,
  useContext,
} from 'react';
import { store } from '../../../assets/store';
import { MessageProps } from '../../../assets/types';

interface MessagesProviderProps {
  children: ReactElement;
}

// complete for other actions
type MessageAction = { type: 'newMessage'; payload: MessageProps };

const MessagesContext = createContext<{
  messages: MessageProps[];
  dispatch: React.Dispatch<MessageAction>;
} | null>(null);

const messagesReducer = (state: MessageProps[], action: MessageAction) => {
  const { type, payload } = action;

  switch (type) {
    case 'newMessage':
      return [...state, payload];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === null) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [state, dispatch] = useReducer(messagesReducer, store.messages);

  return (
    <MessagesContext.Provider value={{ messages: state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
