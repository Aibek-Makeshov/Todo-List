import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './todos/todosSlice';
import categorySlice from './category/categorySlice';

const store = configureStore({
  reducer: {
    todos: todosSlice,
    categories: categorySlice,
  },
});

export default store;
