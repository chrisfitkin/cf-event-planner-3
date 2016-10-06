import React, { PropTypes } from 'react'


import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EventIcon from 'material-ui/svg-icons/action/event';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import Divider from 'material-ui/Divider';
import {pink50, pinkA200, darkBlack, transparent} from 'material-ui/styles/colors';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import moment from 'moment'

// { favorite ? '<b>favorite</b>' : '' }

const Event = (props) => {
  const { onClick, favorite, title, host, eventType, startDate, startTime,
    endDate, endTime, location, message, inviteList } = props
  let separator = "  --  "
  return (
    <div>
      <ListItem
        onClick={onClick}
        leftAvatar={<Avatar icon={<EventIcon />} />}
        rightIcon={<ActionGrade color={favorite ? pinkA200 : pink50} />}
        primaryText={title + separator + eventType}
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>{host}</span>{" "+location}
              <br/><i>{moment(startDate).format('L')}{" at "}{moment(startTime).format('LT')}</i>
            </p>
          }
          secondaryTextLines={2}
      />
      <Divider inset={true} />
    </div>
  )
}

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default Event
