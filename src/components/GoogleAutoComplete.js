import React from 'react';
import TextField from 'material-ui/TextField';

export default class GoogleAutoComplete extends React.Component {

    constructor(props) {
        super(props);

        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(this._input.input, {types: this.props.placesTypes || ['establishment']});
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
        // console.log(this)
    }

    componentWillUnmount() {
        //this.autocomplete.removeListener('place_changed');
    }

    handlePlaceChanged() {
      let place = this.autocomplete.getPlace()
      console.log(place)
      let placeName = place[this.props.addressPart || 'name']
      let placeAddress = place.vicinity
      if (this.props.onPlaceChanged) {
          this.props.onPlaceChanged(place);
      }
      // set the input text
      this._input.input.value=placeName
      // send the value back to the form
      this.props.input.onChange(placeName)
      console.log(this)
    }

    render() {
        return <TextField
        ref={(c) => this._input = c}
        floatingLabelText={this.props.floatingLabelText}
        {...this.props}
        {...this.props.input}
        hintText={this.props.hintText}
        value={this.props.input.value}
        name={this.props.input.name}
        onChange={this.props.input.onChange}
        placeholder=""
        />;
    }
}

GoogleAutoComplete.propTypes = {
    name: React.PropTypes.string.isRequired,
    onPlaceChanged: React.PropTypes.func
};
