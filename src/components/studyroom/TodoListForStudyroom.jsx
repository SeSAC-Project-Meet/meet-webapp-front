import { DubogiButton } from "../DubogiButton";
import { TodoCheckBox } from "../icons/TodoCheckBox";
import { VerticalLine } from "../VerticalLine";

export const TodoListForStudyroom = () => {
  const todos = [
    {
      id: 1,
      title: "스터디룸1 예약하기",
      specific: "스터디룸 예약하기",
      isDone: false,
      memberDone: 1,
      memberTotal: 3,
      deadline: 2,
    },
    {
      id: 2,
      title: "스터디룸2 예약하기",
      specific: "스터디룸 예약하기",
      isDone: true,
      memberDone: 3,
      memberTotal: 3,
      deadline: 2,
    },
    {
      id: 3,
      title: "스터디룸3 예약하기",
      specific: "스터디룸 예약하기",
      isDone: false,
      memberDone: 2,
      memberTotal: 3,
      deadline: 2,
    },
    {
      id: 4,
      title: "스터디룸4 예약하기",
      specific: "스터디룸 예약하기",
      isDone: false,
      memberDone: 1,
      memberTotal: 3,
      deadline: 2,
    },
    {
      id: 5,
      title: "스터디룸5 예약하기",
      specific: "스터디룸 예약하기",
      isDone: false,
      memberDone: 2,
      memberTotal: 3,
      deadline: 2,
    },
    {
      id: 6,
      title: "스터디룸6 예약하기",
      specific: "스터디룸 예약하기",
      isDone: true,
      memberDone: 2,
      memberTotal: 3,
      deadline: 12,
    },
  ];

  return (
    <div className="flex flex-col overflow-y-auto">
      {/* 투두리스트 제목 부분 */}
      <div className="flex flex-row items-center justify-between flex-none w-full border-b border-black">
        <span className="font-pretendard font-normal text-[1.375rem] tracking-tight">
          todo list
        </span>
        <DubogiButton />
      </div>

      {/* 투두리스트 내용 부분 */}
      <div className="flex flex-col flex-grow mt-3 space-y-4 overflow-y-auto h-fit">
        {todos.map((todo) => (
          <div
            className="flex flex-row items-center w-full font-pretendard"
            key={todo.id}
          >
            <TodoCheckBox isChecked={todo.isDone} />
            <span className="ml-[0.62rem] text-lg font-normal tracking-tight">
              {todo.title}
            </span>
            <span className="flex-grow"></span>
            <VerticalLine />
            <span className="text-lg font-semibold">D-{todo.deadline}</span>
            <span className="ml-2 text-lg font-semibold">
              {todo.memberDone}/{todo.memberTotal}
            </span>
            <span className="ml-1 text-sm font-normal">명 완료</span>
          </div>
        ))}
      </div>
    </div>
  );
};
