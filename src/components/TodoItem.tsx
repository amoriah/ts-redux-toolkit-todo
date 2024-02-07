import React from 'react';
import { useAppDispatch } from '../hook';
import { remove, toggleTodo } from '../store/todoSlice';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(remove(id));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodo(id))}
      />
      <span>{title}</span>
      <span onClick={removeTask} style={{ color: 'red' }}>
        &times;
      </span>
    </li>
  );
};
