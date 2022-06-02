import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/auth";
import questionReducer from "./reducers/questions";

const store = configureStore({
  reducer: {
    auth: userReducer,
    questions: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
