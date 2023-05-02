# TodoTask Using React 

A simple todoTaskApp can add, delete and modify

### Project setup

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.\


# Code Explanation

This is the code explanation in every function  `// explanation //`

### `TodoMain.js`

This part are only an update, edit and complete icon button

```
// Import necessary packages and components //
import React from 'react'
import { useState } from 'react'
import TodoSecondary from './TodoSecondary'
import { UilPen, UilTrash, UilCheck } from '@iconscout/react-unicons'

// Create a functional component Todo with props //
function Todo({ todos, completeTodo, removeTodo, updateTodo }) {

    // Declare state variable using useState hook for editing the todos //
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })
    
    // Function to update the todo item //
    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    // If the edit state is not null, then display the TodoSecondary component for editing the todo item //
    if(edit.id) {
        return <TodoSecondary edit={edit} onSubmit={submitUpdate} />
    }

    // If the edit state is null, then display the todos using map function //
    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todolist complete' : 'todolist'} key={index}>

            // Display the todo text and attach the completeTodo function to it //
            <div key={todo.id} onClick={() => completeTodo(todo.id)}> {todo.text} </div>
            
            // Display the icons for editing, completing and deleting the todo //
            <div className='icons'>
                <UilCheck onClick={() => completeTodo(todo.id)} className='complete'/>
                <UilPen onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit'/>
                <UilTrash onClick={() => removeTodo(todo.id)} className='delete'/>
            </div>
        </div>
    ))
}

// Export the Todo component //
export default Todo
```

### `TodoSecondary.js`

This part is taskForm and add task/update task 

```
import React, { useState, useEffect, useRef } from 'react';

function TodoSecondary(props) {
  const [input, setInput] = useState('');

  // Create a reference to the input element so that it can be focused //
  const inputRef = useRef(null);

  // Focus on the input element when the component mounts //
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Update the input state when the user types into the input field //
  const handleChange = e => {
    setInput(e.target.value);
  };

  // Submit the form when the user clicks the "Add Task" or "Edit Task" button //
  const handleSubmit = e => {
    e.preventDefault();

    // Generate a random ID for the new task if one does not exist //
    const id = props.edit?.id || Math.floor(Math.random() * 100);

    // Create a new task object with the input text and ID //
    const newTask = {
      id: id,
      text: input
    };

    // Call the onSubmit function passed down as a prop with the new task object //
    props.onSubmit(newTask);

    // Clear the input field //
    setInput('');
  };

  return (
    <div className="mt-10 flex justify-center items-center flex-col gap-8">
      <form
        className="flex flex-col gap-5 md:flex-row md:gap-5 items-center"
        onSubmit={handleSubmit}
      >
        // Use the inputRef to focus on the input field //
        <input
          type="text"
          placeholder={props.edit ? 'Edit Task' : 'Add Task'}
          value={input}
          name="text"
          className="w-64 border-2 rounded-lg px-2 py-2 bg-slate-100 backdrop-blur-lg focus:outline-none focus:border-slate-300"
          onChange={handleChange}
          autoComplete="off"
          ref={inputRef}
        />
        <button className="hover:bg-slate-800 h-full px-4 py-2 bg-slate-900 text-white font-sm rounded-lg">
          {props.edit ? 'Edit Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default TodoSecondary;
```

### `TodoTertiary`

This part is the TaskList which is only pop up if the `TodoSecondary` or the form, submit the task

```
import React, { useState } from 'react';
import TodoSecondary from './TodoSecondary';
import TodoMain from './TodoMain';

function TodoTertiary() {

  // useState hook to store the todo items in an array //
  const [todos, setTodos] = useState([]);

  // function to add a new todo item //
  const addTodo = todoMain => {
  
    // Check if the input field is empty or only contains whitespace characters //
    if (!todoMain.text || /^\s*$/.test(todoMain.text)) {
      return;
    }

    // Add the new todo item to the beginning of the array using the spread operator //
    const newTodos = [todoMain, ...todos];
    setTodos(newTodos);
  };

  // function to update a todo item //
  const updateTodo = (todoId, newValue) => {
  
    // Check if the input field is empty or only contains whitespace characters //
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // Update the todo item with the new value and return a new array using the map method //
    setTodos(prevTodos =>
      prevTodos.map(item => (item.id === todoId ? newValue : item))
    );
  };

  // function to remove a todo item //
  const removeTodo = id => {
  
    // Create a new array of todo items excluding the one with the specified id using the filter method //
    const removedArr = [...todos].filter(todoMain => todoMain.id !== id);
    setTodos(removedArr);
  };

  // function to mark a todo item as completed or incomplete //
  const completeTodo = id => {
  
    // Update the isComplete property of the todo item with the specified id and return a new array using the map method //
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

      // Pass the addTodo function as a prop to the TodoSecondary component //
      <TodoSecondary onSubmit={addTodo} />
      
      // Pass the todos array and the functions to manipulate it as props to the TodoMain component //
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
```
