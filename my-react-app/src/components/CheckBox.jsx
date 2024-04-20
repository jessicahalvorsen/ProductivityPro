import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from "../hooks/useTaskContext";

const CheckBox = ({task, onToggle}) => {
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);
    const {user} = useAuthContext()
    const {dispatch} = useTaskContext()

    const toggleCheck = async () => {
        setIsCompleted(!isCompleted)

        const updatedTask = {
            isCompleted: !isCompleted
        }

        const response = await fetch('/api/tasks/'+ task._id, {
            method: 'PATCH', 
            body: JSON.stringify(updatedTask), 
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
            onToggle()
        }
    };

    const checkBoxClasses = `w-5 h-5 rounded-full border-2 transition-colors duration-200 cursor-pointer ${isCompleted ? 'border-transparent bg-app-green' : 'border-black bg-transparent'}`;

    return (
        <div className={checkBoxClasses} onClick={toggleCheck}></div>
    );
};

export default CheckBox;