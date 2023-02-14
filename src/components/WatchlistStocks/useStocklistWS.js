import { selectSelectedWatchlistStocks, updateWatchlistStocksData } from "@/slice/stocksSlice";
import { generateWSMessage, getWebSocketURL } from "@/webServices";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";


function useStocklistWS() {
  const { readyState, lastJsonMessage, sendJsonMessage, getWebSocket } = useWebSocket(
    getWebSocketURL("quotes/price")
  );
  const allSelectedSocks = useSelector(selectSelectedWatchlistStocks);
  const dispatch = useDispatch();

  useEffect(() => {
    const { event, ...rest } =
    lastJsonMessage || {};
    if (event === "price") {
      dispatch(updateWatchlistStocksData(rest));
    }
  }, [lastJsonMessage, dispatch]);

  const sendMessages = useCallback((subscribe) => {
    allSelectedSocks.forEach(({ meta }) => {
        sendJsonMessage(generateWSMessage([meta], subscribe));
      });
  }, [allSelectedSocks, sendJsonMessage])


  useEffect(() => {
    if (readyState) {
        sendMessages(true);
    }

    return () => {
        // const socket = getWebSocket();
        // socket?.close();
        sendMessages(false)
    };
  }, [allSelectedSocks, readyState, sendMessages]);
}

export default useStocklistWS;
