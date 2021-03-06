const request = require('request')
const dotenv = require('dotenv').config()

const geocode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)
  const geocodeurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.GEOCODE_KEY}&limit=1`

  request({ url: geocodeurl, json: true }, (error, { body } = {}) => {
    //This will run if there is an OS level error Eg: No Internt
    if (error) {
      callback('Unable to reach location services', undefined)
      return
    }
    //This will run if the specified location is not valid or not found
    if (body.features.length === 0) {
      callback('The entered location is invalid. Try a different search', undefined)
      return
    }
    //This will run if there were no errors
    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
    })
  })
}

module.exports = geocode