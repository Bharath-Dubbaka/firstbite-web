import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  idToken: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.idToken = action.payload.idToken;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logout(state) {
      state.user = null;
      state.idToken = null;
      state.loading = false;
    },
  },
});

export const { setAuth, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
