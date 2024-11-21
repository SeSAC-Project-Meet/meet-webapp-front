import { Header } from "../components/Header";
import MainPageCarousel from "../components/main/MainPageCarousel";

export const TestPage = () => {
  return (
    <div className="flex flex-col px-2">
      <Header />
      {/* 카테고리 및 스터디 만들기 버튼이 위치할 col */}
      <div className="flex flex-row ml-2 justify-stretch">
        <div className="flex flex-row items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <span className="font-primary">카테고리</span>
        </div>
        <div className="grow"></div>
        <div className="justify-end m-3">
          <button className="border rounded-lg p-2 border-[#0037ff] font-primary text-sm">
            + 스터디 만들기
          </button>
        </div>
      </div>

      {/* 홈페이지 정보 및 광고 캐러셀 */}
      <div className="flex flex-row p-4 space-x-4">
        {/* 광고 카드 */}
        {/* <div className="flex flex-col w-1/4 space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-md">광고1</div>
          <div className="p-6 bg-white rounded-lg shadow-md">광고2</div>
          <div className="p-6 bg-white rounded-lg shadow-md">광고3</div>
        </div> */}

        {/* 캐러셀 */}
        <MainPageCarousel />
      </div>

      {/* 공모전 정보를 보여주는 카드 섹션 */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="mb-2 text-xl font-semibold">공모전 {index + 1}</h3>
            <p className="text-gray-600">
              공모전 {index + 1}의 간단한 설명이 들어갑니다.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
