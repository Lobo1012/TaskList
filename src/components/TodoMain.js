// Import necessary packages and components
import React from 'react'
import { useState } from 'react'
import TodoSecondary from './TodoSecondary'
import { UilPen, UilTrash, UilCheck } from '@iconscout/react-unicons'

// Create a functional component Todo with props
function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    // Declare state variable using useState hook for editing the todos
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })
    
    // Function to update the todo item
    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    // If the edit state is not null, then display the TodoSecondary component for editing the todo item
    if(edit.id) {
        return <TodoSecondary edit={edit} onSubmit={submitUpdate} />
    }

    // If the edit state is null, then display the todos using map function
    return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todolist complete' : 'todolist'} key={index}>

            {/* Display the todo text and attach the completeTodo function to it */}
            <div key={todo.id} onClick={() => completeTodo(todo.id)}> {todo.text} </div>
            
            {/* Display the icons for editing, completing and deleting the todo */}
            <div className='icons'>
                <UilCheck onClick={() => completeTodo(todo.id)} className='complete'/>
                <UilPen onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit'/>
                <UilTrash onClick={() => removeTodo(todo.id)} className='delete'/>
            </div>
        </div>
    ))
}

// Export the Todo component
export default Todo