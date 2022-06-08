import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "type";

export interface AuthState {
  user: IUser | null;
  users: Record<string, IUser> | null;
  loading: Boolean;
}

const initialState: AuthState = {
  user: null,
  users: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    updateAllUsers: (state, action: PayloadAction<Record<string, any>>) => {
      state.users = action.payload;
      state.loading = false;
    },
    resetUser: (state) => {
      state.user = null;
    },
    updateUserQuestion: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser, resetUser, updateAllUsers, updateUserQuestion } = authSlice.actions;

export default authSlice.reducer;
