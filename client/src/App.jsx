import { Button, Checkbox, Input, List } from 'antd'
import React, { useState } from 'react'

const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    setTodos([...todos, { text: newTodo, completed: false }])
    setNewTodo('')
  }

  const toggleTodo = index => {
    const updatedTodos = [...todos]
    updatedTodos[index].completed = !updatedTodos[index].completed
    setTodos(updatedTodos)
  }

  const deleteTodo = index => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
  }

  return (
    <div style={{ padding: 20 }}>
      <Input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder='Enter new todo'
        style={{ marginBottom: 10 }}
      />
      <Button onClick={addTodo} type='primary'>
        Add Todo
      </Button>
      <List
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              >
                Completed
              </Checkbox>,
              <Button onClick={() => deleteTodo(index)}>Delete</Button>,
            ]}
          >
            {todo.text}
          </List.Item>
        )}
        style={{ marginTop: 20 }}
      />
    </div>
  )
}

export default App
