import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { Fragment } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearchInput from "./useSearchInput";
import ClearIcon from '@mui/icons-material/Clear';

const SearchInput = ({ onChange, options, onClear, renderOption, inputValue }) => {
  const { handleChange, showClearIcon, allList } = useSearchInput({onChange})

  return (
    <Fragment>
      <Autocomplete
        freeSolo
        disabled={allList.length === 0}
        options={options}
        inputValue={inputValue}
        onInputChange={handleChange}
        getOptionLabel={(option) => option?.title}
        disableClearable
        isOptionEqualToValue={(option, value) => option.title === value}
        renderOption={renderOption}
        filterOptions={(options) => options}
        renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Search & Add stocks"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: "pointer" }}
                    onClick={onClear}
                  >
                    {showClearIcon && <ClearIcon />}
                  </InputAdornment>
                ),
              }}
            />
        )}
      />
    </Fragment>
  );
};

export default SearchInput;
