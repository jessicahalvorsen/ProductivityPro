import React from 'react';
import { createContext, useReducer } from "react";

export const TaskContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS': 
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK': 
            return {
                tasks: [action.payload, ...state.tasks]
            }
        default: 
            return state
    }
}

export const TaskContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    
    return (
        <TaskContext.Provider value={{...state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}