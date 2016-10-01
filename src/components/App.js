import React from 'react'
import EventListPage from './EventListPage'
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({children}) => (
  <MuiThemeProvider>
    <div>
        <Header />
        <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  </MuiThemeProvider>
)

export default App
