import React, { useState, useReducer } from "react";

const itemsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "UPDATE_TODO":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, text: action.payload.text }
          : item
      );
    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const TodoExample = () => {
  const [todos, dispatch] = useReducer(itemsReducer, []);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: newTodoText
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    setNewTodoText("");
  };

  const updateTodo = (id, newText) => {
    if (newText !== null && newText.trim() !== "") {
      dispatch({ type: "UPDATE_TODO", payload: { id, text: newText } });
    } else {
      alert("Please enter a valid value!");
    }
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl py-7">Todo List</h1>
      <div className="w-1/2 flex items-center justify-between">
        <input
          className="flex-1 bg-gray-200 rounded-l-lg py-2 px-3 outline-0"
          type="text"
          placeholder="Add item..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="bg-gray-400 rounded-r-lg py-2 px-3 outline-0 hover:drop-shadow-xl"
          disabled={newTodoText.trim().length === 0}
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <ul className="w-1/2 my-8 flex flex-col gap-5">
        {todos.map((todo) => (
          <div className="flex items-center justify-between gap-3">
            <li
              key={todo.id}
              className="flex-1 bg-slate-200 py-2 px-4 rounded-full"
            >
              {todo.text}{" "}
            </li>
            <button
              className="bg-slate-400 py-2 px-4 rounded-full hover:drop-shadow-xl"
              onClick={() =>
                updateTodo(todo.id, prompt("Enter new text:", todo.text))
              }
            >
              Update
            </button>
            <button
              className="bg-red-500 py-2 px-4 rounded-full hover:drop-shadow-xl"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoExample;
