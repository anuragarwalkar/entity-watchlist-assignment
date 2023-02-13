import { addWatchlist } from "@/slice/stocksSlice";
import { selectAddWatchlistModal, setWatchlistModal } from "@/slice/utilSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function useModalData() {
  const [name, setName] = useState("");
  const show = useSelector(selectAddWatchlistModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setWatchlistModal(false));
    setName("");
  };

  const onChangeWatchlistName = ({ target: { value } }) => {
    setName(value);
  };

  const onCreateWatchlist = () => {
    dispatch(addWatchlist(name));
    handleClose();
  };

  return {
    show,
    handleClose,
    onCreateWatchlist,
    onChangeWatchlistName,
    name,
  };
}

export default useModalData;
