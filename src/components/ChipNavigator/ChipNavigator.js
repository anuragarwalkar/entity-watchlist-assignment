import { removeWatchlist, selectAllWatchlists, setSelectedWatchlist } from "@/slice/stocksSlice";
import { Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { setWatchlistModal } from "@/slice/utilSlice";
import AppChip from "../Chip/AppChip";

function ChipNavigator() {
  const dispatch = useDispatch();
  const allList = useSelector(selectAllWatchlists);

  const onAddWatchlist = () => {
    dispatch(setWatchlistModal(true));
  };

  const onChangeWatchlist = (item) => {
    dispatch(setSelectedWatchlist(item));
  };

  const onDeleteWatchList = (item) => {
    dispatch(removeWatchlist(item));
  };

  return (
    <Stack direction="row" spacing={1} marginBottom="10px">
      {allList.map((i) => (
        <AppChip
          key={i.id}
          id={i.id}
          isSelected={i.isSelected}
          name={i.name}
          onChange={onChangeWatchlist}
          onDelete={onDeleteWatchList}
        />
      ))}
      <Chip
        icon={<AddIcon />}
        onClick={onAddWatchlist}
        label="Add"
        className="cursor-pointer"
        color="success"
        variant="outlined"
      />
    </Stack>
  );
}

export default ChipNavigator;
