import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import AddEvent from '../containers/AddEvent'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
      <hr />
      <AddEvent />
  </div>
)

export default App
