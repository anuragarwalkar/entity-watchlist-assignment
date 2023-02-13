import { clearSearch, fetchStockBySymbol, fetchStocksByQuery, selectUser } from '@/slice/stocksSlice';
import { cloneDeep } from 'lodash';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useLandingPage () {
  const results = useSelector(selectUser);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onChange = (value) => {
    setValue(value);
    dispatch(fetchStocksByQuery(value));
  };

  const onClear = () => {
    setValue("");
    dispatch(clearSearch());
  };

  const onAddStock = (stock) => {
    const item = cloneDeep(stock)
    delete item.id;
    delete item.title;
    dispatch(fetchStockBySymbol(item));
    onClear();
  };

  return { results, onChange, onClear, value, onAddStock }
}

export default useLandingPage;