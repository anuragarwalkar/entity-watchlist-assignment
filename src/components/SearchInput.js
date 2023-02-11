import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchInput = ({ onChange, options, onClear, renderOption, inputValue }) => {
  const [showClearIcon, setShowClearIcon] = useState(false);

  const handleChange = (event) => {
    try {
      const { target: { value } } = event;
      setShowClearIcon(value !== "");
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
        disableClearable
        isOptionEqualToValue={(option, value) => option.title === value}
        renderOption={renderOption}
        open={true}
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
                // endAdornment: (
                //   <InputAdornment
                //     position="end"
                //     style={{ cursor: "pointer" }}
                //     onClick={onClear}
                //   >
                //     {showClearIcon && <ClearIcon />}
                //   </InputAdornment>
                // ),
              }}
            />
        )}
      />
    </Fragment>
  );
};

export default SearchInput;
