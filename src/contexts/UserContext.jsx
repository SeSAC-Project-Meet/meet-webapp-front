import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/isTokenExpired";
import { reissueToken } from "../api/reissueToken";
import { getUserProfile } from "../api/getUserProfile";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// TODO : propType 검증 필요
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // accessToken이 없음.
      alert("No AccessToken !");
      navigate("/login");
    } else if (isTokenExpired(accessToken)) {
      reissueToken(accessToken);
    } else {
      setUser(getUserProfile(accessToken)); // TODO : return값 안정해졌음. 수정 필요
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
