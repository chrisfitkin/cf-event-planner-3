import React, { Component, PropTypes } from 'react'
import { TextField } from 'material-ui'

export default class AddressAutoComplete extends Component {
  static propTypes = {
    value: PropTypes.string,
    floatingLabelText: PropTypes.string,
    hintText: PropTypes.string,
    autoComplete: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    // onChange: PropTypes.func
  }

  componentWillMount () {
    this.setState({ value: this.props.value || '' })
  }

  componentDidMount () {
    const input = document.getElementById('placeAutocompleteField')
    const addressInput = document.getElementById('addressAutocompleteField')
    const options = {
      componentRestrictions: {country: 'us'},
      types: ['establishment']
    }
    const geoAutocomplete = new window.google.maps.places.Autocomplete((input), options)
    geoAutocomplete.addListener('place_changed', () => {
      const selectedPlace = geoAutocomplete.getPlace()
      const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      }
      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      let selectedSuggest = {}
      // console.log(selectedPlace)
      // console.log(selectedPlace.name)
      for (let addressComponent of selectedPlace.address_components) {
        // console.log(addressComponent)
        const addressType = addressComponent.types[0]
        if (componentForm[addressType]) {
          selectedSuggest[addressType] = addressComponent[componentForm[addressType]]
        }
      }
      // input.value = selectedPlace.name // Code injection risk (check doc)
      // input.value = `${selectedSuggest.street_number} ${selectedSuggest.route}`
      let selectedPlaceName = `${selectedPlace.name}`
      // input.value = selectedPlaceName // TODO: send this value to reduxform and allow it to pass back
      console.log(selectedPlaceName)
      this.setState({value: selectedPlaceName})
      // this.setState(selectedPlaceName)

      //addressInput.value = `${selectedSuggest.street_number} ${selectedSuggest.route}`
      // if (typeof this.props.onChange === "function") {
        // this.props.onChange(selectedSuggest, input.value)
        this.props.onChange(selectedPlaceName)
        // this._handleChange(null, selectedPlaceName)
        console.log('pass to form')
      // }
    })
  }

  _handleChange = (event, value) => {
    this.setState({ value })
    this.props.onChange(value)
  }

  render () {
    return (
      <TextField
        id='placeAutocompleteField'
        {...this.props}
        floatingLabelText={this.props.floatingLabelText}
        hintText={this.props.hintText}
        autoComplete={this.props.autoComplete}
        value={this.props.value}
        onChange={this._handleChange}
        // onBlur={this.props.onBlur(this.state.value)} // this is causing an infinite loop :(
        onBlur={console.log(this.state.value)} // this is triggering after every change
        placeholder=''
      />
    )
  }
}
