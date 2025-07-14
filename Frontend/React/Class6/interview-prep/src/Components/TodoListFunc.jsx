import React, { useState, useEffect } from 'react';

const TodoListFunc = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    console.log('Component Did Mount: Fetching initial to-do items.');
    // Simulate fetching data from an API
    setTimeout(() => {
      setTodos(['Learn React', 'Read a book']);
    }, 1000);

    return () => {
      console.log('Component Will Unmount: Cleaning up resources.');
    };
  }, []);

  useEffect(() => {
    console.log('Component Did Update: Checking if new to-do was added.');
    console.log('Updated To-dos:', todos);
  }, [todos]); // Adding this useEffect to show component updation

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  }

  const handleAddTodo = () => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodo('');
  }

  console.log('Render: Rendering the to-do list.');
  return (
    <div>
      <h1>My To-Do List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add To-Do</button>
    </div>
  );
}

export default TodoListFunc;
