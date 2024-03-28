import { useState } from "react"
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from "../hooks/useTaskContext";

const AddTaskBar = () => {
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
        <div className="flex flex-col h-screen w-3/12 overflow-auto p-8 bg-app-green">
            <p className="mb-8 text-left text-sm font-bold text-app-darkGreen">ADD A TASK</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col h-full">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-app-darkGreen">TITLE</label>
                            <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="bg-app-mediumGreen text-white p-2 outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-app-darkGreen">DESCRIPTION</label>
                            <input
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="bg-app-mediumGreen text-white p-2 outline-none"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-app-darkGreen">DATE</label>
                            <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className="bg-app-mediumGreen text-white p-2 outline-none"
                            />
                        </div>
                    </div>
                </div>
                <button className="w-full h-16 bg-app-darkGreen text-app-lightGray">ADD TASK</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default AddTaskBar;