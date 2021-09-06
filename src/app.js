const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const PORT = process.env.PORT || 3000

//Define Paths for Express Configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')

//Set handle bars engine, views and partials directory path
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//Set up static directory to use
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Bhaskar Chetty'
  })
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

app.get('/help', (req, res) => {
  res.send('Help Page')
})

app.get('/weather', (req, res) => {
  res.send('Weather Page')
});

app.get('/help/*', (req, res) => {
  res.send('Help Resource not Found')
})

app.get('*', (req, res) => {
  res.send('404 - Page not Found')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})