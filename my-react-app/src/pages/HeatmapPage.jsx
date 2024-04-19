import React from "react";
import Sidebar from '../components/SideBar';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const HeatmapPage = () => {
    const [tasksByDate, setTasksByDate] = useState(undefined)
    const {user} = useAuthContext()

    useEffect(() => {
        fetch('/api/tasks/date-object/0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        .catch(() => setTasksByDate(null))
        .then(response => response.json())
        .then(tasks => setTasksByDate(tasks))
    }, [])

    const now = Date.now()
    const history = range(14)
        .map(offset => now - dayToMilliseconds(offset))
        .map(timestamp => new Date(timestamp))
        .map(date => date.toISOString().split('T')[0])
        .map(isoDate => [isoDate, tasksByDate?.[isoDate] ?? []])
        .map(([isoDate, tasks]) => {
            const total = tasks.length;
            const complete = tasks.filter(task => task.isCompleted).length;
            const progress = Math.round(100 * complete / total);
            const month = isoDate.split('-')[1]
            const day = isoDate.split('-')[2]
            return { progress, month, day }
        })

    return (
        <div className="flex">
          <Sidebar />
          <>
            <div className="w-7/12">
                <p className="text-left text-sm leading-snug py-1.5 ml-8 mt-8 m-1 font-bold opacity-50">PRODUCTIVITY</p>
                <div className="mx-8 p-8">
                    <p className="text-left text-sm font-bold py-1.5">HEATMAP</p>
                    {history.map(
                        entry=>{
                            let color = {
                                background: "bg-app-mediumGreen",
                                progress: "bg-app-green",
                            }
                            if (entry.progress < 75) {
                                color = {
                                    background: "bg-app-mediumYellow",
                                    progress: "bg-app-yellow",
                                }
                            }
                            if (entry.progress < 50) {
                                color = {
                                    background: "bg-app-mediumRed",
                                    progress: "bg-app-red",
                                }
                            }
                            if(isNaN(entry.progress)){
                                color = {
                                    background: "bg-app-mediumGray",
                                    progress: "bg-app-mediumGray"
                                }
                            }
                            return <div key={`${entry.month}/${entry.day}`} className="m-6 h-10 relative">
                                <div className={`${color.background} w-full h-10 rounded-full absolute`}></div>
                                <div className={`${color.progress} h-10 rounded-full absolute`} style={{width:entry.progress+"%"}}></div>
                                <p className="text-black font-bold left-0 absolute p-2 pr-5">{`${entry.month}/${entry.day}`}</p>
                                {!isNaN(entry.progress) && <p className="text-black font-bold right-0 absolute p-2 pr-5">{entry.progress}%</p>}
                            </div>
                        }
                    )}
                    <p className="text-left text-sm font-bold py-1.5">STATISTICS</p>
                </div>
            </div>
        </>
        </div>
      );
};

function range(count) {
    return [...Array(count).keys()]
}

function dayToMilliseconds(days) {
    return days * 1000 * 60 * 60 * 24
}


export default HeatmapPage;