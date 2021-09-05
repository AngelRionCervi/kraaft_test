import React, { createContext, ReactElement } from 'react';
import { store } from '../../../assets/store';
import { UserProps } from '../../../assets/types';

interface CurrentUserProviderProps {
  children: ReactElement;
}

export const CurrentUserContext = createContext<UserProps | null>(null);

export const useCurrentUser = () => {
  const context = React.useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};

export const CurrentUserProvider = ({ children }: CurrentUserProviderProps) => {
  const currentUser = store.users.find(
    (user) => user.id === store.currentUserId,
  );
  return (
    <CurrentUserContext.Provider value={currentUser ?? null}>
      {children}
    </CurrentUserContext.Provider>
  );
};
