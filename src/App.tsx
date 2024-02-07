import { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { InputField } from './components/InputField';
import { addNewTodo, fetchTodos } from './store/todoSlice';
import { useAppDispatch, useAppSelector } from './hook';

function App() {
  const [text, setText] = useState('');
  const { error, loading } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <InputField 
      text={text} 
      handleInput={setText} 
      handleSubmit={addTask} 
      />
      {loading && <h1>loading...</h1>}
      {error && <h2>Error: {error}</h2>}
      <TodoList />
    </>
  );
}

export default App;
