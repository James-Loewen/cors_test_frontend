import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../utils/authUtils";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    console.log('grabbing username...');
    (async () => {
      const data = await getUser();
      console.log('raw data:', data);
      
      if (data.user !== "anonymous") {
        console.log('data:', data.user);
        setUser(data.user);
      }

      setLoading(false);
    })();
  }, []);

  const contextData = {
    // objects
    loading,
    error,
    user,
    csrfToken,

    // functions
    setLoading,
    setError,
    setUser,
    setCsrfToken,
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    return (
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    )
  }
}
