import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import EventIcon from 'material-ui/svg-icons/action/event';
import Navigation from './Navigation'
import { IndexLink } from 'react-router'

// import './Header.scss'

export const Header = () => (
  <AppBar
    title="Event Planner"
    className="headerAppBar"
    iconElementLeft={
      <IconButton
        containerElement={<IndexLink to="/" />}
      >
        <EventIcon />
      </IconButton>
    }
    iconElementRight={
      <Navigation />
    }
  />
)

export default Header
