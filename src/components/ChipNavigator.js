import { selectAllWatchlists, setSelectedWatchlist } from "@/slice/stocksSlice";
import { Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { setWatchlistModal } from "@/slice/utilSlice";

function ChipNavigator() {
    const dispatch = useDispatch();
   const allList = useSelector(selectAllWatchlists);

   const onAddWatchlist = () => {
    dispatch(setWatchlistModal(true));
   }

   const onChangeWatchlist = (item) => {
    dispatch(setSelectedWatchlist(item));
   }

  return (
    <Stack direction="row" spacing={1} marginBottom="10px">
      {allList.map(i => <Chip key={i.id} className="cursor-pointer" onClick={() => onChangeWatchlist(i)} label={i.name} color="primary" variant={i.isSelected ? "filled" : "outlined"} />)}
      <Chip icon={<AddIcon />} onClick={onAddWatchlist} label="Add" className="cursor-pointer" color="success" variant="outlined" />
    </Stack>
  );
}

export default ChipNavigator;
