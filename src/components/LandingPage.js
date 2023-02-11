import {
  clearSearch,
  fetchStockByQuery,
  selectUser,
} from "@/slice/stocksSlice";
import { Box, Button, IconButton } from "@mui/material";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import AddIcon from "@mui/icons-material/Add";

function LandingPage() {
  const results = useSelector(selectUser);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  console.log("results:", results);

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
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>{option.symbol}/</Box>
          <Box>{option.title}/</Box>
          <Box>{option.exchange}</Box>
        </div>
        <Box>
          <Button startIcon={<AddIcon />} onClick={() => onAddStock(option)}>
            Add
          </Button>
        </Box>
      </li>
    );
  };

  return (
    <Fragment>
      <h1>My Watchlist</h1>
      <div style={{ width: "40%" }}>
        <SearchInput
          options={results}
          onChange={onChange}
          onClear={onClear}
          renderOption={RenderOption}
          inputValue={value}
        />
      </div>
    </Fragment>
  );
}

export default LandingPage;
