import { selectAllWatchlists } from "@/slice/stocksSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

function useSearchInput({onChange}) {
  const [showClearIcon, setShowClearIcon] = useState(false);
  const allList = useSelector(selectAllWatchlists);

  const handleChange = (event) => {
    try {
      const {
        target: { value },
      } = event;
      setShowClearIcon(value !== "");
      onChange(value);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleChange, showClearIcon, allList };
}

export default useSearchInput;