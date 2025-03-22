import React, {useState } from 'react';
import { useTodoDispatch } from '../App';

// props의 타입 정의
interface EditorProps {
  onClickAdd: (text: string) => void;
}

export default function Editor(props: EditorProps) {

    const dispatch = useTodoDispatch();

    // useState = 제네릭 함수
    // useState의 인자로는 상태의 초기값을 전달..()에 아무 값도 없으면 undefined으로 추론됨
    // 즉, useState() 인자의 초기값으로 '' 와 같이 인자를 할당을 권장
    const [text, setText] = useState('');

    // e: React.ChangeEvent<HTMLInputElement> = 이벤트 객체의 타입을 명시
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    };

    const onClickButton = () => {
      dispatch?.onClickAdd(text);
      // 입력창 초기화
      setText('');  
    };

  return (
    <div>
      {/* input 태그의 value 속성에 text 상태를 할당하면 text에 저장 */}
      <input value={text} onChange={onChangeInput} />
      <button onClick={onClickButton}>추가</button>
    </div>
    );
  }
  