const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const PORT = process.env.PORT || 3000

//Website Maintainance Code
// app.use((req, res) => {
//   res.render('maintain', {
//     title: 'Weather',
//     name: 'Bhaskar Chetty',
//     message: 'Website is under maintenance. Come back later!'
//   })
// })

//Define Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')

//Set handle bars engine, views and partials directory path
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//Set up static directory to be served
app.use(express.static(publicDirectoryPath))

//Home Page
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Bhaskar Chetty'
  })
})

//About Page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: 'Bhaskar Chetty'
  })
})

//Help Page
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Bhaskar Chetty',
    message: 'This is the Help Page'
  })
})

//Weather Route
app.get('/weather', (req, res) => {
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if(!req.query.address) {
      return res.send({error: 'You must enter an address!'})
    } 
    if(error) {
      return res.send({error})
    }
    forecast(latitude,longitude,(error, forecastData) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })  
})

//Help page that are not found
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    name: 'Bhaskar Chetty',
    message: 'Help Resource Not Found'
  })
})

//404 - Page
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Bhaskar Chetty',
    message: 'Page Not Found'
  })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})