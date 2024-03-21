const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all tasks 
const getTasks = async (req, res) => {
    // finds all tasks in the db and returns in descending order by create date
    const tasks = await Task.find({}).sort({createdAt: -1})

    // returns all tasks 
    res.status(200).json(tasks)
}

// get a single task 
const getTask = async (req, res) => {
    const {id} = req.params

    // make sure the id is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    // get the task with given id
    const task = await Task.findById(id)

    // if the task doesn't exist, return error msg
    if (!task){
        return res.status(404).json({error: 'No such task'})
    }

    // return the task
    res.status(200).json(task)
}

// create new task
const createTask = async (req, res) => {
    // read in the data for new task
    const {title, description, date, isCompleted} = req.body

    // add doc to db
    try {
        const task = await Task.create({title, description, date, isCompleted})
        res.status(200).json(task)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// delete a task 
const deleteTask = async(req, res) => {
    const {id} = req.params

    // make sure the id is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    // delete the task
    const task = await Task.findOneAndDelete({_id: id})

    // if there was no matching task, show error 
    if (!task){
        return res.status(404).json({error: 'No such task'})
    }

    // return deleted task
    res.status(200).json(task)

}

// update a task 
const updateTask = async(req, res) => {
    const {id} = req.params

    // make sure the id is valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such task'})
    }

    // updates task with given id
    const task  = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    // if there was no matching task, show error 
    if (!task){
        return res.status(404).json({error: 'No such task'})
    }

    // return deleted task
    res.status(200).json(task)

}

module.exports = {
    getTasks, 
    getTask,
    createTask, 
    deleteTask, 
    updateTask
}