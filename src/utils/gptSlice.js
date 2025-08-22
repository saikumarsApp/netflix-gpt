import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false, // <-- this must exist
    suggestedMovieNames: null,
    suggestedResult: null,
    loading: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovies: (state, action) => {
      state.suggestedMovieNames = action.payload.movieNames;
      state.suggestedResult = action.payload.movieResults;
    },
    clearGptMovies: (state) => {
      state.suggestedMovieNames = null;
      state.suggestedResult = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  toggleGptSearchView,
  addGptMovies,
  clearGptMovies,
  startLoading,
  stopLoading,
} = gptSlice.actions;

export default gptSlice.reducer;
