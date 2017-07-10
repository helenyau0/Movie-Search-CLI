const http = require('http');

function getWeather(city) {
  http.get({
    host: 'api.openweathermap.org',
    path: `/data/2.5/weather?q=${city}&mode=json&appid=2931fa08fcb2950740aef2103b931306`,
  }, (res) => {
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      let json = JSON.parse(rawData)
      let temperature = Math.floor((((json['main']['temp'] * 9)/ 5) - 459.67))
      console.log('Temperature in Farenheit: ' + temperature);
    })
  })
}

function Whats_the_weather() {
  const city = process.argv.slice(2).join('+')
  getWeather(city)
}

Whats_the_weather()
