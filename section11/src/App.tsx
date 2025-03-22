import Editor from './components/Editor'
import React, { useContext, useEffect, useReducer, useRef } from 'react'
import './App.css'
import { Todo } from './types'
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

// Context 타입 정의
interface TodoDispatch {
  onClickAdd: (text: string) => void
  onClickDelete: (id: number) => void
}

// 컨텍스트 생성
export const TodoStateContext = React.createContext<Todo[] | null>(null)
export const TodoDispatchContext = React.createContext<TodoDispatch | null>(null)

// ✅ dispatch 훅: null이면 에러 발생
export function useTodoDispatch(): TodoDispatch {
  const dispatch = useContext(TodoDispatchContext)
  if (!dispatch) {
    throw new Error('Cannot find TodoProvider')
  }
  return dispatch
}

// 리듀서
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
  const [todos, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)

  const onClickAdd = (text: string) => {
    dispatch({
      type: 'Create',
      data: {
        id: idRef.current++,
        content: text,
      },
    })
  }

  const onClickDelete = (id: number) => {
    dispatch({
      type: 'Delete',
      data: { id },
    })
  }

  useEffect(() => {
    console.log(todos)
  }, [todos])

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={{ onClickAdd, onClickDelete }}>
          <Editor onClickAdd={onClickAdd} />
          <div>
            {todos.map((todo) => (
              <TodosItem key={todo.id} {...todo} />
            ))}
          </div>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App
