const request = require('request')

const forecast = (latitude,longitude,callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=ab37469500e1a62df&query=${latitude},${longitude}&units=m`

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
    callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out but feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%`)
  })
}

module.exports = forecast
