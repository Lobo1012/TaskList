import React, { useState, useEffect, useRef } from 'react';

function TodoSecondary(props) {
  const [input, setInput] = useState('');

  // Create a reference to the input element so that it can be focused
  const inputRef = useRef(null);

  // Focus on the input element when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Update the input state when the user types into the input field
  const handleChange = e => {
    setInput(e.target.value);
  };

  // Submit the form when the user clicks the "Add Task" or "Edit Task" button
  const handleSubmit = e => {
    e.preventDefault();

    // Generate a random ID for the new task if one does not exist
    const id = props.edit?.id || Math.floor(Math.random() * 100);

    // Create a new task object with the input text and ID
    const newTask = {
      id: id,
      text: input
    };

    // Call the onSubmit function passed down as a prop with the new task object
    props.onSubmit(newTask);

    // Clear the input field
    setInput('');
  };

  return (
    <div className="mt-10 flex justify-center items-center flex-col gap-8">
      <form
        className="flex flex-col gap-5 md:flex-row md:gap-5 items-center"
        onSubmit={handleSubmit}
      >
        {/* Use the inputRef to focus on the input field */}
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
