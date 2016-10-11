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
        // console.log(this)
    }

    componentWillUnmount() {
        //this.autocomplete.removeListener('place_changed');
    }

    handlePlaceChanged() {
      let place = this.autocomplete.getPlace()
      let placeName = place.name
      let placeAddress = place.vicinity
      this.props.input.onChange(placeName)
      if (this.props.onPlaceChanged) {
          this.props.onPlaceChanged(placeName);
      }
      // console.log(placeName)
      this._input.input.value=placeName
      console.log(this)
    }

    render() {
        return <TextField
        ref={(c) => this._input = c}
        floatingLabelText={this.props.floatingLabelText}
        hintText={this.props.hintText}
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
        placeholder=""
        />;
    }
}

GoogleAutoComplete.propTypes = {
    name: React.PropTypes.string.isRequired,
    onPlaceChanged: React.PropTypes.func
};
