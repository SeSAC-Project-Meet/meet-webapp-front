import { createContext, useState, useContext, useEffect } from "react";
import useUserProfile from "../hooks/useUserProfile";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// TODO : propType 검증 필요
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { userProfile } = useUserProfile();

  useEffect(() => {
    if (userProfile) {
      setUser(() => userProfile);
      console.log("useEffect User: ", userProfile);
    }
  }, [userProfile, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
