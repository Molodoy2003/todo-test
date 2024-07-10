import { Button, Checkbox, Input, List } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SERVER_URL = 'http://localhost:5000/api/todo'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(SERVER_URL)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/add`, {
        text: newTodo,
      })
      setTodos([...todos, response.data])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = async id => {
    try {
      const response = await axios.put(`${SERVER_URL}/completed/${id}`)
      const updatedTodos = todos.map(todo =>
        todo._id === id ? response.data : todo
      )
      setTodos(updatedTodos)
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const deleteTodo = async id => {
    try {
      await axios.delete(`${SERVER_URL}/delete/${id}`)
      const updatedTodos = todos.filter(todo => todo._id !== id)
      setTodos(updatedTodos)
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <Input
        className='input'
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder='Todo title...'
        style={{ marginBottom: 10 }}
      />
      <Button onClick={addTodo} type='primary'>
        Add Todo
      </Button>
      {todos.length > 0 ? (
        <List
          dataSource={todos}
          renderItem={todo => (
            <List.Item
              actions={[
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo._id)}
                >
                  <span style={{ color: '#fff' }}>Completed</span>
                </Checkbox>,
                <Button onClick={() => deleteTodo(todo._id)}>Delete</Button>,
              ]}
              className={todo.completed ? 'completed' : ''}
            >
              <span style={{ color: todo.completed ? 'gray' : 'white' }}>
                {todo.text}
              </span>
            </List.Item>
          )}
          style={{ marginTop: 20 }}
        />
      ) : (
        <p>No todos found</p>
      )}
    </div>
  )
}

export default App
