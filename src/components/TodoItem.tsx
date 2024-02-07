import React from 'react';
import { useAppDispatch } from '../hook';
import { fetchDelete, fetchToggle } from '../store/todoSlice';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(fetchToggle(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(fetchDelete(id))} style={{ color: 'red' }}>
        &times;
      </span>
    </li>
  );
};
