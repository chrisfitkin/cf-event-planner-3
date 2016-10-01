import React from 'react'
import Filter from './Filter'
import AddEvent from '../containers/AddEvent'
import EventListContainer from '../containers/EventListContainer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IndexLink } from 'react-router'

const style = {
  position: 'absolute',
  bottom: 20,
  right: 20
};

const App = () => (
  <div>
      <AddEvent />
      <Filter />
      <EventListContainer />

      <FloatingActionButton
        containerElement={<IndexLink to="/create" activeClassName='route--active' />}
        style={style}>
        <ContentAdd />
      </FloatingActionButton>
  </div>
)

export default App
