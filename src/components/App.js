import React from 'react'
import EventListPage from './EventListPage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <div>
    <MuiThemeProvider>
      <EventListPage />
    </MuiThemeProvider>
  </div>
)

export default App
