import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""   
  );


  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  const signout = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
