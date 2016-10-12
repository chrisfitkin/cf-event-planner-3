import React from 'react'
// import IconButton from 'material-ui/IconButton'
// import IconMenu from 'material-ui/IconMenu'
// import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// import { IndexLink, Link } from 'react-router'
import { Link } from 'react-router'

// import './Navigation.scss'

let styles = {
  color: '#ffffff'
}

const Navigation = () => (
  <div style={{marginTop: 7}}>
    <FlatButton style={styles} label="Add" containerElement={
      <Link to="/create" activeClassName='route--active' />
    }/>
    <FlatButton style={styles} label="Register" containerElement={
      <Link to="/register" activeClassName='route--active' />
    }/>
  </div>
)

// export const Navigation = () => (
//   <IconMenu
//     iconButtonElement={
//       <IconButton iconStyle={styles}><MoreVertIcon /></IconButton>
//     }
//     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//   >
//       <MenuItem
//         containerElement={<IndexLink to="/" activeClassName='route--active' />}
//         primaryText="Events"
//       />
//       <MenuItem
//         containerElement={<Link to="/create" activeClassName='route--active' />}
//         primaryText="Create Event"
//       />
//       <MenuItem
//         containerElement={<Link to="/register" activeClassName='route--active' />}
//         primaryText="Register"
//       />
//   </IconMenu>
// )

export default Navigation
