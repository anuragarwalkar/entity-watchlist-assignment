import { getEnvironment } from "@/utils/util.functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const createWatchlist = (name, isSelected = false) => ({
  name,
  isSelected,
  id: uuidv4().toString(),
});

const initialState = {
  searchResult: [],
  watchlists: [],
  selectedWatchlistId: "",
  wathclistSocks: {},
};

export const fetchStockByQuery = createAsyncThunk(
  "fetchStocksByQuery",
  async (symbol) => {
    const { baseUrl, apiKey } = getEnvironment();

    const response = await fetch(
      `${baseUrl}/symbol_search?symbol=${symbol}&apikey=${apiKey}`
    );

    const { data } = await response.json();

    return data;
  }
);

export const stocksSlice = createSlice({
  name: "stocksSlice",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResult = [];
    },
    addWatchlist: (state, { payload }) => {
      const isWatlistEmpty = state.watchlists.length === 0;
      state.watchlists.push(createWatchlist(payload, isWatlistEmpty));
    },
    setSelectedWatchlist: (state, { payload }) => {
      state.selectedWatchlistId = payload.id;
      state.watchlists = state.watchlists.map((item) => {
        item.isSelected = item.id === payload.id;
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStockByQuery.fulfilled, (state, action) => {
      const stocksMapped = action.payload
        .filter((v) => v.instrument_name)
        .map((d) => ({
          ...d,
          title: d.instrument_name,
          id: uuidv4().toString(),
        }));
      state.searchResult = stocksMapped;
    });
  },
});

export const selectUser = (state) => state.stocks.searchResult;

export const selectAllWatchlists = (state) => state.stocks.watchlists;

export const selectSelectedWatchlistStocks = (state) => {
  return state.stocks.wathclistSocks[state.stocks.selectedWatchlistId];
};

export const { clearSearch, addWatchlist, setSelectedWatchlist } = stocksSlice.actions;
export default stocksSlice.reducer;
