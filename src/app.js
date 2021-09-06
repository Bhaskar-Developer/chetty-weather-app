const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('', (req, res) => {
  res.send('Home Page')
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