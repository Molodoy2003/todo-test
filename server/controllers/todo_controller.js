import Todo from '../models/Todo.js'

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при получении todos' })
  }
}

export const addTodo = async (req, res) => {
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

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id })

    res.status(200).json({ message: 'Todo deleted', todo })
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при удалении todo' })
  }
}

export const completedTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    todo.completed = !todo.completed

    await todo.save()
    res.json(todo)
  } catch (error) {
    return res.status(400).json({ message: 'Ошибка при выделении todo' })
  }
}
