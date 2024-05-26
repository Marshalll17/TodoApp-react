import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

// ... (rest of the component code)
const App = () => {
  const [tasks, setTasks] = useState([])

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Task List</Link>
            </li>
            <li>
              <Link to='/create'>Create Task</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<TaskList tasks={tasks} />} />
          <Route
            path='/create'
            element={<TaskForm onTaskCreated={handleTaskCreated} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
