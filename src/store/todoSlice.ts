import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
};

const initialState: TodosState = {
  list: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const toggled = state.list.find(todo => todo.id === action.payload);
      if (toggled) {
        toggled.completed = !toggled.completed;
      }
    },
    remove(state, action: PayloadAction<string>) {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, remove, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
