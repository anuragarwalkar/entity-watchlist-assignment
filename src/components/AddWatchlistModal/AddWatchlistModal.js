import { Box, Button, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import style from "./styles";
import useModalData from "./useModalData";

function AddWatchlistModal() {
  const { show, handleClose, onCreateWatchlist, onChangeWatchlistName, name } =
    useModalData();

  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Create new watchlist
        </Typography>
        <TextField
          value={name}
          onChange={onChangeWatchlistName}
          id="filled-basic"
          fullWidth
          label="Enter name"
          sx={{ margin: "20px 0" }}
          variant="filled"
        />
        <Button
          color="success"
          variant="contained"
          fullWidth
          onClick={onCreateWatchlist}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
}

export default AddWatchlistModal;
