import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { InputField } from './components/InputField';
import { addTodo } from './store/todoSlice';
import { useAppDispatch } from './hook';

function App() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(addTodo(text));
    setText('');
  };

  return (
    <>
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      <TodoList />
    </>
  );
}

export default App;
