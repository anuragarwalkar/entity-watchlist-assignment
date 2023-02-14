import {
  removeWatchlistStocks,
  selectSelectedWatchlistStocks,
} from "@/slice/stocksSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

function useTableData() {
  const allSelectedSocks = useSelector(selectSelectedWatchlistStocks);
  const [rows, setRowsData] = useState([]);
  const dispatch = useDispatch();

  const createData = ({ price, name, fifty_two_week, ...rest }) => {
    return {
      company: name,
      marketPrice: price,
      low: fifty_two_week.low,
      high: fifty_two_week.high,
      ...rest,
    };
  };

  const removeStock = (row) => {
    dispatch(removeWatchlistStocks(row));
  };

  useEffect(() => {
    setRowsData(allSelectedSocks.map(createData));
  }, [allSelectedSocks]);

  const convertToFixed = (strNumber) => {
    return parseFloat(strNumber).toFixed(2);
  };

  const columns = [
    {
      field: "company",
      headerName: "Company",
      width: 120,
    },
    {
      field: "marketPrice",
      headerName: "Market Price",
      renderCell: (params) => {
        return <Fragment>${convertToFixed(params.row.marketPrice)}</Fragment>;
      },
    },
    {
      field: "low",
      headerName: "52W low",
      renderCell: (params) => {
        return <Fragment>${convertToFixed(params.row.low)}</Fragment>;
      },
    },
    {
      field: "high",
      headerName: "52W high",
      renderCell: (params) => {
        return <Fragment>${convertToFixed(params.row.high)}</Fragment>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => removeStock(params.row)}>
            <ClearIcon className="cursor-pointer" />
          </IconButton>
        );
      },
    },
  ];

  return { convertToFixed, rows, removeStock, columns };
}

export default useTableData;
