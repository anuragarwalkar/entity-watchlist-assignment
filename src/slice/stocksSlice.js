import { fetchData, postData } from "@/api";
import { METHODS_QUOTE } from "@/utils/constant";
import { generateSymbolArray, mergeComplexData } from "@/utils/util.functions";
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
  watchlistStocks: {},
};

export const fetchStocksByQuery = createAsyncThunk(
  "fetchStocksByQuery",
  async (symbol) => {
    const response = await fetchData("symbol_search", { symbol });

    const { data } = await response.json();

    return data;
  }
);

export const fetchStockBySymbol = createAsyncThunk(
  "fetchStockBySymbol",
  async (stock) => {
    const requestBody = {
      symbols: generateSymbolArray([stock]),
      intervals: ["1day"],
      methods: METHODS_QUOTE,
    };
    const response = await postData("complex_data", requestBody);

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
      const item = createWatchlist(payload, isWatlistEmpty);
      if (isWatlistEmpty) {
        state.selectedWatchlistId = item.id;
      }
      state.watchlists.push(item);
    },
    setSelectedWatchlist: (state, { payload }) => {
      state.selectedWatchlistId = payload.id;
      state.watchlists = state.watchlists.map((item) => {
        item.isSelected = item.id === payload.id;
        return item;
      });
    },
    removeWatchlistStocks: (state, { payload }) => {
      state.watchlistStocks[state.selectedWatchlistId] = state.watchlistStocks[
        state.selectedWatchlistId
      ].filter((i) => payload.id !== i.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocksByQuery.fulfilled, (state, action) => {
        const stocksMapped = action.payload
          .filter((v) => v.instrument_name)
          .map((d) => ({
            ...d,
            title: d.instrument_name,
            id: uuidv4().toString(),
          }));
        state.searchResult = stocksMapped;
      })
      .addCase(fetchStockBySymbol.fulfilled, (state, { payload }) => {
        const mergedData = mergeComplexData(payload);

        if (state.watchlistStocks[state.selectedWatchlistId]) {
          state.watchlistStocks[state.selectedWatchlistId] =
            state.watchlistStocks[state.selectedWatchlistId].concat(mergedData);
        } else {
          state.watchlistStocks[state.selectedWatchlistId] = mergedData;
        }
      });
  },
});

export const selectUser = (state) => state.stocks.searchResult;

export const selectAllWatchlists = (state) => state.stocks.watchlists;

export const selectSelectedWatchlistStocks = (state) => {
  const selectedStocks =
    state.stocks.watchlistStocks[state.stocks.selectedWatchlistId];

  return selectedStocks ? Object.values(selectedStocks) : [];
};

export const {
  clearSearch,
  addWatchlist,
  setSelectedWatchlist,
  removeWatchlistStocks,
} = stocksSlice.actions;

export default stocksSlice.reducer;
