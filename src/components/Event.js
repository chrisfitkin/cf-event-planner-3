import React, { PropTypes } from 'react'

const Event = ({ onClick, favorite, title }) => (
  <li
    onClick={onClick}
    style={{
      fontWeight: favorite ? 'bold' : 'normal'
    }}
  >
    {title}
  </li>
)

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default Event
