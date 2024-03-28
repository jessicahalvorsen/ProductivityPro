import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';
import AddTaskBar from "../components/AddTaskBar";
import Task from "../components/Task";

const TodoPage = () => {
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
        <>
            <div className="w-7/12">
                <p className="text-left text-sm leading-snug py-1.5 ml-8 mt-8 m-1 font-bold opacity-50">TODO LIST</p>
                <div className="mx-8 p-8">
                    <p className="text-left text-sm font-bold py-1.5">PROGRESS TODAY</p>
                    <div className="m-6 h-10 relative">
                        <div className="bg-app-mediumGreen w-full h-10 rounded-full absolute"></div>
                        <p className="text-white font-bold right-0 absolute p-2 pr-5">33%</p>
                        <div className="bg-app-green w-1/3 h-10 rounded-full absolute"></div>
                    </div>
                    <p className="text-left text-sm font-bold py-1.5">TASKS</p>
                    <div>
                        {tasks && tasks.map((task) => (
                            <Task key={task._id} task={task}/>
                        ))}
                    </div>
                </div>
            </div>
            <AddTaskBar/>
        </>

    )
};

export default TodoPage;