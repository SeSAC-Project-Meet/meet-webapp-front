import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import MainLogo from "./login/MainLogo";
import { CustomInputFieldWithLabel } from "./CustomInputFieldWithLabel";
import { MessageIcon } from "./icons/MessageIcon";
import { AlarmIcon } from "./icons/AlarmIcon";
import { handleUserLogout } from "../api/auth/user/handleUserLogout";
import { SearchIcon } from "./icons/SearchIcon";

export const Header = () => {
  const { user } = useUser();
  const [searchField, setSearchField] = useState("");

  const handleLoginOrRegisterButtonClick = () => {
    alert("로그인 및 회원가입 페이지로 이동합니다.");
  };

  const handleHeaderSearch = () => {
    alert(`[구현되지 않은 기능] 검색어 : ${searchField}`);
  };

  return (
    <header className="flex flex-row items-center justify-center w-full">
      <div className="flex justify-center mr-2 tems-center">
        <span className="text-[#000000] text-2xl font-normal font-primary tracking-tighter">
          spec
        </span>
        <span className="text-[#0037ff] text-2xl font-normal font-primary tracking-tighter">
          together
        </span>
      </div>

      <div className="flex items-center p-2">
        <div className="border border-solid border-[#0037ff] p-2 rounded-full flex items-center">
          <input
            className="mx-2"
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <button className="ml-2" onClick={handleHeaderSearch}>
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="flex-1 grow"></div>

      <div className="flex flex-row items-center space-x-1">
        <AlarmIcon />
        <MessageIcon />

        {user ? (
          <div className="flex flex-row items-center justify-end space-x-1">
            <span className="text-sm text-text-primary font-primary">
              환영합니다, {user.username} 님
            </span>
            <span>|</span>
            <button
              className="text-sm text-gray-500 font-primary"
              onClick={handleUserLogout}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleLoginOrRegisterButtonClick}>
              로그인 및 회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
