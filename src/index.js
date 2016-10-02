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
import AddEventStepper from './containers/AddEventStepper'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { addEvent } from './actions'

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
          <Route path="create" component={AddEvent}/>
          <Route path="createStepper" component={AddEventStepper}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

// Add some default event items (probably find a better place to do this)
store.dispatch(addEvent("Default Event 1"));
store.dispatch(addEvent("Default Event 2"));
store.dispatch(addEvent("Default Event 3"));
