import React from 'react';
import TextField from 'material-ui/TextField';

export default class GoogleAutoComplete extends React.Component {

    constructor(props) {
        super(props);

        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(this._input.input, {types: ['establishment']});
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    componentWillUnmount() {
        //this.autocomplete.removeListener('place_changed');
    }

    handlePlaceChanged() {
      let place = this.autocomplete.getPlace()
      let placeName = place.name
      let placeAddress = place.vicinity
      console.log(placeName)
      console.log(this.props)
      this.props.input.onChange(placeName)
      if (this.props.onPlaceChanged) {
          this.props.onPlaceChanged(placeName);
      }
    }

    render() {
        return <TextField
        ref={(c) => this._input = c}
        {...this.props}
        value={this.props.value}
        name={this.props.name}
        placeholder=""
        />;
    }
}

GoogleAutoComplete.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onPlaceChanged: React.PropTypes.func
};
