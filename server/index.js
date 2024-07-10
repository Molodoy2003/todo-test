import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import todoRouter from './routes/todo.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())
app.use('/api/todo', todoRouter)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.vq4duaw.mongodb.net/test-todo?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    app.listen(PORT, () => console.log(`Server on port: ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
