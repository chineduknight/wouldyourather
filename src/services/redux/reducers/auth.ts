import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: Record<string, any> | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Record<string, any>>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { updateUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
