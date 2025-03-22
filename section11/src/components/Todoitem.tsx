import { Todo } from "../types";
import { useTodoDispatch } from "../App";

// Todo 타입 + 삭제 함수 포함된 props 타입을 정의
export default function Todoitem(props: Todo) {
  const dispatch = useTodoDispatch();

  const onClickButton = () => {
    dispatch.onClickDelete(props.id);
  };

  return (
    <div>
      {props.id}번 : {props.content}
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
}

