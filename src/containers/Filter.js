import React from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: this.props.currentFilter,
    };
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  handleChange = (event, index, value) => {
    // console.log(event)
    // console.log(value)
    this.setState({
      filter: value,
    });

    const { dispatch } = this.props;
    dispatch(setVisibilityFilter(value))
  };

  render() {
    return(
      <div>
        <DropDownMenu
          value={this.state.filter}
          onChange={this.handleChange}
        >
          <MenuItem
            value="SHOW_ALL"
            primaryText="All Events"
          />
          <MenuItem
            value="SHOW_FAVORITE"
            primaryText="Favorite Events"
          />
        </DropDownMenu>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  currentFilter: state.visibilityFilter
})

// TODO: Pass the onclick event through dispatch
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: () => {
//     dispatch(setVisibilityFilter(ownProps.filter))
//   }
// })

Filter = connect(
  mapStateToProps,
  null
)(Filter)

export default Filter
