import { useState } from "react"
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from "../hooks/useTaskContext";

const TaskForm = () => {
    const {user} = useAuthContext()
    const {dispatch} = useTaskContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [isCompleted, setIsCompleted] = useState(0)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }
        const task = {title, description, date, isCompleted}

        const response = await fetch('/api/tasks', {
            method: 'POST', 
            body: JSON.stringify(task), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setDate('')
            setIsCompleted('')
            setError(null)
            console.log('new task added', json)
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="w-1/3 p-8 bg-gray-100" onSubmit={handleSubmit}>
            <h2 className="text-left font-bold opacity-50 mb-4">CREATE TASK:</h2>

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
            <button>ADD TASK</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm