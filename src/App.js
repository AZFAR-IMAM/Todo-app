import { useState } from "react";
import "./App.css";
function App() {
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  const handelSubmit = (e) => {
    e.preventDefault();
    if (item !== "") {
      setTodo([{ id: `${item}-${Date.now()}`, item }, ...todo]);
      setItem("");
    }
  };
  const handelDel = (id) => {
    const delTodos = todo.filter((ele) => ele.id !== id);
    setTodo([...delTodos]);
  };
  return (
    <div className="app">
      <div className="container">
        <h2>Todo List App</h2>
        <form className="todoForm" onSubmit={handelSubmit}>
          <input
            type="text"
            placeholder="      Enter List item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button>add</button>
        </form>
        <ul className="allTodos">
          {todo.map((itemList) => {
            return (
              <li className="singleTodo">
                <span className="todoText" key={itemList.id}>
                  {itemList.item}
                </span>
                <button>edit</button>
                <button onClick={() => handelDel(itemList.id)}>delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
