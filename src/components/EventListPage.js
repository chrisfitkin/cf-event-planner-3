import React from 'react'
import Header from './Header'
import Filter from './Filter'
import AddEvent from '../containers/AddEvent'
import EventListContainer from '../containers/EventListContainer'

const App = () => (
  <div>
      <Header />
      <AddEvent />
      <Filter />
      <EventListContainer />
  </div>
)

export default App
