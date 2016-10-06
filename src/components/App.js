import React from 'react'
import EventListPage from './EventListPage'
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// style={{fontFamily: this.context.muiTheme.fontFamily}}

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  // palette: {
  //   textColor: cyan500,
  // },
  // appBar: {
  //   height: 50,
  // },
});


const App = ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
        <Header />
        <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  </MuiThemeProvider>
)

export default App
