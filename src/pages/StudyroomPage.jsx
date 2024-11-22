import { StudyroomInfo } from "../components/studyroom/StudyroomInfo";
import { CalendarForStudyroom } from "../components/studyroom/CalendarForStudyroom";

export const StudyroomPage = () => {
  return (
    <div className="flex flex-row w-full h-full mt-12">
      <div className="flex flex-col w-3/5 h-full overflow-y-auto">
        <StudyroomInfo />
        {/* 하단 캘린더 */}
        <CalendarForStudyroom />
      </div>
      <div className="flex-grow">채팅방 들어올 자리</div>
    </div>
  );
};
