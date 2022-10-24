import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, remove, toggle, todosError } from "../actions";

const getRandWord = () => {
  const abc = ["A", "B", "C", "Y", "Z"];
  const len = Math.floor((Math.random() + 1) * 5);
  let word = "";
  for (let i = 0; i < len; i++) {
    const ind = Math.floor(Math.random() * abc.length);
    word += abc[ind];
  }
  return word;
};
export default function Todos() {
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!name) {
      dispatch(todosError("todo cannot be empty"));
      return;
    }
    dispatch(addTodo(name));
    let w = getRandWord();

    setName(w);
  };

  return (
    <div>
      <h1>todo list </h1>
      <div className="text-red-400">{error.todos}</div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          dispatch(todosError(""));
          setName(e.target.value);
        }}
      />
      <button onClick={handleClick}>add todo</button>
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}

const Todo = ({ todo, dispatch }) => {
  return (
    <div>
      <div
        className={`${
          todo.done ? "text-green-700 text-bold font-bold" : "text-black"
        } `}
        key={todo.id}
      >
        {todo.name}
      </div>
      <button onClick={() => dispatch(toggle(todo.id))}>toggle </button>
      <button onClick={() => dispatch(remove(todo.id))}>remove </button>
    </div>
  );
};
