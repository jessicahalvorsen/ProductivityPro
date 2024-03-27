import React from 'react'
import { useState } from 'react'
import { useEditTaskPage } from '../hooks/useEditTaskPage'
import { useLocation, useNavigate} from 'react-router-dom'

const EditTaskPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const task = location.state.task

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || '')
    const [date, setDate] = useState(task.date)

    const [inputError, setInputError] = useState(null)
    const {editTask, error, isLoading} = useEditTaskPage()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!title) {
            setInputError('Title is required.')
            return
        }
        if(!date) {
            setInputError('Date is required.')
            return
        }

        const updatedTask = {title, description, date}
        await editTask(task, updatedTask)
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

            <button disabled={isLoading}>UPDATE TASK</button>
            {error && <div className="error">{error}</div>}
            {inputError && <div className="input-error">{inputError}</div>}
        </form>
    )
}

export default EditTaskPage