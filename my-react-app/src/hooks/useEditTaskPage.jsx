import { useState } from "react"
import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from "../hooks/useTaskContext";

export const useEditTaskPage = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()
    const {dispatch} = useTaskContext()

    const editTask = async (task, newTask) => {
        setIsLoading(true)
        setError(null)

        if(!user) {
            setError('You must be logged in')
            return
        }

        const response = await fetch('/api/tasks/'+ task._id, {
            method: 'PATCH', 
            body: JSON.stringify(newTask), 
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
            console.log('task edited', json)
            dispatch({type: 'UPDATE_TASK', payload: json})
        }
    }

    return { editTask, isLoading, error }
}

