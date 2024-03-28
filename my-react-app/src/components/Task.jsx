import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../hooks/useTaskContext'
import { useAuthContext } from '../hooks/useAuthContext'
import CheckBox from './CheckBox';

const Task = ({task}) => {
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
        <div className="my-4 p-5 bg-app-lightGray w-full flex ">
            <div className="mx-3 my-auto">
                <CheckBox />
            </div>
            <div className="w-5/6">
                <h1 className="text-sm font-bold w-full text-left">{task.title}</h1>
                <p className="text-xs opacity-50 self-end">{task.description}</p>
            </div>
            <div className="w-1/6 flex justify-end">
                <button className="text-xs opacity-50 mr-4 self-end" onClick={handleEditClick}>EDIT</button>
                <button className="text-xs opacity-50 self-end" onClick={handleDeleteClick}>DELETE</button>
            </div>
        </div>
    )
};

export default Task;