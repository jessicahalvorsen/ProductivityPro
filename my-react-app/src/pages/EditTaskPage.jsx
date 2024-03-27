import React from 'react'
import { useState } from 'react'
import { useEditTaskPage } from '../hooks/useEditTaskPage'
import { useLocation, useNavigate} from 'react-router-dom'

const EditTaskPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const task = location.state.task

    const [title, setTitle] = useState(task.title || '')
    const [description, setDescription] = useState(task.description || '')
    const [date, setDate] = useState(task.date || '')
    const [isCompleted, setIsCompleted] = useState(task.isCompleted || '')
    const {editTask, error, isLoading} = useEditTaskPage()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTask = {title, description, date, isCompleted}

        await editTask(task, newTask)

        navigate('/')
    }

    return (
        <form className='edit-task' onSubmit={handleSubmit}>
            <h3>Edit Task</h3>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

<           label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <label>Date:</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />

            <label>Completion:</label>
            <input
                type="text"
                onChange={(e) => setIsCompleted(e.target.value)}
                value={isCompleted}
            />
            <button disabled={isLoading}>UPDATE TASK</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EditTaskPage