import React, { useState } from 'react';
import './Todo.css';

function CreateItem({ addItem }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value) {
      addItem(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        placeholder='Add to the list and ENTER..'
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
}

function Item({ item, index, finishItem, deleteItem }) {
  if (index === 0) return <div></div>;
  else
    return (
      <div
        className='item'
        style={{ textDecoration: item.completed ? 'line-through' : '' }}
      >
        {item.title}
        <button onClick={() => deleteItem(index)}>X</button>
        <button onClick={() => finishItem(index)}>Mark as Complete</button>
      </div>
    );
}

function Todo() {
  const [items, setItems] = useState([{}]);

  const addItem = (title) => {
    const newItems = [...items, { title, completed: false }];
    setItems(newItems);
  };

  const finishItem = (index) => {
    const newItems = [...items];
    newItems[index].completed = true;
    setItems(newItems);
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const deleteAllItem = (index) => {
    const newItems = [...items];
    newItems.splice(1, items.length);
    setItems(newItems);
  };

  return (
    <div className='todo-container'>
      <h1>To Do List</h1>
      <div>
        {items.map((item, index) => (
          <Item
            item={item}
            index={index}
            finishItem={finishItem}
            deleteItem={deleteItem}
            key={index}
          />
        ))}
      </div>
      <div className='create-item'>
        <CreateItem addItem={addItem} />
      </div>
      <div>
        <button className='delete-all' onClick={deleteAllItem}>
          CLEAR LIST
        </button>
      </div>
    </div>
  );
}

export default Todo;
