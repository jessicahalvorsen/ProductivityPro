import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../hooks/useTaskContext'
import { useAuthContext } from '../hooks/useAuthContext'


const TaskBox = ({task}) => {
    const navigate = useNavigate()
    const {dispatch} = useTaskContext()
    const { user } = useAuthContext()

    const handleEditClick = async () => {
        navigate('/edit-task', { state: { task: task } })
    }

    const handleDeleteClick = async () => {
        if (!user) {
            return
          }
          
        const response = await fetch('/api/tasks/'+task._id, {
            method: 'DELETE', 
            headers: {
                'Authorization': `Bearer ${user.token}`
            } 
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_TASK', payload:json})
        }
    }

    return (
        <div className="p-4 rounded bg-white w-40 h-28 flex flex-col justify-between">
            <h1 className="text-xs font-bold w-16 text-left">{task.title}</h1>
            <p className="text-sm text-red-400 self-end">{task.description}</p>
            <button onClick={handleEditClick}>EDIT</button>
            <button onClick={handleDeleteClick}>DELETE</button>
        </div>
    )
}

export default TaskBox;