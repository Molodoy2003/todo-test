const Todo = require('../models/Todo.js')

const getTodos = async (req, res) => {
  const todos = await Todo.find()
  res.status(200).json(todos)
  try {
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при получении todos' })
  }
}

const addTodo = async (req, res) => {
  try {
    const { text } = req.body

    const newTodo = new Todo({
      text,
      completed: false,
    })
    await newTodo.save()
    res.status(200).json(newTodo)
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при создании todo' })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id })

    res.status(200).json({ message: 'Todo deleted', todo })
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при удалении todo' })
  }
}

const completedTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id })
  todo.completed = !todo.completed

  await todo.save()
  res.json(todo)
  try {
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при выделении todo' })
  }
}

module.exports = [completedTodo, addTodo, getTodos, deleteTodo]
