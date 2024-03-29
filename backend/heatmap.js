const Task = require('../models/taskModel');

// Function to calculate the heatmap data
const calculateHeatmap = async (user_id) => {
    try {
        // Get all completed tasks for the user
        const completedTasks = await Task.find({ user_id, isCompleted: true });

        const completionMap = {};

        // Iterate through completed tasks and populate completionMap
        completedTasks.forEach(task => {
            const taskDate = task.date.toISOString().split('T')[0];
            
            if (completionMap[taskDate]) {
                completionMap[taskDate]++;
            } else {
                completionMap[taskDate] = 1;
            }
        });

        // Calculate completion percentage for each day
        const heatmapData = [];
        for (const date in completionMap) {
            const completionPercentage = (completionMap[date] / completedTasks.length) * 100;
            heatmapData.push({ date, completionPercentage });
        }

        return heatmapData;
    } catch (error) {
        throw new Error(`Error calculating heatmap: ${error.message}`);
    }
};

module.exports = { calculateHeatmap };
