import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList";
import "./index.css";

const initialTodoList = [];

const TaskInput = () => {
  // State hooks
  const [todosList, setTodosList] = useState(initialTodoList); // State for the list of todos
  const [title, setTitle] = useState(""); // State for the todo title input
  const [description, setDescription] = useState(""); // State for the todo description textarea
  const [isFilterActive, setIsFilterActive] = useState(false); // State for filtering completed todos
  const [isAddDisabled, setIsAddDisabled] = useState(true); // State to disable the add button

  // Effect hook to load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todosList");
    if (savedTodos) {
      setTodosList(JSON.parse(savedTodos));
    }
  }, []);

  // Effect hook to save todos to localStorage whenever todosList changes
  useEffect(() => {
    localStorage.setItem("todosList", JSON.stringify(todosList));
  }, [todosList]);

  // Event handler to add a new todo
  const onAddTodos = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      isStarred: false,
    };
    setTodosList((prevTodos) => [...prevTodos, newTodo]); // Update todosList with new todo
    setTitle(""); // Clear title input
    setDescription(""); // Clear description textarea
    setIsAddDisabled(true); // Disable add button after adding todo
  };

  // Event handler to update the title input and enable/disable add button
  const onChangeName = (event) => {
    const { value } = event.target;
    setTitle(value); // Update title state
    setIsAddDisabled(value === "" || description === ""); // Enable/disable add button based on input values
  };

  // Event handler to update the description textarea and enable/disable add button
  const onChangeDescription = (event) => {
    const { value } = event.target;
    setDescription(value); // Update description state
    setIsAddDisabled(title === "" || value === ""); // Enable/disable add button based on input values
  };

  // Event handler to toggle the completion status of a todo
  const toggleIsCompleted = (id) => {
    setTodosList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isStarred: !todo.isStarred } : todo
      )
    );
  };

  // Event handler to delete a todo
  const deleteTodo = (id) => {
    setTodosList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Event handler to update a todo
  const updateTask = (updatedTask) => {
    setTodosList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTask.id ? updatedTask : todo))
    );
  };

  // Function to get filtered todos based on isFilterActive state
  const getFilteredTodosList = () => {
    if (isFilterActive) {
      return todosList.filter((todo) => todo.isStarred === true);
    }
    return todosList;
  };

  // Event handler to toggle the isFilterActive state
  const onClickFilter = () => {
    setIsFilterActive((prevIsFilterActive) => !prevIsFilterActive);
  };

  // CSS class name based on isFilterActive state
  const filterClassName = isFilterActive ? "filter-filled" : "filter-empty";

  // Get filtered todos list based on current filter state
  const filteredTodosList = getFilteredTodosList();

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="todos-img-container">
          <form className="form-container" onSubmit={onAddTodos}>
            <h1 className="title">Add Todo</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              id="title"
              type="text"
              className="title-input-element"
              placeholder="Title"
              onChange={onChangeName}
              value={title}
            />
            <label htmlFor="description" className="label">
              DESCRIPTION
            </label>
            <textarea
              id="description"
              cols="10"
              rows="5"
              className="description-input-element"
              value={description}
              onChange={onChangeDescription}
            />
            <button className="add-btn" type="submit" disabled={isAddDisabled}>
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="todos"
            className="todos-img"
          />
        </div>

        <div className="todos-container">
          <hr />
          <div className="todos-starred-container">
            <h1 className="todos-heading">Todos</h1>
            <button
              className={`starred-btn ${filterClassName}`}
              type="button"
              onClick={onClickFilter}
            >
              Completed
            </button>
          </div>
          <ul className="todos-lists-container">
            {/* Map through filtered todos list and render TaskList component */}
            {filteredTodosList.map((todo) => (
              <TaskList
                key={todo.id}
                todosDetails={todo}
                deleteTodo={deleteTodo}
                toggleIsCompleted={toggleIsCompleted}
                updateTask={updateTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
