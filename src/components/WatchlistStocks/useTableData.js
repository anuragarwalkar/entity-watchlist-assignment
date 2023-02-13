import { removeWatchlistStocks, selectSelectedWatchlistStocks } from "@/slice/stocksSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useTableData () {
    const allSelectedSocks = useSelector(selectSelectedWatchlistStocks);
  const [rows, setRowsData] = useState([]);
  const dispatch = useDispatch();

  const createData = ({price, name, fifty_two_week, ...rest}) =>  {
    return { company: name, marketPrice: price, low: fifty_two_week.low, high: fifty_two_week.high, ...rest };
  }

  const removeStock = (row) => {
    dispatch(removeWatchlistStocks(row))
  }

  useEffect(() => {
    setRowsData(allSelectedSocks.map(createData));
  }, [allSelectedSocks]);

  const convertToFixed = (strNumber) => {
    return parseFloat(strNumber).toFixed(2)
  }

  return {convertToFixed, rows, removeStock}
}

export default useTableData;