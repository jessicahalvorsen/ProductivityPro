import React from 'react'
import { useState } from 'react'
import { useEditTaskPage } from '../hooks/useEditTaskPage'
import { useLocation, useNavigate} from 'react-router-dom'

const EditTaskPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const task = location.state.task

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || '')
    const [date, setDate] = useState(task.date)

    const [inputError, setInputError] = useState(null)
    const {editTask, error, isLoading} = useEditTaskPage()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!title) {
            setInputError('Title is required.')
            return
        }
        if(!date) {
            setInputError('Date is required.')
            return
        }

        const updatedTask = {title, description, date}
        await editTask(task, updatedTask)
        navigate('/')
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative">
                <div className="bg-app-lightGray rounded-lg p-8 w-96 h-96 flex justify-center items-center">
                    <form className='edit-task' onSubmit={handleSubmit}>
                        {/* Edit Task Sign */}
                        <h3 className="text-lg absolute top-0 left-0 p-8">Edit Task</h3>
    
                        {/* Title */}
                        <div className="mt-12">
                            <label className="text-sm leading-snug py-1.5 px-3 mx-1 opacity-50 ml-4">Title</label>
                            <div className="flex justify-center items-center">
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    className="rounded bg-app-mediumGray px-3 py-2 outline-none"
                                />
                            </div>
                        </div>
                        
                        {/* Description */}
                        <div className='mt-4'>
                            <label className="text-sm leading-snug py-1.5 px-3 mx-1 opacity-50 ml-4">Description</label>
                            <div className="flex justify-center items-center">
                                <input
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    className="rounded bg-app-mediumGray px-3 py-2 outline-none"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className='mt-4'>
                            <label className="text-sm leading-snug py-1.5 px-3 mx-1 opacity-50 ml-4">Date</label>
                            <div className='flex justify-center items-center'>
                                <input
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                    className='bg-app-lightGray' 
                                />
                            </div>
                        </div>

                        {/* Update Task Button */}
                        <div className="mt-6 w-full flex justify-center items-center">
                            <button className="rounded bg-app-mediumGreen text-white px-32 py-2" disabled={isLoading}>UPDATE TASK</button>
                        </div>
                    </form>
                </div>

                {/* Error Handling (can be changed to something that looks better)*/}
                {error && <div className="error">{error}</div>}
                {inputError && <div className="input-error">{inputError}</div>}
                {error && 
                <div className="error absolute top-[calc(100% + 40px)] left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center mt-2">
                    {error}
                </div>}
            
            </div>
        </div>
    );
    {/*}
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

            <button disabled={isLoading}>UPDATE TASK</button>
            {error && <div className="error">{error}</div>}
            {inputError && <div className="input-error">{inputError}</div>}
        </form>
                */}
}

export default EditTaskPage