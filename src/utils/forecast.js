const request = require('request')
const dotenv = require('dotenv').config()

const forecast = (latitude,longitude,callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=${latitude},${longitude}&units=m`

  request({ url: forecastUrl, json: true },(error,{ body } = {}) => {
    //This will run if there is an OS level error i.e. No internet
    if(error) {
      callback('Unable able to reach Weather Server!', undefined)
      return
    }
    //This will run if the specified coordinates are invalid
    if(body.error) {
      callback('Entered Details are invalid', undefined)
      return
    }
    //This will run if there is no error
    callback(undefined,{
      forecast: body.current.weather_descriptions[0],
      temperature: body.current.temperature,
      feelslike: body.current.feelslike,
      humidity: body.current.humidity,
      icon: body.current.weather_icons
    })
  })
}

module.exports = forecast
