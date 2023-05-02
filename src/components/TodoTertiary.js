import React, { useState } from 'react';
import TodoSecondary from './TodoSecondary';
import TodoMain from './TodoMain';

function TodoTertiary() {
  // useState hook to store the todo items in an array
  const [todos, setTodos] = useState([]);

  // function to add a new todo item
  const addTodo = todoMain => {
    // Check if the input field is empty or only contains whitespace characters
    if (!todoMain.text || /^\s*$/.test(todoMain.text)) {
      return;
    }

    // Add the new todo item to the beginning of the array using the spread operator
    const newTodos = [todoMain, ...todos];
    setTodos(newTodos);
  };

  // function to update a todo item
  const updateTodo = (todoId, newValue) => {
    // Check if the input field is empty or only contains whitespace characters
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // Update the todo item with the new value and return a new array using the map method
    setTodos(prevTodos =>
      prevTodos.map(item => (item.id === todoId ? newValue : item))
    );
  };

  // function to remove a todo item
  const removeTodo = id => {
    // Create a new array of todo items excluding the one with the specified id using the filter method
    const removedArr = [...todos].filter(todoMain => todoMain.id !== id);
    setTodos(removedArr);
  };

  // function to mark a todo item as completed or incomplete
  const completeTodo = id => {
    // Update the isComplete property of the todo item with the specified id and return a new array using the map method
    setTodos(prevTodos =>
      prevTodos.map(todoMain => {
        if (todoMain.id === id) {
          return {
            ...todoMain,
            isComplete: !todoMain.isComplete,
          };
        }
        return todoMain;
      })
    );
  };

  return (
    <>
      <h1 className='text-center text-3xl font-bold mx-8'>Task to do</h1>

      {/* Pass the addTodo function as a prop to the TodoSecondary component */}
      <TodoSecondary onSubmit={addTodo} />
      
      {/* Pass the todos array and the functions to manipulate it as props to the TodoMain component */}
      <TodoMain
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoTertiary;
