import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { styles } from "./styles";

function AppRow(onAddStock) {
  return (_, option) => (
    <li key={option.id} style={styles.listItem}>
      <Box sx={styles.rowContainer}>
        <div style={styles.symbol}>{option.symbol}</div>
        <div style={styles.title}>{option.title}</div>
        <div style={styles.exchange}>{option.exchange}</div>
      </Box>
      <Box flex={0.2}>
        <Button
          startIcon={<AddIcon />}
          color="success"
          onClick={() => onAddStock(option)}
        >
          Add
        </Button>
      </Box>
    </li>
  );
}

export default AppRow;
