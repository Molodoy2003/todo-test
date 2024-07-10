import { Button, Checkbox, Input, List } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

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
    <View style={styles.root}>
      <View style={styles.container}>
        <Input
          className='input'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder='Todo title...'
          style={{ marginBottom: 10, width: '300px' }}
        />
        <Button style={{ width: '100px' }} onClick={addTodo} type='primary'>
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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#242424',
    width: '100%',
  },
  container: {
    padding: 20,
    backgroundColor: '#242424',
    color: 'rgba(255, 255, 255, 0.87)',
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
})

export default App
