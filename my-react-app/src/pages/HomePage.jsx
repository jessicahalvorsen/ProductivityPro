import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext'; 


import TaskBox from '../components/TaskBox';
import TaskForm from '../components/TaskForm'; 

const HomePage = () => {
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

  return (
    <div className="flex flex-col justify-between m-5">
      <div className="w-full p-8 bg-gray-100 mb-5 h-64">
        <h2 className="text-left font-bold opacity-50 mb-4">HEATMAP:</h2>
      </div>
      <div className="w-full flex justify-between space-x-4 h-96">
        <div className="w-2/3 p-8 bg-gray-100">
            <h2 className="text-left font-bold opacity-50 mb-4">TODO:</h2>
            <div className="flex flex-wrap space-x-4">
                {tasks && tasks.map((task) => (
                    <TaskBox key={task._id} task={task}/>
                ))}
            </div>
        </div>
        <TaskForm/>
      </div>
    </div>
  )
}

export default HomePage;