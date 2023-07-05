import React, { useEffect, useState } from 'react'

import logo from './logo.svg';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saveTodo = localStorage.getItem('todos');

    if (saveTodo) {
      return JSON.parse(saveTodo);
    } else {
      return [];
    }


  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log("currentTodo", currentTodo);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  function handleInputChange(e) {
    setTodo(e.target.value);

  }
  function handleFormSubmit(e) {

    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()

        }
      ])
    }
    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(removeItem);
  }
  function handleEditClick(todo){
    setIsEditing(true);
    setCurrentTodo({...todo})

  }
  function handleUpdateTodo(id,UpdatedTodo){
    const UpdatedItem=todos.map((todo) => {
      return todo.id === id? UpdatedTodo: todo;
    });
    setIsEditing(false);
    setTodos(UpdatedItem);

  }
  function handleEditFormSubmit(e){
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  console.log(todos);

  return (
    <div className="App">
   
      <h1>Todo App</h1>

      { isEditing  ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit</h2>
          <label htmlFor="editTodo" >Edit</label>
          <input 
            type="text"
            name="edit todo"
            placeholder="Edit Todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit" >Update</button>
          <button onClick={()=> setIsEditing(false)} >Calcel</button>
        </form>
       ) : (

        <form onSubmit={handleFormSubmit}>
        <input type="text"
          name="todo"
          placeholder="Create Todo"
          value={todo}
          onChange={handleInputChange} />
          <button type="submit">Add </button>
      </form>
       ) }


    
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {"  "}
            <button onClick={()=> handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>delete</button>
            
          </li>
        ))}
      </ul>
      <div className="bluey1">
   <img src="https://www.bluey.tv/wp-content/uploads/2019/04/char-bandit@2x.png"/>
   </div>
   <div className="bluey2">
   <img src="https://www.bluey.tv/wp-content/themes/bbc-bluey/assets/images/characters/bandit-dance@2x.png"/>
   </div>
    </div>
    
  );
}

export default App;
