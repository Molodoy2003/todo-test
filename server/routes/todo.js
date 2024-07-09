const { Router } = require('express')
const {
  addTodo,
  completedTodo,
  deleteTodo,
  getTodos,
} = require('./../controllers/todo_controller.js')

const router = Router()

router.get('/', getTodos)
router.post('/add', addTodo)
router.delete('/delete/:id', deleteTodo)
router.put('/completed/:id', completedTodo)

module.exports = router
