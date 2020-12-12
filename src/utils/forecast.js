const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //http://api.weatherstack.com/current?access_key=f32e4ef9fb6ff45528c2e14e10d12af7&query=18.516726,73.856255   latest url
    const url = 'http://api.weatherstack.com/current?access_key=f32e4ef9fb6ff45528c2e14e10d12af7&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast