import React from 'react';

const TaskBox = ({task}) => {
    return (
        <div className="p-4 rounded bg-white w-40 h-28 flex flex-col justify-between">
            <h1 className="text-xs font-bold w-16 text-left">{task.title}</h1>
            <p className="text-sm text-red-400 self-end">{task.description}</p>
        </div>
    )
}

export default TaskBox;