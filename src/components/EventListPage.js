import React from 'react'
import Filter from '../containers/Filter'
import EventListContainer from '../containers/EventListContainer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router'

const style = {
  position: 'absolute',
  bottom: 20,
  right: 20
};

const App = () => (
  <div>
      <Filter />
      <EventListContainer />

      <FloatingActionButton
        containerElement={<Link to="/create" activeClassName='route--active' />}
        style={style}>
        <ContentAdd />
      </FloatingActionButton>
  </div>
)

export default App
