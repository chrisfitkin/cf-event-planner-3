import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import * as reducers from './reducers'
import App from './components/App'
import EventListPage from './components/EventListPage'
import AddEvent from './containers/AddEvent'
import AddEventStepper from './components/AddEventStepper'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { addEvent } from './actions'

import style from './styles/main.css'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

// const store = createStore(reducer)
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={EventListPage}/>
          <Route path="events" component={EventListPage}/>
          <Route path="create" component={AddEventStepper}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

// Add some default event items (probably find a better place to do this)
let defaultEvent = {
  title: 'My new event',
  host: 'Chris Fitkin',
  eventType: 'Pizza party',
  startDate: '10/1/2016',
  startTime: '12 pm',
  endDate: '10/1/2016',
  endTime: '3pm',
  location: '123 Main St',
  message: 'Everybody come over for pizza!',
  inviteList: 'cfitkin@gmail.com, chrisfitkin@gmail.com'
}
store.dispatch(addEvent(defaultEvent));
store.dispatch(addEvent({title:"Default Event 1"}));
store.dispatch(addEvent({title:"Default Event 2"}));
store.dispatch(addEvent({title:"Default Event 3"}));
