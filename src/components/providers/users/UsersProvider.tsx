import React, { createContext, ReactElement } from 'react';
import { store } from '../../../assets/store';
import { UserProps } from '../../../assets/types';

interface UsersProviderProps {
  children: ReactElement;
}

export const UsersContext = createContext<UserProps[] | null>(null);

export const useUsers = () => {
  const context = React.useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};

export const UsersProvider = ({ children }: UsersProviderProps) => {
  return (
    <UsersContext.Provider value={store.users}>
      {children}
    </UsersContext.Provider>
  );
};
