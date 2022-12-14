import { createSlice } from "@reduxjs/toolkit";
import { endLoading, startLoading } from "../ui/uiSlice";

const initialState = {
  repositories: [],
  searchedRepositories: [],
  searchedValue: "",
  showSearched: false,
  error: false,
};

export const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    setRepositories: (state, action) => {
      state.repositories = action.payload;
    },
    setSearchedRepositories: (state, action) => {
      state.searchedRepositories = action.payload;
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
  setRepositories,
  setSearchedRepositories,
  setSearchedValue,
  setShowSearched,
  setError,
} = repositoriesSlice.actions;

/**
 * Thunks
 */
export const fetchRepositories =
  (since = 0) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await fetch(
        `https://api.github.com/repositories?since=${since}`
      );
      if (response.ok) {
        const repositories = await response.json();
        dispatch(setRepositories(repositories));
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

export const fetchSearchRepositories = (username) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${username}&per_page=10`
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(setSearchedRepositories(data.items));
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

export default repositoriesSlice.reducer;
