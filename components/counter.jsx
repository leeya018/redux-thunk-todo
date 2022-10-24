import { useSelector, useDispatch } from "react-redux";
import {
  incrementCount,
  decrementCount,
  resetCount,
  counterError,
} from "../actions";
import * as types from "../types";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // this functino is getting anothser functino
  // because we can use here in 2 different functinos
  // so there is no duplication of code here
  const handleCounter = (countHandler) => {
    if (count > 3 || count < -3) {
      dispatch(counterError("counter is out of range"));
      dispatch(resetCount(2));
      return;
    }
    dispatch(counterError(""));
    dispatch(countHandler());
  };

  return (
    <div>
      <div className="text-red-400">{error.counter}</div>
      <h1>
        Count: <span>{count}</span>
      </h1>

      <button onClick={() => handleCounter(incrementCount)}>+1</button>
      <button onClick={() => handleCounter(decrementCount)}>-1</button>
      <button onClick={() => dispatch(resetCount(0))}>Reset</button>
    </div>
  );
};

export default Counter;
