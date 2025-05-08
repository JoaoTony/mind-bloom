// import { apiSignInEndpointResponseData } from '@/@types/api-endpoints-response';
import { apiEndpoints } from '@/constants/api-endpoints';
import { USER_ACCESS_TOKEN } from '@/constants';
import { useStorageState } from '@/hooks/useStorageState';
import { API } from '@/services/api';
import { useContext, createContext, type PropsWithChildren } from 'react';

export type AuthContextProps = {
  signIn: (email: string, passord: string, onLoading: (loading: boolean) => void) => Promise<{ statusCode:  number }>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: () => null as unknown as any,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState(USER_ACCESS_TOKEN);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password, onLoading) => {
          console.log("sss")
          const { statusCode, data } = await API.post<any>(apiEndpoints.signIn, { email, password }, onLoading)

          if(data?.access_token) {
            setSession(data.access_token);
          }

          return { statusCode }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
