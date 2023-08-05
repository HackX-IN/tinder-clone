import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../../firebase";

import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);
    setLoading(false);
  }
  const Signout = () => {
    auth.signOut().then(
      () => console.log("User signed out!"),

      setLoading(false)
    );
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);
  const authContextValue = useMemo(
    () => ({
      user,
      initializing,
      setUser,
      loading,
      Signout,
      setLoading,
    }),
    [user, initializing]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
