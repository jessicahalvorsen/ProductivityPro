const express = require('express')
const {
    getTasks, 
    getTask,
    createTask, 
    deleteTask,
    updateTask,
    getTasksByDate
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

// require authentication for all routes 
const router = express.Router()

router.use(requireAuth)

// GET all tasks 
router.get('/', getTasks)

// GET a single task
router.get('/:id', getTask)

// POST a new task 
router.post('/', createTask)

// DELETE a task
router.delete('/:id', deleteTask)

// UPDATE a task
router.patch('/:id', updateTask)

// get tasks by date
router.get('/date-object/:id', getTasksByDate)

module.exports = router