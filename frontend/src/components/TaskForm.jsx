import React, { useState } from 'react'
import axios from 'axios'

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/api/tasks',
        formData
      )
      onTaskCreated(response.data) // Call the onTaskCreated callback function
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      }) // Reset form data
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  return (
    <div className='task-form'>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor='status'>Status:</label>
          <select
            id='status'
            name='status'
            value={formData.status}
            onChange={handleChange}
          >
            <option value='pending'>Pending</option>
            <option value='in-progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor='dueDate'>Due Date:</label>
          <input
            type='date'
            id='dueDate'
            name='dueDate'
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Create Task</button>
      </form>
    </div>
  )
}

export default TaskForm
