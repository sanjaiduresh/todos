// import React, { useState } from 'react';
// import './TodoApp.css';
// function TodoApp() {
  // const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');

//   const handleAddTodo = () => {
//     if (newTodo.trim() !== '') {
//       setTodos([...todos, newTodo]);
// //       const arr1 = [1, 2, 3];
// //       const arr2 = [...arr1, 4, 5];
// //       console.log(arr2); // Output: [1, 2, 3, 4, 5]
//       setNewTodo('');
//     }
//   };

//   const handleDeleteTodo = (index) => {
//     const updatedTodos = todos.filter((_, i) => i !== index);
//     setTodos(updatedTodos);
//   };

//   return (
//     <div id='todo'>
//       <h1>Todo List</h1>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) =>{
//           console.log(e);
//           setNewTodo(e.target.value)
//         } }
//         placeholder="Enter a new todo"
//       />
//       <button onClick={handleAddTodo}>Add</button>
//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index}>
//             {todo}
//             <button onClick={() => handleDeleteTodo(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default TodoApp;

import React, { useState, useEffect } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://65f16b99034bdbecc762724b.mockapi.io/todos'); 
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to add a new todo via API
  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const response = await fetch('https://65f16b99034bdbecc762724b.mockapi.io/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newTodo }),
        });
        const addedTodo = await response.json();
        setTodos([...todos, addedTodo]); // Add the new todo to the list
        setNewTodo(''); // Clear input field
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Function to delete a todo via API
  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`https://65f16b99034bdbecc762724b.mockapi.io/todos/${id}`, {
        method: 'DELETE',
      });
      const updatedTodos = todos.filter((todo) => todo.id !== id); // Remove deleted todo from the list
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  return (
    <div id='todo'>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
