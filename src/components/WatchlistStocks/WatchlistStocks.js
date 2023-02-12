const { selectSelectedWatchlistStocks } = require("@/slice/stocksSlice");
const { useSelector } = require("react-redux");

function WatchlistStocks () {
    const allSelectedSocks = useSelector(selectSelectedWatchlistStocks)

    
}