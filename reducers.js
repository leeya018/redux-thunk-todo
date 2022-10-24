import { combineReducers } from "redux";
import * as types from "./types";

// TODO REDUCER
const todoReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.ADD_TODO:
      return [...state, payload];
      break;
    case types.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      break;
    case types.REMOVE_TODO:
      return state.filter((todo) => todo.id !== payload.id);
      break;

    default:
      return state;
      break;
  }
};

// COUNTER REDUCER
const counterReducer = (state = 0, { type, payload }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return payload.number;
    default:
      return state;
  }
};

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
};

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !payload.light,
      };
    default:
      return state;
  }
};

const initialErrorState = {
  counter: "",
  todos: "",
  clock: "",
};

const errorReducer = (state = initialErrorState, { type, payload }) => {
  console.log({ type });
  switch (type) {
    case types.COUNTER_ERROR:
      return { ...state, counter: payload.text };

      break;
    case types.TODOS_ERROR:
      return { ...state, todos: payload.text };

      break;

    default:
      return state;
      break;
  }
};
// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  todos: todoReducer,
  error: errorReducer,
};

export default combineReducers(reducers);
