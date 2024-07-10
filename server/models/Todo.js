import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
})

const Todo = mongoose.model('Todo', TodoSchema)

export default Todo
