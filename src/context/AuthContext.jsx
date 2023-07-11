import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [CSRFToken, setCSRFToken] = useState(null);

  const contextData = {
    // objects
    loading,
    error,
    user,
    CSRFToken,

    // functions
    setLoading,
    setError,
    setUser,
    setCSRFToken,
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000 * 2);
  }, []);

  useEffect(() => {
    console.log('grabbing username...');
    (async () => {
      const res = await fetch('https://pynoodler.pythonanywhere.com/get_user/', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log('data:', data.user);
  
      if (!data.user === "anonymous") {
        setUser(data.user);
      }
    })();
  }, []);

  if (loading) {
    return (
      <h1>Fake loading...</h1>
    )
  } else {
    return (
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    )
  }
}
