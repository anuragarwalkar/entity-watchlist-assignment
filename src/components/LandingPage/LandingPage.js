
import { Box } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import ChipNavigator from "../ChipNavigator/ChipNavigator";
import AddWatchlistModal from "../AddWatchlistModal/AddWatchlistModal";
import WatchlistStocks from "../WatchlistStocks/WatchlistStocks";
import useLandingPage from "./useLandingPage";
import AppRow from "../AppRow/AppRow";

function LandingPage() {
  const { results, onChange, onClear, value, onAddStock } = useLandingPage();

  return (
    <Box display="flex" justifyContent="center">
      <Box flex={0.3}>
        <h1 style={{textAlign: "center"}}>My Entity Watchlist</h1>
        <ChipNavigator />
        <SearchInput
        options={results}
        onChange={onChange}
        onClear={onClear}
        renderOption={AppRow(onAddStock)}
        inputValue={value}
        />
        <WatchlistStocks />
        <AddWatchlistModal />
      </Box>
    </Box>
  );
}

export default LandingPage;
