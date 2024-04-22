import React, { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';
import AddTaskBar from "../components/AddTaskBar";
import Task from "../components/Task";

const TodoPage = () => {
    const { tasks, dispatch } = useTaskContext();
    const [tasksByDate, setTasksByDate] = useState(undefined);
    const { user } = useAuthContext();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_TASKS', payload: json });
            }
        };

        if (user) {
            fetchTasks();
        }
        fetch('/api/tasks/date-object/0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
            .catch(() => setTasksByDate(null))
            .then(response => response.json())
            .then(tasks => setTasksByDate(tasks));
    }, [toggle, tasks]); // Include 'tasks' in the dependency array

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasksByDate ? tasksByDate[today] ?? [] : [];
    const total = todayTasks.length;
    const complete = todayTasks.filter(task => task.isCompleted).length;
    const progress = total === 0 ? 0 : Math.round(100 * complete / total);

    let color = {
        background: "bg-app-mediumGray",
        progress: "bg-app-mediumGray"
    };

    if (total > 0) {
        if (progress >= 75) {
            color = {
                background: "bg-app-mediumGreen",
                progress: "bg-app-green"
            };
        } else if (progress >= 50) {
            color = {
                background: "bg-app-mediumYellow",
                progress: "bg-app-yellow"
            };
        } else {
            color = {
                background: "bg-app-mediumRed",
                progress: "bg-app-red"
            };
        }
    }

    return (
        <>
            <div className="w-7/12">
                <p className="text-left text-sm leading-snug py-1.5 ml-8 mt-8 m-1 font-bold opacity-50">TODO LIST</p>
                <div className="mx-8 p-8">
                    <p className="text-left text-sm font-bold py-1.5">PROGRESS TODAY</p>
                    <div className="m-6 h-10 relative">
                        <div className={`${color.background} w-full h-10 rounded-full absolute`}></div>
                        <div className={`${color.progress} h-10 rounded-full absolute`} style={{ width: progress + "%" }}></div>
                        <p className="text-black font-bold left-0 absolute p-2 pr-5">{`${today}`}</p>
                        {total > 0 && !isNaN(progress) && <p className="text-black font-bold right-0 absolute p-2 pr-5">{progress}%</p>}
                    </div>
                    <p className="text-left text-sm font-bold py-1.5">TO DO:</p>
                    <div>
                        {tasks && tasks.filter(task => !task.isCompleted).map(task => (
                            <Task key={task._id} task={task} onToggle={handleToggle} />
                        ))}
                    </div>
                    <p className="text-left text-sm font-bold py-1.5">COMPLETED:</p>
                    <div>
                        {tasks && tasks.filter(task => task.isCompleted).map(task => (
                            <Task key={task._id} task={task} onToggle={handleToggle} />
                        ))}
                    </div>
                </div>
            </div>
            <AddTaskBar />
        </>
    );
};

export default TodoPage;
