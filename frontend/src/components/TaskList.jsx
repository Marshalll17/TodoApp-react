import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`)
      fetchTasks() // Refresh the task list after deleting
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/tasks/${id}`, {
        status: newStatus,
      })
      fetchTasks() // Refresh the task list after updating
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  return (
    <div>
      <h1>Task List</h1>
      <ul className='task-list'>
        {tasks.map((task) => (
          <li key={task._id} className='task-item'>
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>
              Status:
              <select
                value={task.status}
                onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
              >
                <option value='pending'>Pending</option>
                <option value='in-progress'>In Progress</option>
                <option value='completed'>Completed</option>
              </select>
            </p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
