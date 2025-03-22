import { Todo } from "../types";

// Todo 타입 + 삭제 함수 포함된 props 타입을 정의
interface TodoItemProps extends Todo {
  onClickDelete: (id: number) => void;
}

// 타입을 TodoItemProps로 지정
export default function Todoitem(props: TodoItemProps) {
  const onClickButton = () => {
    props.onClickDelete(props.id);
  };

  return (
    <div>
      {props.id}번 : {props.content}
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
}
