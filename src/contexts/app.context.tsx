import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { User } from "../types/user.type";
import { getAccessTokenFromLS, getProfileFromLS } from "../utils/auth";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  reset: () => void;
}

export const AppContext = createContext<AppContextInterface>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  profile: null,
  setProfile: () => null,
  reset: () => null,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const initialContext = await getInitialAppContext();
      setIsAuthenticated(initialContext.isAuthenticated);
      setProfile(initialContext.profile);
    };
    fetchData();
  }, []);

  const reset = useCallback(() => {
    setIsAuthenticated(false);
    setProfile(null);
  }, []);

  const value = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      reset,
    };
  }, [isAuthenticated, setIsAuthenticated, profile, setProfile, reset]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export async function getInitialAppContext(): Promise<AppContextInterface> {
  const isAuthenticated = Boolean(await getAccessTokenFromLS());
  const profile = await getProfileFromLS();

  return {
    isAuthenticated,
    setIsAuthenticated: () => null,
    profile,
    setProfile: () => null,
    reset: () => null,
  };
}
