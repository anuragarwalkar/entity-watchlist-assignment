import { getEnvironment } from "@/utils/util.functions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  searchResult: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStockByQuery.fulfilled, (state, action) => {
      const stocksMapped = action.payload.filter(v => v.instrument_name).map((d) => ({
        ...d,
        title: d.instrument_name,
        id: uuidv4().toString(),
      }));
      state.searchResult = stocksMapped;
    });
  },
});

export const selectUser = (state) => state.stocks.searchResult;
export const { clearSearch } = stocksSlice.actions;
export default stocksSlice.reducer;
