import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddWatchlistModal: false,
};

export const utilSlice = createSlice({
  name: "utilSlice",
  initialState,
  reducers: {
    setWatchlistModal: (state, action) => {
      state.showAddWatchlistModal = action.payload;
    },
  },
});

export const selectAddWatchlistModal = (state) =>
  state.utils.showAddWatchlistModal;

export const { setWatchlistModal } = utilSlice.actions;
export default utilSlice.reducer;
