import { createContext, useState, useContext } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// TODO : propType 검증 필요
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
