import { TodoItem } from './TodoItem';
import { useAppSelector } from '../hook';

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos.list);

  return (
    <ul style={{ listStyle: 'none' }}>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
