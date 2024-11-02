import { createContext, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/isTokenExpired";
import { reissueToken } from "../api/reissueToken";
import { getUserProfile } from "../api/getUserProfile";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// TODO : propType 검증 필요
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  // const navigate = useNavigate();
  // const location = useLocation();

  // const getCookieValue = (name) => {
  //   const value = `; ${document.cookie}`; // 쿠키 문자열 앞에 세미콜론 추가
  //   const parts = value.split(`; ${name}=`); // 이름을 기준으로 분리
  //   if (parts.length === 2) return parts.pop().split(";").shift(); // 값을 반환
  //   return null; // 쿠키가 없으면 null 반환
  // };

  // useEffect(() => {
  //   const accessToken = getCookieValue("MEET_ACCESS_TOKEN");
  //   if (!accessToken) {
  //     // 현재 경로가 /login 또는 /register가 아닐 경우
  //     if (location.pathname !== "/login" && location.pathname !== "/register") {
  //       alert("No AccessToken!");
  //       navigate("/login");
  //     }
  //   }
  //   // else if (isTokenExpired(accessToken)) { // TODO : 일단 accessToken만 ..
  //   //   reissueToken(accessToken);
  //   // }
  //   else {
  //     const userWithToken = getUserProfile(accessToken);
  //     setUser(userWithToken); // TODO : return값 안정해졌음. 수정 필요
  //     console.log("UserProvider useEffect : ", userWithToken);
  //   }
  // }, [navigate]);
  useEffect(() => {
    setUser(getUserProfile());
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
