import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchInput = ({ onChange, options, onClear, renderOption, inputValue }) => {
  const [showClearIcon, setShowClearIcon] = useState("none");

  const handleChange = (event) => {
    try {
      const { target: { value } } = event;
      setShowClearIcon(value === "" ? "none" : "flex");
      onChange(value); 
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <Fragment>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={handleChange}
        getOptionLabel={(option) => option?.title}
        isOptionEqualToValue={(option, value) => option.title === value}
        renderOption={renderOption}
        filterOptions={(options) => options}
        renderInput={(params) => (
            <TextField
              {...params}
              label="Search & Add stocks"
              variant="outlined"
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
                    style={{ display: showClearIcon, cursor: "pointer" }}
                    onClick={onClear}
                  >
                    <ClearIcon />
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
