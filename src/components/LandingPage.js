import {
  clearSearch,
  fetchStockByQuery,
  selectUser,
} from "@/slice/stocksSlice";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import AddIcon from "@mui/icons-material/Add";
import ChipNavigator from "./ChipNavigator";
import AddWatchlistModal from "./AddWatchlistModal/AddWatchlistModal";

function LandingPage() {
  const results = useSelector(selectUser);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (value) => {
    setValue(value);
    dispatch(fetchStockByQuery(value));
  };

  const onClear = () => {
    setValue("");
    dispatch(clearSearch());
  };

  const onAddStock = () => {
    // do something
    onClear();
  };

  const RenderOption = (_, option) => {
    return (
      <li
        key={option.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: "0.8",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: "0.2",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {option.symbol}
          </div>
          <div
            style={{
              flex: "0.6",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              opacity: 0.7,
            }}
          >
            {option.title}
          </div>
          <div
            style={{
              flex: "0.2",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              opacity: 0.2,
            }}
          >
            {option.exchange}
          </div>
        </div>
        <Box flex={0.2}>
          <Button startIcon={<AddIcon />} color="success" onClick={() => onAddStock(option)}>
            Add
          </Button>
        </Box>
      </li>
    );
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box flex={0.3}>
        <h1 style={{textAlign: "center"}}>My Entity Watchlist</h1>
        <ChipNavigator />
        <SearchInput
        options={results}
        onChange={onChange}
        onClear={onClear}
        renderOption={RenderOption}
        inputValue={value}
        />
        <AddWatchlistModal />
      </Box>
    </Box>
  );
}

export default LandingPage;
