import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbar';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});