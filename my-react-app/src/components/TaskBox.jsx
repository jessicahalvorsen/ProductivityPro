import React from 'react';

function TaskBox({ title, tag }) {
    return (
        <div className="p-4 rounded bg-white w-40 h-28 flex flex-col justify-between">
            <h1 className="text-xs font-bold w-16 text-left">{title}</h1>
            <p className="text-sm text-red-400 self-end">{tag}</p>
        </div>
    );
}

export default TaskBox;