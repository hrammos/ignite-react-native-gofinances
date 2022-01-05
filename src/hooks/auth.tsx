import React, { useState, createContext, useContext, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type TAuthProviderProps = {
  children: ReactNode;
};

type TUser = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

type TParams = {
  access_token: string;
};

type TUseAuth = {
  user: TUser;
  signInWithGoogle: () => Promise<void>;
};


type TAuthorizationResponse = {
  params: TParams;
  type: string;
}

const AuthContext = createContext({} as TUseAuth);

export const AuthProvider = (props: TAuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<TUser>({} as TUser);

  const signInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      
      console.log('client', CLIENT_ID)
      console.log('red', REDIRECT_URI)

      const authUrl = 
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as TAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        });
      }

    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): TUseAuth  => useContext(AuthContext);