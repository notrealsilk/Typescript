import Editor from './components/Editor'
import React, { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  id: number;
  content: string;
}

function App() {

  // todo를 보관할 스테이트
  const [todos, setTodos] = useState<Todo[]>([]);

  // id값 초기화
  const idRef = React.useRef(0);

  // onChangeAdd 함수
  // setText의 상태를 변경해야하므로 App.tsx에 선언
  const onClickAdd = (text:string) => {
    setTodos([
      ...todos,
      {
        id: idRef.current++,
        content: text,
      },
    ]);
    // // 입력창 초기화
    // setText('');
  }

  // todos가 변경될 때마다 실행
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="App">
      <h1>Todo</h1>
      <Editor onClickAdd={onClickAdd}/>
      <div>child</div>
    </div>
  );
}

export default App
