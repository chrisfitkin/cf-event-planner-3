import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import injectTapEventPlugin from 'react-tap-event-plugin';

// const store = createStore(reducer)
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
