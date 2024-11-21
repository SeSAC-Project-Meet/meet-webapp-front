import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { MessageIcon } from "../icons/MessageIcon";
import { AlarmIcon } from "../icons/AlarmIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { UserIcon } from "../icons/UserIcon";

export const Header = () => {
  const { user } = useUser();
  const [searchField, setSearchField] = useState("");

  const handleHeaderSearch = () => {
    alert(`[구현되지 않은 기능] 검색어 : ${searchField}`);
  };

  return (
    <div className="flex flex-row w-full h-24 bg-none">
      {/* 헤더 로고 */}
      <div className="px-[1.88rem] py-[2rem] bg-none">
        <span className="items-center justify-center text-4xl font-extrabold font-gmarket">
          spec
        </span>
        <span className="items-center justify-center text-4xl font-extrabold font-gmarket text-brand-color-jinhan-blue">
          together
        </span>
      </div>

      {/* 검색창 */}
      <div className="mx-[1.37rem] my-[1.41rem] w-[26rem] flex flex-row border border-[#223B8B] rounded-full bg-none">
        <input
          placeholder="검색어를 입력하세요"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="ml-[0.62rem] my-[0.56rem] px-4 py-3 bg-none flex-grow font-light text-[1.125rem] focus:outline-none"
        />
        <div
          className="mr-[2rem] flex justify-center items-center"
          onClick={handleHeaderSearch}
        >
          <SearchIcon />
        </div>
      </div>
      {/* 빈공간 채워주기 */}
      <div className="flex-grow"></div>
      {/* 회원정보 */}
      <div className="mr-[1.53rem] flex flex-row items-center">
        <div className="flex flex-row items-center justify-center ml-3 space-x-[0.81rem]">
          <AlarmIcon />
          <MessageIcon />
          <UserIcon />
        </div>
        <div className="ml-[0.81rem] flex flex-row items-center space-x-1">
          <span className="font-basic tracking-tighter text-[#5C5C5C] font-medium text-xl">
            환영합니다,
          </span>
          <span className="font-basic tracking-tight text-[#000000] font-semibold text-2xl">
            {user.username}
          </span>
          <span className="font-basic tracking-tighter text-[#5C5C5C] font-medium text-xl">
            님.
          </span>
        </div>
      </div>
    </div>
  );
};
