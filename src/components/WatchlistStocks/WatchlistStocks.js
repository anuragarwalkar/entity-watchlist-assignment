import { Fragment} from "react";
import { Box } from "@mui/material";
import useTableData from "./useTableData";
import useStocklistWS from "./useStocklistWS";
import { DataGrid } from '@mui/x-data-grid';

function WatchlistStocks() {
  const { rows, columns } = useTableData();
  useStocklistWS();

  return (
    <Fragment>
      <Box sx={{ width: 500, height: 300, marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Fragment>
  );
}

export default WatchlistStocks;
