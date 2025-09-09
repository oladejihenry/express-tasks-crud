import { Router } from 'express'
import { clearTasks, createTask, deleteTask, getTasks, updateTask } from '../controller/task'

const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.delete('/clear', clearTasks)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)


export default router