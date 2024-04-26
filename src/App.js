import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle,
          completed: false,
        }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCompletion = async (taskId) => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add Task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

