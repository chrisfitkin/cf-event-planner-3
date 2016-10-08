import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducer from './reducers/index'
import App from './components/App'
import EventListPage from './components/EventListPage'
import AddEvent from './containers/AddEvent'
import AddEventStepper from './components/AddEventStepper'
import RegisterFormContainer from './containers/RegisterFormContainer'
import RegisterPage from './components/RegisterPage'
import AddEventContainer from './containers/AddEventContainer'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'

import { addEvent } from './actions'

import style from './styles/main.css'

// console.log('reducers')
// console.log(reducers)

const combinedReducer = combineReducers({
  ...reducer,
  routing: routerReducer
})

// const store = createStore(reducer)
const store = createStore(combinedReducer, window.devToolsExtension && window.devToolsExtension());

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
          <Route path="create" component={AddEventContainer} />
          <Route path="register" component={RegisterPage}/>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

// Add some default event items (probably find a better place to do this)
let defaultEvents = [{
    title: 'Christopher\'s Birthday party',
    host: 'Chris Fitkin',
    eventType: 'Pizza party',
    startDate: '2016-10-16T07:00:00.000Z',
    startTime: '2016-10-03T00:00:20.057Z',
    endDate: '2016-10-16T07:00:00.000Z',
    endTime: '2016-10-03T03:00:30.824Z',
    location: '123 Main St',
    message: 'Everybody come over for pizza!',
    inviteList: 'cfitkin@gmail.com, chrisfitkin@gmail.com'
  },{
    title: 'A day at the beach',
    host: 'Kim Fitkin',
    eventType: 'Picnic',
    startDate: '2016-10-21T07:00:00.000Z',
    startTime: '2016-10-03T00:00:20.057Z',
    endDate: '2016-10-21T07:00:00.000Z',
    endTime: '2016-10-03T03:00:30.824Z',
    location: '4000 N. Pacific Coast Highway',
    message: '',
    inviteList: ''
  },{
    title: 'Dinner with friends',
    host: 'The Ranch Restaurant',
    eventType: 'Dinner',
    startDate: '2016-10-21T07:00:00.000Z',
    startTime: '2016-10-03T00:00:20.057Z',
    endDate: '2016-10-21T07:00:00.000Z',
    endTime: '2016-10-03T03:00:30.824Z',
    location: '1025 E Ball Rd',
    message: '',
    inviteList: ''
  }]

store.dispatch(addEvent(defaultEvents[0]));
store.dispatch(addEvent(defaultEvents[1]));
store.dispatch(addEvent(defaultEvents[2]));
