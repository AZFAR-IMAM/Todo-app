import { useRef, useState } from "react";
import "./App.css";
import { AiFillDelete } from "react-icons/ai";
import { MdEditNote } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";

function App() {
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(0); // We will be needing this editId in two placeses 1) Button 2) Edit
  const Iref = useRef();
  const handelEdit = (id) => {
    Iref.current.focus();
    const editTodo = todo.find((x) => x.id === id); // editTodo is a Id
    setItem(editTodo.item); // so for that we need to write editTodo.item
    setEditId(id);
    console.log("inside handeledit", editId);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      console.log(editId);

      // const editTodo = todo.find((x) => x.id === editId);
      const updatedTodo = todo.map((t) =>
        t.id === editId ? (t = { id: t.id, item }) : { id: t.id, item: t.item }
      );
      setTodo([...updatedTodo]);
      setItem("");
      setEditId(0);
      return;
    }

    if (item !== "") {
      setTodo([{ id: `${item}-${Date.now()}`, item }, ...todo]);
      setItem("");
    }
  };
  const handelDel = (id) => {
    const delTodos = todo.filter((ele) => ele.id !== id);
    setTodo(delTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="title">
          <span>
            <FcTodoList />
          </span>
          Todo List App
        </h2>
        <form className="todoForm" onSubmit={handelSubmit}>
          <input
            type="text"
            placeholder="      Enter List item"
            value={item}
            ref={Iref}
            onChange={(e) => setItem(e.target.value)}
          />
          <button className="primaryBtn">
            {editId ? (
              "edit"
            ) : (
              <>
                Add
                <FaArrowRight />
              </>
            )}
          </button>
        </form>
        <ul className="allTodos">
          {todo.map((itemList) => {
            return (
              <li className="singleTodo" key={itemList.id}>
                <span className="todoText">{itemList.item}</span>
                <div className="wrapperBtn">
                  <div className="hv-edit">
                    <span className="hv">Edit</span>

                    <button
                      className="icon-edit"
                      onClick={() => handelEdit(itemList.id)}
                    >
                      <MdEditNote />
                    </button>
                  </div>
                  <div className="hv-edit">
                    <span className="hv">Delete</span>
                    <button
                      onClick={() => handelDel(itemList.id)}
                      className="icon"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
