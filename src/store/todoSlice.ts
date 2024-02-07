import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>('todos/fetchTodos', async (_, { rejectWithValue }) => {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=15'
  );

  if (!res.ok) return rejectWithValue('Server error!');
  const data = await res.json();
  return data;
});

export const fetchDelete = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('todos/fetchDelete', async (id, { rejectWithValue }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'delete',
  });
  if (!res.ok) rejectWithValue('Server delete error!');

  return id;
});

export const fetchToggle = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodosState } }
>('todos/fetchToggl', async (id, { rejectWithValue, getState }) => {
  const todo = getState().todos.list.find(todo => todo.id === id);

  if (todo) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'put',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      }
    );

    if (!res.ok) return rejectWithValue('Server toggle  error!');
    const data = await res.json();
    return data as Todo;
  }
  return rejectWithValue('No such todo');
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>('todos/addNewTodo', async (text, { rejectWithValue }) => {
  const todo = {
    title: text,
    userId: 1,
    completed: false,
  };
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) return rejectWithValue('Server error, cannot post todo');
  const data = await res.json();
  return data as Todo;
});

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addNewTodo.pending, state => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchToggle.fulfilled, (state, action) => {
        const toggled = state.list.find(todo => todo.id === action.payload.id);
        if (toggled) {
          toggled.completed = !toggled.completed;
        }
      })
      .addCase(fetchDelete.fulfilled, (state, action) => {
        state.list = state.list.filter(todo => todo.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
