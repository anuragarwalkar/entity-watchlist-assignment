import { Fragment} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import useTableData from "./useTableData";

function WatchlistStocks() {
  const { convertToFixed, rows, removeStock } = useTableData();

  return (
    <Fragment>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Market Ptice</TableCell>
              <TableCell align="right">52W&nbsp;low</TableCell>
              <TableCell align="right">52W&nbsp;high</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell align="right">
                  ${convertToFixed(row.marketPrice)}
                </TableCell>
                <TableCell align="right">${convertToFixed(row.low)}</TableCell>
                <TableCell align="right">${convertToFixed(row.high)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => removeStock(row)}>
                    <ClearIcon className="cursor-pointer" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default WatchlistStocks;
