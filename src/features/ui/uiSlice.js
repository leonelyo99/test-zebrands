import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    }
  },
});

export const { startLoading, endLoading } = uiSlice.actions;

export default uiSlice.reducer;
