import { addWatchlist } from "@/slice/stocksSlice";
import { selectAddWatchlistModal, setWatchlistModal } from "@/slice/utilSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles";

function AddWatchlistModal() {
  const [name, setName] = useState("");
  const show = useSelector(selectAddWatchlistModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setWatchlistModal(false));
    setName("");
  };

  const onChangeWatchlistName = ({target: {value}}) => {
    setName(value);
  }

  const onCreateWatchlist = () => {
    dispatch(addWatchlist(name));
    handleClose();
  }

  return (
    <Modal
      open={show}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
        Create new watchlist
        </Typography>
        <TextField value={name} onChange={onChangeWatchlistName} id="filled-basic" fullWidth label="Enter name" sx={{margin: '20px 0'}} variant="filled" />
       <Button color="success" variant="contained" fullWidth onClick={onCreateWatchlist}>Create</Button>
      </Box>
    </Modal>
  );
}

export default AddWatchlistModal;
