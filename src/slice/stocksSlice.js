import { fetchData, postData } from "@/webServices";
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
  async (stock, {rejectWithValue}) => {
    const requestBody = {
      symbols: generateSymbolArray([stock]),
      intervals: ["1day"],
      methods: METHODS_QUOTE,
    };
    const response = await postData("complex_data", requestBody);

    const { data } = await response.json();

    const [error] = data?.filter(d => d.code && d.code !== 200);

    if(error) {
      return rejectWithValue(error.message);
    }

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
    removeWatchlist: (state, { payload }) => {
      const result = [];

      for (let i = 0; i < state.watchlists.length; i++) {
        const item = state.watchlists[i];
        let lastIndex = null;

        if(lastIndex === i) {
          state.selectedWatchlistId = item.id;
          item.isSelected = true;
        }else {
          item.isSelected = false;
        }

        if(payload.id === item.id) {
          lastIndex = i + 1;
          delete state.watchlistStocks[item.id];
        }else {
          result.push;
        }

        
      }
      
      state.watchlists = result;
    },
    removeWatchlistStocks: (state, { payload }) => {
      state.watchlistStocks[state.selectedWatchlistId] = state.watchlistStocks[
        state.selectedWatchlistId
      ].filter((i) => payload.id !== i.id);
    },
    updateWatchlistStocksData: (state, { payload }) => {
      state.watchlistStocks[state.selectedWatchlistId] = state.watchlistStocks[
        state.selectedWatchlistId
      ].map((i) => {
        if(payload.symbol === i.symbol) {
          return {...i, ...payload};
        }
        return i;
      });
    }
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
      .addCase(fetchStockBySymbol.fulfilled, (state, { payload, meta: {arg} }) => {
        const mergedData = mergeComplexData(payload, arg);

        if (state.watchlistStocks[state.selectedWatchlistId]) {
          state.watchlistStocks[state.selectedWatchlistId] =
            state.watchlistStocks[state.selectedWatchlistId].concat(mergedData);
        } else {
          state.watchlistStocks[state.selectedWatchlistId] = mergedData;
        }
      })
      .addCase(fetchStockBySymbol.rejected, (_, { payload }) => {
        alert(payload);
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
  updateWatchlistStocksData,
  removeWatchlist,
} = stocksSlice.actions;

export default stocksSlice.reducer;
