import React from 'react'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { IndexLink, Link } from 'react-router'

// import './Navigation.scss'

export const Navigation = () => (
  <div>
    <Menu>
      <IndexLink to='/' activeClassName='route--active'>
        <MenuItem primaryText="Home" />
      </IndexLink>
      <Link to='/events' activeClassName='route--active'>
        <MenuItem primaryText="Events" />
      </Link>
      <Link to='/events/create' activeClassName='route--active'>
        <MenuItem primaryText="New Event" />
      </Link>
    </Menu>
  </div>
)

export default Navigation
