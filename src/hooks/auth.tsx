import React, { createContext, useContext, ReactNode } from 'react';

type TAuthProviderProps = {
  children: ReactNode;
};

type TUser = {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

type TUseAuth = {
  user: TUser;
};

const AuthContext = createContext({} as TUseAuth);

export const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props;
  
  const user = {
    id: '1234588080',
    name: 'Henrique Ramos',
    email: 'henrique@email.com'
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): TUseAuth  => useContext(AuthContext);
