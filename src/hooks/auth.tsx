import React, { useState, createContext, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

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
  signInWithApple: () => Promise<void>;
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

      const authUrl = 
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as TAuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        }

        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error(error as string);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined
        }

        setUser(userLogged);
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
      }

    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      signInWithGoogle,
      signInWithApple,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): TUseAuth  => useContext(AuthContext);
