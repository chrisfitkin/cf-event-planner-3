import React from 'react'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { IndexLink, Link, FontIcon } from 'react-router'

// import './Navigation.scss'

let styles = {
  color: '#ffffff',
}

export const Navigation = () => (
  <IconMenu
    iconButtonElement={
      <IconButton iconStyle={styles}><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
      <MenuItem
        containerElement={<IndexLink to="/" activeClassName='route--active' />}
        primaryText="Events"
      />
      <MenuItem
        containerElement={<Link to="/create" activeClassName='route--active' />}
        primaryText="Create Event"
      />
      <MenuItem
        containerElement={<Link to="/register" activeClassName='route--active' />}
        primaryText="Register"
      />
  </IconMenu>
)

export default Navigation
