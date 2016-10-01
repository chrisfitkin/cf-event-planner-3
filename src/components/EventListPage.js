import React from 'react'
import Filter from './Filter'
import AddEvent from '../containers/AddEvent'
import EventListContainer from '../containers/EventListContainer'

const App = () => (
  <div>
      <AddEvent />
      <Filter />
      <EventListContainer />
  </div>
)

export default App
