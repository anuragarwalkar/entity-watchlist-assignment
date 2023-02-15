import ClearIcon from '@mui/icons-material/Clear';
import { Chip } from "@mui/material";
import { Fragment } from "react";

function AppChip({ onChange, name, id, isSelected, onDelete }) {
  return (
    <Fragment>
      <Chip
        deleteIcon={<ClearIcon />}
        className="cursor-pointer"
        onClick={() => onChange({id})}
        onDelete={() => onDelete({id})}
        label={name}
        color="primary"
        variant={isSelected ? "filled" : "outlined"}
      />
    </Fragment>
  );
}

export default AppChip;
