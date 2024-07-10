import { Router } from 'express'
import {
  addTodo,
  completedTodo,
  deleteTodo,
  getTodos,
} from './../controllers/todo_controller.js'

const router = Router()

router.get('/', getTodos)
router.post('/add', addTodo)
router.delete('/delete/:id', deleteTodo)
router.put('/completed/:id', completedTodo)

export default router
