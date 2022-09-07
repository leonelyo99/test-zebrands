import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../features/ui/uiSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
  reducer: { users: usersSlice, ui: uiSlice },
});
