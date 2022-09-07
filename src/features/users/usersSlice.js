import { createSlice } from "@reduxjs/toolkit";
import { endLoading, startLoading } from "../ui/uiSlice";

const initialState = {
  users: [],
  searchedUsers: [],
  searchedValue: "",
  showSearched: false,
  error: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
    setSearchedValue: (state, action) => {
      state.searchedValue = action.payload;
    },
    setShowSearched: (state, action) => {
      state.showSearched = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  setSearchedUsers,
  setSearchedValue,
  setShowSearched,
  setError,
} = usersSlice.actions;

/**
 * Thunks
 */
export const fetchUsers =
  (since = 0) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await fetch(
        `https://api.github.com/users?per_page=10&since=${since}`
      );
      if (response.ok) {
        const users = await response.json();
        dispatch(setUsers(users));
        dispatch(setError(false));
      } else {
        dispatch(setError(true));
      }
    } catch {
      dispatch(setError(true));
    } finally {
      dispatch(endLoading());
    }
  };

export const fetchSearchUsers = (username) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}&per_page=10`
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(setSearchedUsers(data.items));
      dispatch(setError(false));
    } else {
      dispatch(setError(true));
    }
  } catch {
    dispatch(setError(true));
  } finally {
    dispatch(endLoading());
  }
};

export default usersSlice.reducer;
