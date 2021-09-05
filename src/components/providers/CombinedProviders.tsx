import { ReactElement } from 'react';
import { CurrentUserProvider, MessagesProvider, UsersProvider } from '.';

interface CombinedProvidersProps {
  children: ReactElement;
}

export const CombinedProviders = ({ children }: CombinedProvidersProps) => {
  return (
    <UsersProvider>
      <CurrentUserProvider>
        <MessagesProvider>{children}</MessagesProvider>
      </CurrentUserProvider>
    </UsersProvider>
  );
};
