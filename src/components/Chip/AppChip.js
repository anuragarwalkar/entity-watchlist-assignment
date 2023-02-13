import { Chip } from "@mui/material";
import { Fragment } from "react";

function AppChip({ onChange, name, id, isSelected }) {
  return (
    <Fragment>
      <Chip
        className="cursor-pointer"
        onClick={() => onChange({id})}
        label={name}
        color="primary"
        variant={isSelected ? "filled" : "outlined"}
      />
    </Fragment>
  );
}

export default AppChip;
