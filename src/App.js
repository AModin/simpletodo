import * as React from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [itemsToDo, setItemsTodo] = React.useState([]);
  const inputRef = React.useRef();
  const onSubmitHandler = e => {
    e.preventDefault();
    if (!inputValue.trim().length) {
      alert("The title should not be empty!");
      return;
    }
    const newItem = {
      id: Date.now(),
      title: inputValue,
      isDone: false
    };
    setItemsTodo([...itemsToDo, newItem]);
    setInputValue("");
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  const setItemDone = id => {
    const newItemsList = itemsToDo.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone
        };
      }
      return item;
    });
    setItemsTodo([...newItemsList]);
  };

  const returnTodoItems = () => {
    return itemsToDo.filter(item => {
      return !item.isDone;
    }).length;
  };

  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input
          value={inputValue}
          ref={inputRef}
          onChange={e => setInputValue(e.currentTarget.value)}
        />
        <button type="submit">Add</button>
      </form>
      <p>
        {returnTodoItems()} remaining out of {itemsToDo.length}
      </p>
      <div>
        {itemsToDo.length
          ? itemsToDo.map(item => {
              return (
                <div
                  style={{ textDecoration: item.isDone && "line-through" }}
                  key={item.id}
                  onClick={() => setItemDone(item.id)}
                >
                  {item.title}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
