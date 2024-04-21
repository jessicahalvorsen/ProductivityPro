import React from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';
import Task from '../components/Task';

const ShowTasksPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const date = location.state.isoDate

    const {tasks, dispatch} = useTaskContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
            const json = await response.json()
            if(response.ok) {
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }
    
        if(user) {
          fetchTasks()
        }
    }, [])

    //TODO Fix this so that the date matches the format stored in
    const formatDate = date + "T00:00:00.000Z"
    const dateTasks = tasks.filter(task => task.date == formatDate)
    console.log(formatDate)
    console.log(tasks)
    console.log(dateTasks)

    const handleBack = async (e) => {
        e.preventDefault()
        navigate('/map')
    }
    

    return (
        <div className="w-7/12">
                <p className="text-left text-sm leading-snug py-1.5 ml-8 mt-8 m-1 font-bold opacity-50">TASKS FOR {date}</p>
                    <div className="m-6 h-10 relative">
                    <p className="text-left text-sm font-bold py-1.5">LEFT UNFINISHED:</p>
                    <div>
                        {dateTasks && dateTasks.filter(task => !task.isCompleted).map(task => (
                            <Task key={task._id} task={task}/>
                        ))}
                    </div>
                    <p className="text-left text-sm font-bold py-1.5">COMPLETED:</p>
                    <div>
                        {dateTasks && dateTasks.filter(task => task.isCompleted).map(task => (
                            <Task key={task._id} task={task}/>
                        ))}
                    </div>
                </div>
                <button className="text-black font-bold right-0 absolute p-2 pr-5" onClick={handleBack}>BACK</button>
            </div>
    )
}

export default ShowTasksPage