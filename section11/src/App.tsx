import Editor from './components/Editor'
import React, { useEffect, useReducer, useRef } from 'react'
import './App.css'
import { Todo } from './types' // types.ts 파일에서 Todo 인터페이스를 불러옴
import TodosItem from './components/Todoitem'

// 액션 타입 정의
type Action =
  | {
      type: 'Create'
      data: {
        id: number
        content: string
      }
    }
  | {
      type: 'Delete'
      data: {
        id: number
      }
    }

// 리듀서 함수
function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'Create':
      return [...state, action.data]
    case 'Delete':
      return state.filter((todo) => todo.id !== action.data.id)
    default:
      throw new Error('Unhandled action type')
  }
}

function App() {
  // useReducer로 상태 관리
  const [todos, dispatch] = useReducer(reducer, [])

  // id값 초기화
  const idRef = useRef(0)

  // 추가 버튼 클릭 시 실행
  const onClickAdd = (text: string) => {
    dispatch({
      type: 'Create',
      data: {
        id: idRef.current++,
        content: text,
      },
    })
  }

  // 삭제 버튼 클릭 시 실행
  const onClickDelete = (id: number) => {
    dispatch({
      type: 'Delete',
      data: {
        id,
      },
    })
  }

  // todos가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log(todos)
  }, [todos])

  return (
    <div className="App">
      <h1>Todo</h1>
      <Editor onClickAdd={onClickAdd} />
      <div>
        {todos.map((todo) => (
          <TodosItem key={todo.id} {...todo} onClickDelete={onClickDelete} />
        ))}
      </div>
    </div>
  )
}

export default App
