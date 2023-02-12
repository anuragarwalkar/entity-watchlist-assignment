import { selectSelectedWatchlistStocks } from "@/slice/stocksSlice";
import { Box } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function WatchlistStocks () {
    const allSelectedSocks = useSelector(selectSelectedWatchlistStocks)

    return <Fragment>
        <Box>
            {allSelectedSocks.map(i => i.name)}
        </Box>
    </Fragment>
}

export default WatchlistStocks;