import React from 'react';
import TaskBox from '../components/TaskBox';

function HomePage() {
  return (
    <div className="flex flex-col justify-between m-5">
      <div className="w-full p-8 bg-gray-100 mb-5 h-64">
        <h2 className="text-left font-bold opacity-50 mb-4">HEATMAP:</h2>
      </div>
      <div className="w-full flex justify-between space-x-4 h-96">
        <div className="w-2/3 p-8 bg-gray-100">
            <h2 className="text-left font-bold opacity-50 mb-4">TODO:</h2>
            <div className="flex flex-wrap space-x-4">
                <TaskBox title={'GO TO BATHROOM'} tag={'URGENT'}/>
                <TaskBox title={'DO HOMEWORK'} tag={'SCHOOL'}/>
                <TaskBox title={'WORKOUT'} tag={'HEALTH'}/>
            </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-100">
            <h2 className="text-left font-bold opacity-50 mb-4">CREATE TASK:</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;