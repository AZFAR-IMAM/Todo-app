import { useState } from "react";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

function App() {
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(0);
  const handelEdit = (id) => {
    const editTodo = todo.find((x) => x.id === id);
    setItem(editTodo.item);
    setEditId(id);
  };
  const handelSubmit = (e) => {
    if (editId) {
      const editTodo = todo.find((x) => x.id === editId.id);
      const updatedTodo = todo.map((t) =>
        t.id === editTodo
          ? (t = { id: t.id, todo })
          : { id: t.id, item: t.item }
      );
      setTodo(updatedTodo);
      setItem("");
      setEditId(0);
    }
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

  console.log("here", editId);
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
          <button>{editId ? "edit" : <FaArrowRight />}</button>
        </form>
        <ul className="allTodos">
          {todo.map((itemList) => {
            return (
              <li className="singleTodo">
                <span className="todoText" key={itemList.id}>
                  {itemList.item}
                </span>
                <button onClick={() => handelEdit(itemList.id)}>
                  <MdEditNote />
                </button>
                <button onClick={() => handelDel(itemList.id)}>
                  <AiFillDelete />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
