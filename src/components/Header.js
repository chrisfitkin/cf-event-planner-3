import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EventIcon from 'material-ui/svg-icons/action/event';
import Navigation from './Navigation'
import { IndexLink } from 'react-router'

// import './Header.scss'

export const Header = () => (
  <AppBar
    title="CF Event Planner"
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
